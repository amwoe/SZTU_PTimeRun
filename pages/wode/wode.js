//const { myOrder, myOrderCount } = require("../../server/module/get");

//const { myTask } = require("../../server/module/get");

// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTaskOngoing: 0,
    myTaskunlock: 0,
    myTaskComplete: 0,

    myOrderOngoing: 0,
    myOrderComplete: 0,
    balance: 0,
  },
  /**
   * 跳转
   */
  onImageClick2:function(){
    wx.navigateTo({
      url: '/pages/xiaoxi/xiaoxi', 
    });
  },
  onImageClick5:function(){
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian', 
    });
  },
  onImageClick6:function(){
    wx.navigateTo({
      url: '/pages/woderenwu/woderenwu',
    });
  },
  onImageClick7:function(){
    wx.navigateTo({
      url: '/pages/jiedanshezhi/jiedanshezhi', 
    });
  },
  onImageClick8:function(){
    wx.navigateTo({
      url: '/pages/wodedingdan/wodedingdan', 
    });
  },
  onImageClick9:function(){
    wx.navigateTo({
      url: '/pages/yue/yue', 
    });
  },
  onImageClick10:function(){
    wx.navigateTo({
      url: '/pages/denglu/denglu', 
    });
  },
  redirectToPage1:function(){
    wx.redirectTo({
      url: '/pages/shouye/shouye',
    })
  },
  redirectToPage2:function(){
    wx.redirectTo({
      url: '/pages/dingdan/dingdan',
    })
  },
  redirectToPage3:function(){
    wx.redirectTo({
      url: '/pages/wode/wode',
    })
  },
  //退出逻辑
  ontuichu:function(){
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    wx.removeStorageSync('isLogin');
    wx.redirectTo({
      url: '/pages/denglu/denglu',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetMyOrder()
  },
  GetMyOrder: function() {
    const userId = wx.getStorageSync('userId');
    console.log('Sending user_id:', userId);  // 打印获取到的 user_id
    wx.request({
      url: 'http://127.0.0.1:3000/api/myOrderCount', // 替换为实际的接口URL
      method: 'POST',
      data: {
        user_id: userId,  // 传递 user_id 或 employee_id
      },
      success: (res) => {
        console.log(res.data);
        const data = res.data[0];
        if (res.data) {
          // 接口返回的任务列表
          this.setData({
            myOrderOngoing : data.in_progress_count,
            myOrderComplete: data.completed_count
          });
          console.log(this.data.tasks); // 正确输出任务列表
          this.GetMyTask()
        } else {
          wx.showToast({
            title: '获取我接单的失败',
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
  GetMyTask: function() {
    const userId = wx.getStorageSync('userId');
    console.log('Sending user_id:', userId);  // 打印获取到的 user_id
    wx.request({
      url: 'http://127.0.0.1:3000/api/myTaskCount', // 替换为实际的接口URL
      method: 'POST',
      data: {
        user_id: userId,  // 传递 user_id 或 employee_id
      },
      success: (res) => {
        console.log(res.data);
        const data = res.data[0];
        if (res.data) {
          // 接口返回的任务列表
          this.setData({
            myTaskOngoing: data.in_progress_count,
            myTaskunlock: data.unclaimed_count,
            myTaskComplete: data.completed_count,
          });
          console.log(this.data.tasks); // 正确输出任务列表
          this.getBalance()
        } else {
          wx.showToast({
            title: '获取我接单的失败',
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
