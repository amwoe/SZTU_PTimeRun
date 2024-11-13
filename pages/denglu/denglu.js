Page({
  data: {
    account:'',
    password:'',
    isPasswordVisible:false,
    idChecked:false
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
      isChecked:e.detail.value.length>0
    })
  },


  onAgreementTap:function(){
    wx.openPrivacyContract();
  },

  onShouye:function(){
    wx.reLaunch({
      url: '/pages/shouye/shouye',
    }),
    wx.showToast({
      title: '登录成功',
      icon:'success'
    })
  },
  onShareAppMessage() {
    return {};
  },
});