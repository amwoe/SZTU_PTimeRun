Page({
  data: {
    account:'',
    password:'',
    isPasswordVisible:false
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
  
  onShareAppMessage() {
    return {};
  },
});