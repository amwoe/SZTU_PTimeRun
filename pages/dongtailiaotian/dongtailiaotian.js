// pages/liaotian/liaotian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime:'',
    messages:[],
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateTime();
    setInterval(()=>{
      this.updateTime();
    },60000);//每一分钟变化

    this.setData({
      messages:[
        { from: 'user', content: '请问可以慢一点送达吗' },
        { from: 'bot', content: '不行，我这周要去深圳出差' },
        { from: 'user', content: '因为你这个物件有点大，可以加价吗' },
        { from: 'bot', content: '加多少' }
      ]
    });
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

  onInput:function(e){
    this.setData({
      inputValue:e.detail.value
    });
  },

  sendMessage:function(){
    const{inputValue}=this.data;
    if(inputValue.trim()){
      const newMessage={from:'user',content:inputValue};
      this.setData({
        messages:[...this.data.messages,newMessage],
        inputValue:''
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