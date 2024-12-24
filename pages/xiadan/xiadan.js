Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [], // 存储已上传的图片路径
    price: '0.00', // 初始价格
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
      price: e.detail.value ? e.detail.value : '0.00'
    });
  },

  bit1: function() {
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
      complete: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    });
  },

  // 页面中的按钮点击事件
  uploadImage: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 可以选择的图片数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
        // 上传文件
        tempFilePaths.forEach(function(filePath) {
          wx.uploadFile({
            url: 'https://example.com/upload',  // 上传接口地址
            filePath: filePath, // 要上传文件资源的路径
            name: 'file', // 服务器定义的文件对应的 key
            formData: {
              'user': 'test' // 其他额外的参数
            },
            success: function(uploadRes) {
              var data = uploadRes.data;
              // 上传成功后的处理逻辑
              console.log(data);
            },
            fail: function(error) {
              // 上传失败后的处理逻辑
              console.error(error);
            }
          });
        });
      },
      fail: function(error) {
        // 选择图片失败后的处理逻辑
        console.error(error);
      }
    });
  },
})
