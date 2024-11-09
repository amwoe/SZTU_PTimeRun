// pages/faxiantuijianxiangqing/faxiantuijianxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailItem:[
      {imageSrc:'/pages/images/9，10，11/13.png',
      title:'交际英语',
      content:''},
      {
        imageSrc:'',
        title:'',
        content:''
      },
      {}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const item=JSON.parse(decodeURIComponent(options.item));
    const index=this.data.detailItem.findIndex((i)=>i.imageSrc===item.imageSrc)
    console.log(item);
    console.log(index);
    if(index!==-1){
      // 创建一个新的 detailItem 数组，其中包含更新后的数据
      const newDetailItem = this.data.detailItem.map((itemData, mapIndex) => {
        if (mapIndex === index) {
          return {
            ...itemData,
            title: item.text,
            content: '' // 如果需要，可以设置为其他值
          };
        }
        console.log(itemData);
        return itemData[index];
      });
      // 使用 setData 更新整个数组
      this.setData({
        detailItem: newDetailItem
      });
    }else{
      console.log('item not found')
    }
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