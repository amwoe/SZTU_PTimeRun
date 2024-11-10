// pages/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchQuery:'',
    searchResults:[],
    /**
    sections: [
      {
        name: '沈海辛',
        task: '食堂带饭',
        time: '09:18',
        description: '第二食堂带辣椒炒肉，西红柿鸡蛋',
        gender: '女生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image:'/pages/images/8/1.png',
        borderColor:'#FF6347',
        bgColor:'#FFE4E1'
      },
      {
        name: '宁桑娅',
        task: '代取快递',
        time: '09:18',
        description: '菜鸟驿站 3个小件',
        gender: '女生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image:'/pages/images/8/2.png',
        borderColor:'#FF6347',
        bgColor:'#FFE4E1'
      },
      {
        name: '邓御寒',
        task: '外卖上楼',
        time: '09:18',
        description: '娃哈哈 x1',
        gender: '女生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image:'/pages/images/8/4.png',
        borderColor:'#FF6347',
        bgColor:'#FFE4E1'
      },
    ],
    */
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
    if(!this.data.searchQuery.trim()){return;}
    setTimeout(()=>{
      const searchReaults=['结果1-${this.data.searchQuery','结果2-${this.data.searchQuery'];
      this.setData({
        searchResults
      });
    },1000);
  },

  onInputChange(e){//更新搜索关键词
    this.setData({
      searchQuery: e.detail.value || '' // 使用 || 确保值为空字符串或实际输入
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