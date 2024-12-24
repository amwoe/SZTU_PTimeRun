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
  onImageClick2:function(){
    wx.navigateTo({
      url: '/pages/xiaoxi/xiaoxi', 
    });
  },
  onImageClick5:function(){
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian', 
    });
  },
  onImageClick6:function(){
    wx.navigateTo({
      url: '/pages/woderenwu/woderenwu',
    });
  },
  onImageClick7:function(){
    wx.navigateTo({
      url: '/pages/jiedanshezhi/jiedanshezhi', 
    });
  },
  onImageClick8:function(){
    wx.navigateTo({
      url: '/pages/wodedingdan/wodedingdan', 
    });
  },
  onImageClick9:function(){
    wx.navigateTo({
      url: '/pages/yue/yue', 
    });
  },
  onImageClick10:function(){
    wx.navigateTo({
      url: '/pages/denglu/denglu', 
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
  //退出逻辑
  ontuichu:function(){
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    wx.removeStorageSync('isLogin');
    wx.redirectTo({
      url: '/pages/denglu/denglu',
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
