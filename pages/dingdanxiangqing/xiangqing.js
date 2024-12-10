Page({
  data: {
    index: -1,
  },

  navigateToContact() {
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian',
    });
  },

  onConfirm: function () {
    wx.showToast({
      title: '接单成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; // 确保这是正确的前一个页面
      if (prevPage && this.data.index !== -1 && this.data.index < prevPage.data.sections.length) {
        prevPage.updateSectionType(this.data.index, '不可接单');
      } else {
        console.error('Index out of range:', this.data.index);
      }
      wx.navigateBack({
        delta: 1,
      });
    }, 500);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: parseInt(options.index, 10),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})