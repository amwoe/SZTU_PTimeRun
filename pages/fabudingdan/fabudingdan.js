// pages/jiedan/jiedan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years:[],
    months:['1','2','3','4','5','6','7','8','9','10','11','12'],
    days:[],
    hours:[],
    minutes:[],
    selectedYear:'',
    selectedMonth:'1',
    selectedDay:'1',
    selectedHour:'0',
    selectedMinute:'0',
    selected:'不限',
    showModal:false,
    selectedOption:'请选择服务',
  },
  navigateToContact() {
    wx.navigateTo({
      url: '/pages/liaotian/liaotian' 
    });
  },  
  onOptionChange(e){
    this.setData({
      selected:e.detial.value
    });
  },
  onConfirm:function(){
    wx.showToast({
      title:'发布成功',
      icon:'success',
      duration:2000,
      complete:()=>{
        setTimeout(()=>{
          wx.navigateBack();
        },1000);
      }
    });
  },
  showOption(){
    this.setData({
      showModal:true
    });
  },
  hideOptions(){
    this.setData({
      showModal:false
    });
  },
  selectOption(e){
    const selectedValue=e.currentTarget.dataset.value;
    this.setData({
      selectedOption:selectedValue,
      showModal:false
    });
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const currentYear=new Date().getFullYear();
    const years=[];
    for(let i=currentYear;i<=currentYear+5;i++){
      years.push(i.toString());
    }
    const hours=Array.from({length:24},(_,i)=>i.toString());
    const minutes=Array.from({length:60},(_,i)=>i.toString());

    this.setData({
      years:years,
      selectedYear:currentYear.toString(),
      hours:hours,
      minutes:minutes,
    });
    this.updateDays();
  },
  onYearChange(e){
    const year=this.data.years[e.detail.value];
    this.setData({
      selectedYear:year,
    });
    this.updateDays();
  },
  onMonthChange(e){
    const month=this.data.months[e.detail.value];
    this.setData({
      selectedMonth:month,
    });
    this.updateDays();
  },
  onDayChange(e){
    const day=this.data.days[e.detail.value];
    this.setData({
      selectedDay:day,
    });
  },
  onHourChange(e){
    const hour=this.data.hours[e.detail.value];
    this.setData({
      selectedHour:hour,
    });
  },
  onMinuteChange(e){
    const minute=this.data.minutes[e.detail.value];
    this.setData({
      selectedMinute:minute,
    });
  },
  updateDays(){
    const year=parseInt(this.data.selectedYear);
    const month=parseInt(this.data.selectedMonth);
    const daysInMonth=new Date(year,month,0).getDate();
    const days=Array.from({length:daysInMonth},(_,i)=>(i+1).toString());
    this.setData({
      days:days,
      selectedDay:days[0],
    });
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