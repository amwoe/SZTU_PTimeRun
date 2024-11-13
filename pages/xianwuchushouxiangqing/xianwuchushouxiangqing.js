Page({
  data: {
    items: [null, null],
  },


  onConsultationTap:function(){
    wx.showToast({
      title: '未留下联系方式...',
      icon:'none',
      duration:2000
    })
  },
  onOrderTap:function(){
    wx.navigateTo({
      url: '/pages/zujiexiadan/zujiexiadan',
    })
  },

  onShareAppMessage() {
    return {};
  },
});