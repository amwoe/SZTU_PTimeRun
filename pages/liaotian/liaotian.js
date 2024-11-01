// pages/liaotian/liaotian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateTime();
    setInterval(()=>{
      this.updateTime();
    },60000);//每一分钟变化
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