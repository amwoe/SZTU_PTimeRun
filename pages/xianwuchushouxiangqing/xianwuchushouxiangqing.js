Page({
  data: {
    items: [null, null],
  },
  onOrderTap:function(){
    wx.navigateTo({
      url: '/pages/zhifu/zhifu',
    })
  },
  onConsultationTap:function(){
    wx.navigateTo({
      url: '/pages/dongtailiaotian/dongtailiaotian',
    })
  },
  onShareAppMessage() {
    return {};
  },
});
