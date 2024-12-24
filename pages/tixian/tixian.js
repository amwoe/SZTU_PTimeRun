Page({
  data: {
    balance:0,
  },
  onLoad: function(options) {
    // 获取缓存中的 balance
    const balance = wx.getStorageSync('balance');
    
    if (balance !== undefined) {
      this.setData({
        balance: balance  // 将 balance 显示在页面上
      });
    } else {
      wx.showToast({
        title: '余额未获取到，请稍后再试',
        icon: 'none'
      });
    }
  },
  onShareAppMessage() {
    return {};
  },
});