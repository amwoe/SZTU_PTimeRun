Page({
  data: {
    account: '',
    password: '',
    isPasswordVisible: false,
    isChecked: false,
    loginError: false,
  },

  onAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  togglePasswordVisibility() {
    this.setData({
      isPasswordVisible: !this.data.isPasswordVisible
    });
  },

  onForget() {
    wx.getUserProfile({
      desc: '用于用户验证',
      success: (res) => {
        console.log('用户授权信息', res.userInfo);
      },
      fail: (res) => {
        console.log('用户拒绝授权', res);
      }
    });
  },

  onCheckboxChange:function(e) {
    this.setData({
      isChecked: !this.data.isChecked
    });
  },

  onAgreementTap() {
    wx.openPrivacyContract();
    this.setData({
      isChecked: true
    });
  },

  onShareAppMessage() {
    return {};
  },

  onLogin() {
    if (!this.data.isChecked) {
      wx.showToast({
        title: '请同意用户协议',
        icon: 'none'
      });
      return;
    }

    // 构建请求体
    const loginData = {
      account: this.data.account,
      password: this.data.password,
    };

    // 发起网络请求
    wx.request({
      url: 'http://127.0.0.1:3000/api/login', // 替换为后端API地址
      method: 'POST',
      data: loginData,
      header: {
        'content-Type': 'application/json',
      },
      success: (res) => {
        if (res.data.success) {
          
          console.log(res.data.data)

          const token = res.data.data.token;
          wx.setStorageSync('token', token); // 存储token到本地存储
          wx.setStorageSync('userId', this.data.account); 
          wx.setStorageSync('isLogin', true)
          wx.reLaunch({
            url: '/pages/shouye/shouye',
          });
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
        } else {
          this.setData({
            loginError: true,
            password: '', // 清空密码字段
          });
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
  onShow(){
    if(wx.getStorageSync('isLogin')){
      wx.reLaunch({
        url: '/pages/shouye/shouye',
      })
    }
  },
});