Page({
  data: {
    account:'',
    password:'',
    isPasswordVisible:false,
    isChecked:false,
    loginError:false,
    correctAccount:'sztu',
    correctPassword:'123456',
  },

  onAccountInput(e){
    console.log(e.detail.value)
    this.setData({
      account:e.detail.value
    });
  },
  onPasswordInput(e){
    console.log(e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },


  togglePasswordVisibility(){
    this.setData({
      isPasswordVisible:!this.data.isPasswordVisible
    })
  },

  onForget:function(){
    wx.getUserProfile({
      desc: '用于用户验证',
      success:(res)=>{
        console.log('用户授权信息',res.userInfo);
      },
      fail:(res)=>{
        console.log('用户拒绝授权',res)
      }
    })
  },

  onCheckboxChange:function(e){
    this.setData({
      isChecked: !this.data.isChecked
    })
  },

  onAgreementTap:function(){
    wx.openPrivacyContract();
    this.setData({
      isChecked:true
    })
  },

  onShareAppMessage() {
    return {};
  },
  onLogin:function(){
    if(!this.data.isChecked){
      wx.showToast({
        title: '请同意用户协议',
        icon:'none'
      });
      return;
    }
    if(this.data.account===this.data.correctAccount&&this.data.password===this.data.correctPassword){
      wx.reLaunch({
        url: '/pages/shouye/shouye',
      }),
      wx.showToast({
        title: '登录成功',
        icon:'success'
      })
    }else{
      this.setData({
        loginError:true
      });
    }
  },
});