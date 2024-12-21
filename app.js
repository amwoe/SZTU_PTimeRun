App({
  onLaunch() {
    if(!wx.getStorageSync('isLogin')){
      wx.setStorageSync('isLogin', false)
    }
  },
  globalData: {}
})
