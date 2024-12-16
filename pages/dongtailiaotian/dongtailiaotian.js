Page({
  data: {
    currentTime: '',
    messages: [],
    inputValue: '',
    toView: ''
  },

  onLoad(options) {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 60000);

    this.getMessagesFromDB();
    this.listenForNewMessages();
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

  listenForNewMessages() {
    const poll = () => {
      wx.request({
        url: 'http://127.0.0.1:3000/api/long-polling',
        method: 'GET',
        timeout: 60000, // 设置超时时间为60秒
        success: res => {
          if (res.statusCode === 204) {
            // No new messages, continue polling
            poll();
            return;
          }
          console.log('收到新消息', res.data); // 添加日志
          const newMessages = [...this.data.messages, res.data];
          const toView = `msg-${newMessages.length - 1}`;
          console.log('toView:', toView); // 打印 toView 的值
          this.setData({
            messages: newMessages,
            toView: toView
          });
          poll(); // 继续轮询
        },
        fail: err => {
          console.error('长轮询错误', err);
          setTimeout(poll, 5000); // 失败后5秒重试
        }
      });
    };
    poll(); // 开始轮询
  },

  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  sendMessage: function () {
    const { inputValue } = this.data;
    if (inputValue.trim()) {
      const newMessage = {
        sender_id: '4444', // 替换为实际的发送者ID
        participant_user_id: '200203000', // 替换为实际的参与者ID
        message_content: inputValue, // 消息内容
        conversation_created_at: new Date().toISOString() // 当前时间
      };
      console.log('发送消息:', newMessage); // 添加日志
      wx.request({
        url: 'http://127.0.0.1:3000/api/sendMessageToDB',
        method: 'POST',
        data: newMessage,
        success: (res) => {
          console.log('发送消息成功', res); // 添加日志
          const newMessages = [...this.data.messages, newMessage];
          const toView = `msg-${newMessages.length - 1}`;
          console.log('toView:', toView); // 打印 toView 的值
          this.setData({
            inputValue: '',
            messages: newMessages,
            toView: toView  // 更新 toView
          });
        },
        fail: err => {
          console.error('发送消息失败', err);
        }
      });
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