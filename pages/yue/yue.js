// pages/yue/yue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,         // 余额
    unsettled: 0,       // 未结算
    completed_salary: 0,    // 今日收益
    ongoing_salary: 0,
    //userId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBalance();
    //this.getAnotherMoney();
  },
    /**
   * 获取余额
   */
  getBalance: function() {
      const userId = wx.getStorageSync('userId');
      console.log('Sending user_id:', userId);  // 打印获取到的 user_id
      wx.request({

        url: 'http://127.0.0.1:3000/api/getBalance', // 替换为实际的接口URL
        method: 'POST',
        data: {
          user_id: userId,  // 传递 user_id 或 employee_id
        },
        success: (res) => {
          console.log(res.data);
          
          if (res.data && res.data.balance !== undefined) {
            //console.log(res.data);
            // 将balance缓存到本地存储
            wx.setStorageSync('balance', res.data.balance);

            this.setData({
              balance: res.data.balance // 假设接口返回的数据中有 balance 字段
            });
            this.getAnotherMoney(); 
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
    
    getAnotherMoney: function() {
      const userId = wx.getStorageSync('userId');
      console.log('Sending employee_id:', userId);  // 打印获取到的 user_id
      wx.request({
        url: 'http://127.0.0.1:3000/api/getAnotherMoney', // 替换为实际的接口URL
        method: 'POST',
        data: {
          employee_id: userId,  // 传递 user_id 或 employee_id
        },
        success: (res) => {
          console.log(res.data);
          
          if (res.data && res.data.length > 0) {
            const salaryData = res.data[0];  // 获取数组中的第一个对象
            this.setData({
              completed_salary: salaryData.completed_salary,  // 设置完成工资
              ongoing_salary: salaryData.ongoing_salary,      // 设置进行中工资
            });
            
          } else {
            wx.showToast({
              title: '获取数据失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          console.log('Request failed:', err);
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      });
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

  navigateToDetail: function() {
    wx.navigateTo({
      url: '/pages/tixian/tixian'
    });
  }
})
