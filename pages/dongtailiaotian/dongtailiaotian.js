// pages/liaotian/liaotian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime:'',
    messages:[],
    inputValue:'',
    toView: '' // 新增属性
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateTime();
    setInterval(()=>{
      this.updateTime();
    },60000);//每一分钟变化

    this.getMessagesFromDB();
    this.listenForNewMessages();
  },
  updateTime(){
    const now=new Date();
    const options={
      weekday:'long',
      hour:'numeric',
      minute:'numeric'
    };
    this.setData({
      currentTime:now.toLocaleDateString('zh-CN',options),
    });
  },

  getMessagesFromDB() {
    wx.request({
      url: 'http://localhost:3000/getTaking', // 调用新的 getTaking API
      method: 'GET',
      success: res => {
        this.setData({
          messages: res.data
        });
      },
      fail: err => {
        console.error('获取消息失败', err);
      }
    });
  },

  listenForNewMessages() {
    // 假设使用 WebSocket 进行实时监听
    const socket = wx.connectSocket({
      url: 'ws://localhost:3000'
    });

    socket.onMessage(message => {
      const newMessage = JSON.parse(message.data);
      this.setData({
        messages: [...this.data.messages, newMessage],
        toView: `msg-${this.data.messages.length}` // 更新 toView
      });
    });

    socket.onError(err => {
      console.error('WebSocket 连接错误', err);
    });
  },

  queryMessages(query) {
    wx.request({
      url: 'http://localhost:3000/messages/search',
      method: 'GET',
      data: { query },
      success: res => {
        this.setData({
          messages: res.data
        });
      },
      fail: err => {
        console.error('查询消息失败', err);
      }
    });
  },

  onInput:function(e){
    this.setData({
      inputValue:e.detail.value
    });
  },

  sendMessage:function(){
    const{inputValue}=this.data;
    if(inputValue.trim()){
      const newMessage={from:'user',content:inputValue};
      wx.request({
        url: 'http://localhost:3000/api/messages',
        method: 'POST',
        data: newMessage,
        success: () => {
          this.setData({
            inputValue:'',
            messages: [...this.data.messages, newMessage],
            toView: `msg-${this.data.messages.length}` // 更新 toView
          });
        },
        fail: err => {
          console.error('发送消息失败', err);
        }
      });
    }
  },

  onSendTap:function(){
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
})