const { woderenwuList } = require('../woderenwu/woderenwu.js');

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
        console.log(this.data.index);
        // 调用接口设置订单
        this.setOrder(prevPage.data.sections[this.data.index]);
        // 从上一个页面的数据中移除该任务
        prevPage.removeSection(this.data.index);
      } else {
        console.error('Index out of range:', this.data.index);
      }
      wx.navigateBack({
        delta: 1,
      });
    }, 500);
  },
  
  setOrder: function(task) {
    const userId = wx.getStorageSync('userId'); // 从缓存中获取userId
    console.log(userId)
    console.log(task.task_id)
    wx.request({
      url: 'http://127.0.0.1:3000/api/setOrder', // 确保URL正确
      method: 'POST',
      data: {
        user_id: userId, // 使用缓存中的userId
        task_id: task.task_id// 使用上一个页面传过来的taskId
      },
      success: function(res) {
        if (res.statusCode === 200) {
          console.log('Order set successfully');
        } else {
          console.error('Failed to set order', res);
        }
      },
      fail: function(error) {
        console.error('Request failed', error);
      }
    });
  },

  saveToWoderenwu: function(item) {
    if (typeof woderenwuList !== 'undefined') {
      woderenwuList.push({
        ...item,
        status: '正在进行'
      });
      console.log(woderenwuList);
    } else {
      console.error('woderenwuList is not defined in woderenwu.js');
    }
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options);
    // 从上一个页面接收
    const index = parseInt(options.index, 10);
    const item = JSON.parse(decodeURIComponent(options.item));
    if (!["不限", "男", "女"].includes(item.gender)) {
      item.gender = "不限"; // 默认值或错误处理
    }
    this.setData({
      index: index,
      item: item,
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