// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchQuery:'',
    results:[],
    sections: [
      {
        name: '沈海辛',
        service: '食堂带饭',
        time: '09:18',
        details: '第二食堂带辣椒炒肉，西红柿鸡蛋',
        gender: '女生',
        address: 'xx省xx市xx区学校宿舍5栋203',
        price: '20'
      },
      {
        name: '宁桑娅',
        service: '代取快递',
        time: '09:18',
        details: '菜鸟驿站 3个小件',
        gender: '女生',
        address: 'xx省xx市xx区学校宿舍5栋203',
        price: '20'
      },
      {
        name: '邓御寒',
        service: '外卖上楼',
        time: '09:18',
        details: '娃哈哈 x1',
        gender: '女生',
        address: 'xx省xx市xx区学校宿舍5栋203',
        price: '20'
      },
    ],
  },

  onImageClick1:function(){
    // console.log("Image clicked!"); 
    wx.navigateTo({
      url: '/pages/dingdanxiangqing/xiangqing',
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

  onSearch(){
    const{searchQuery}=this.data;
    //添加搜索逻辑
    const allItems=[];
    const results=allItems.filter(item=>item.includes(searchQuery));
    this.setData({
      results:results,
    });
  },

  onInputChange(e){
    const value=e.detail.value;
    this.setData({
      searchQuery:value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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