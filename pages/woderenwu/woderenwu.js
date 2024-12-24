// pages/woderenwu/woderenwu.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: [] // 用来存储任务列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadTasks();
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
    this.loadTasks();
  },

  loadTasks: function() {
    const userId = wx.getStorageSync('userId');
    console.log('Sending user_id:', userId);  // 打印获取到的 user_id
    wx.request({
      url: 'http://127.0.0.1:3000/api/myOrder', // 替换为实际的接口URL
      method: 'POST',
      data: {
        user_id: userId,  // 传递 user_id 或 employee_id
      },
      success: (res) => {
        console.log(res.data);
        
        if (res.data && Array.isArray(res.data)) {
          // 接口返回的任务列表
          this.setData({
            tasks: res.data // 更新页面数据中的任务列表
          });
          console.log(this.data.tasks); // 正确输出任务列表
          
        } else {
          wx.showToast({
            title: '获取余额失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
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