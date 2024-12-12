App({
  onLaunch() {
    if(!wx.getStorageSync('isLogin')){
      wx.setStorageSync('isLggin', false)
    }
  },
  globalData: {}
})
