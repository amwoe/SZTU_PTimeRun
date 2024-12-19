Page({
  data: {
    index: -1,
    item: {}, // 存储订单详情
  },

  // 跳转到联系页面
  navigateToContact: function () {
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian',
    });
  },

  // 确认接单
  onConfirm: function () {
    wx.showToast({
      title: '接单成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 获取上一个页面实例
      if (prevPage && this.data.index !== -1 && this.data.index < prevPage.data.sections.length) {
        // 更新上一个页面中相应订单的状态
        prevPage.updateSectionType(this.data.index, '正在进行');
      } else {
        console.error('Index out of range:', this.data.index);
      }
      wx.navigateBack({
        delta: 1,
      });
    }, 500);
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    // 从上一个页面接收
    const item = JSON.parse(decodeURIComponent(options.item));
    if (!["不限", "男", "女"].includes(item.gender)) {
      item.gender = "不限"; // 默认值或错误处理
    }
    this.setData({
      item:item,
    });
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    // 可以在这里进行页面的初始化操作
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    // 页面显示时的操作
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {
    // 页面隐藏时的操作
  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {
    // 页面卸载时的操作
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // 下拉刷新操作
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    // 上拉触底操作
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    // 分享操作
  },
});