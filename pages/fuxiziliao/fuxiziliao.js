Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [] // 假设您有一个items数组存放需要传递的数据
  },

  onImageTap: function(e){
    // 获取图片索引
    const index = e.currentTarget.dataset.index;
    const item = this.data.items[index];
    // 确保item存在，然后使用encodeURIComponent对JSON字符串进行编码
    if (item) {
      wx.navigateTo({
        url: '/pages/fuxixiangqing/fuxixiangqing?item=' + encodeURIComponent(JSON.stringify(item)),
      });
    }
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