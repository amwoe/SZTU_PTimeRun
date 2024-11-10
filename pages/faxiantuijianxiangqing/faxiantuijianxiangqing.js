// pages/faxiantuijianxiangqing/faxiantuijianxiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputContent:'',
    outputContents:[],
  },
  onInput(e){
    this.setData({
      inputContent:e.detail.value
    })
  },
  onSend(){
    if(this.data.inputContent.trim()){
      const newOutput={
        index:this.data.outputContents.length,
        content:this.data.inputContent
      }
      this.setData({
        outputContents:[...this.data.outputContents,newOutput],
        inputContent:''
      });
    }else{
      wx.showToast({
        title: '请输入内容~',
        icon:'none'
      })
    }
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