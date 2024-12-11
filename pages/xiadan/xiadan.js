// pages/xiadan/xiadan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  data: {
    categories: ['闲置', '租借', '代课'], // 可供选择的类别
    selectedCategory: '闲置', // 默认选中的类别
    selectedIndex: 0, // 默认选中的索引
    price: '0.00' // 初始价格
  },
  onCategoryChange: function(e) {
    // 更新选中的类别和索引
    this.setData({
      selectedIndex: e.detail.value,
      selectedCategory: this.data.categories[e.detail.value]
    });
  },
  updatePrice: function(e) {
    // 更新价格
    this.setData({
      price: e.detail.value ? e.detail.value + '.00' : '0.00'
    });
  }
  
})
