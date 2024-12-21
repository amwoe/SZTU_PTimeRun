Page({
  data: {
    currentTime: '',
    messages: [],
    inputValue: '',
    toView: '',
    socketOpen: false, // WebSocket 是否已连接
    isSocketMessageBound : false
  },

  onLoad(options) {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 60000);

    this.getMessagesFromDB();
    this.initWebSocket();
  },

  updateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    };
    this.setData({
      currentTime: now.toLocaleDateString('zh-CN', options),
    });
  },

  getMessagesFromDB() {
    wx.request({
      url: 'http://127.0.0.1:3000/api/getTalking',
      method: 'GET',
      success: res => {
        console.log('获取消息成功', res.data); // 添加日志
        const messages = res.data;
        const toView = messages.length ? `msg-${messages.length - 1}` : '';
        console.log('toView:', toView); // 打印 toView 的值
        this.setData({
          messages: messages,
          toView: toView
        });
      },
      fail: err => {
        console.error('获取消息失败', err);
      }
    });
  },

  appendMessage(newMessage) {
    const { messages } = this.data;
  
    // 检查是否已存在该消息（根据唯一标识符）
    const isDuplicate = messages.some(msg => msg.id === newMessage.id);
    if (!isDuplicate) {
      const updatedMessages = [...messages, newMessage];
      const toView = `msg-${updatedMessages.length - 1}`;
      this.setData({
        messages: updatedMessages,
        toView: toView
      });
    } else {
      console.log('收到重复消息，已忽略:', newMessage);
    }
  },

  initWebSocket() {
    if (this.data.isSocketMessageBound) {
      console.log('WebSocket 监听器已绑定，跳过重复绑定');
      return;
    }
    const socketUrl = 'ws://127.0.0.1:3000/ws'; // 替换为实际 WebSocket 服务地址

    wx.connectSocket({
      url: socketUrl,
      success: () => {
        console.log('WebSocket 连接成功');
      },
      fail: err => {
        console.error('WebSocket 连接失败', err);
      }
    });

    // 监听 WebSocket 打开事件
    wx.onSocketOpen(() => {
      console.log('WebSocket 已打开');
      this.setData({ socketOpen: true });
    });

    // 监听服务器发送的消息
    wx.onSocketMessage((res) => {
      console.log('收到服务器消息:', res.data);
      try {
        const message = JSON.parse(res.data); // 假设消息是 JSON 格式
        this.appendMessage(message);
      } catch (err) {
        console.error('解析消息失败', err);
      }
    });

    // 监听 WebSocket 错误事件
    wx.onSocketError((err) => {
      console.error('WebSocket 错误:', err);
    });

    // 监听 WebSocket 关闭事件
    wx.onSocketClose(() => {
      console.log('WebSocket 已关闭');
      this.setData({ socketOpen: false });
    });
  },

  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
        // 标记监听器已绑定
    this.setData({ isSocketMessageBound: true });
  },

  sendMessage() {
    const { inputValue, socketOpen } = this.data;
    if (inputValue.trim() && socketOpen) {
      const newMessage = {
        sender_id: '4444', // 替换为实际的发送者ID
        participant_user_id: '200203000', // 替换为实际的参与者ID
        message_content: inputValue,
        conversation_created_at: new Date().toISOString()
      };

wx.request({
      url: 'http://127.0.0.1:3000/api/sendMessageToDB', // 后端 API 地址
      method: 'POST',
      data: newMessage,
      success: res => {
        if (res.data.success) {
          console.log('消息已成功保存到数据库:', newMessage);

          // 发送 WebSocket 消息
          wx.sendSocketMessage({
            data: JSON.stringify(newMessage),
            success: () => {
              console.log('消息通过 WebSocket 发送成功:', newMessage);
              const newMessages = [...this.data.messages, newMessage];
              const toView = `msg-${newMessages.length - 1}`;
              this.setData({
                inputValue: '',
                messages: newMessages,
                toView: toView
              });
            },
            fail: err => {
              console.error('WebSocket 发送失败:', err);
            }
          });
        } else {
          console.error('消息保存失败:', res.data.error);
        }
      },
        fail: err => {
          console.error('消息发送失败:', err);
        }
      });
    } else {
      console.warn('WebSocket 未连接或消息为空');
    }
  },

  onSendTap: function () {
    this.sendMessage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getMessagesFromDB(); // 页面显示时获取最新消息
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.socketOpen) {
      wx.closeSocket({
        success: () => {
          console.log('WebSocket 连接已关闭');
          this.setData({ socketOpen: false, isSocketMessageBound: false });
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getMessagesFromDB(); // 下拉刷新时获取最新消息
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});