// pages/wode/wode.js
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
    wx.navigateTo({
      url: '/pages/wodedizhi/wodedizhi', 
    });
  },
  onImageClick2:function(){
    wx.navigateTo({
      url: '/pages/xiaoxi/xiaoxi', 
    });
  },
  onImageClick5:function(){
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian', // 跳转到详情页面
    });
  },
  onImageClick6:function(){
    wx.navigateTo({
      url: '/pages/woderenwu/woderenwu', // 跳转到详情页面
    });
  },
  onImageClick7:function(){
    wx.navigateTo({
      url: '/pages/jiedanshezhi/jiedanshezhi', // 跳转到详情页面
    });
  },
  onImageClick8:function(){
    wx.navigateTo({
      url: '/pages/wodedingdan/wodedingdan', // 跳转到详情页面
    });
  },
  onImageClick9:function(){
    wx.navigateTo({
      url: '/pages/yue/yue', // 跳转到详情页面
    });
  },
  onImageClick10:function(){
    wx.navigateTo({
      url: '/pages/denglu/denglu', // 跳转到详情页面
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
