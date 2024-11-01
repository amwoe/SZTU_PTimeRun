// pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 跳转
   */
  onImageClick1:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/fabudingdan/fabudingdan',
    });
  },
  onImageClick4:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/xuexizhidao/xuexizhidao',
    });
  },
  onImageClick5:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/xianwuchushou/xianwuchushou',
    });
  },
  onImageClick6:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/zujie/zujie',
    });
  },
  onImageClick7:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages',
    });
  },
  onImageClick8:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/faxiantuijianxiangqing/faxiantuijianxiangqing',
    });
  },

  redirectToPage1:function(){
    wx.redirectTo({
      url: '/pages/shouye/shouye',
    })
  },
  redirectToPage2:function(){
    wx.redirectTo({
      url: '/pages/dingdan/dingdan',
    })
  },
  redirectToPage3:function(){
    wx.redirectTo({
      url: '/pages/wode/wode',
    })
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