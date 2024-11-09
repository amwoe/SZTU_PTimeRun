// pages/fuxizhidao/fuxizhidao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { imageSrc: "/pages/images/12/矩形 14.png", text: "48天极限过四六级" },
      { imageSrc: "/pages/images/12/矩形 15（1）.png", text: "概率论与数理统计" },
      { imageSrc: "/pages/images/12/矩形 14（1）.png", text: "大学生高数自救指南" },
      { imageSrc: "/pages/images/12/矩形 15.png", text: "大学语文怎么复习" }
    ],
  },

  onImageTap:function(e){
    //获取图片索引
    const index=e.currentTarget.dataset.index;
    const item=this.data.items[index];
    wx.navigateTo({
      url: '/pages/faxiantuijianxiangqing/faxiantuijianxiangqing.js?item='+encodeURIComponent(JSON.stringify(item)),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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