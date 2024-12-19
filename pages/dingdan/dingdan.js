Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchQuery: '',
    searchResults: [],
    sections: [],
  },

  updateSectionType: function(index, newType) {
    if (index >= 0 && index < this.data.sections.length) {
      const updatedSections = this.data.sections.map((item, idx) => {
        if (idx === index) {
          return { ...item, type: newType };
        }
        return item;
      });
      this.setData({ sections: updatedSections }, () => {
        console.log('Sections updated:', this.data.sections);
      });
    } else {
      console.error('Index out of range:', index);
    }
  },

  onImageClick1: function (e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.sections[index];
    console.log(item);
    if (item.type === '不可接单') {
      // 如果type为不可接单，则不执行任何操作
      return;
    }else{
      wx.navigateTo({
        url: '/pages/dingdanxiangqing/xiangqing?item=' + encodeURIComponent(JSON.stringify(item)),
      });
    }
  },

  redirectToPage1: function () {
    wx.redirectTo({
      url: '/pages/shouye/shouye',
    })
  },
  redirectToPage2: function () {
    wx.redirectTo({
      url: '/pages/dingdan/dingdan',
    })
  },
  redirectToPage3: function () {
    wx.redirectTo({
      url: '/pages/wode/wode',
    })
  },

  onSearch: function () {
    const { searchQuery, sections } = this.data;
    if (!searchQuery.trim()) {
      this.setData({ searchResults: [] });
      return;
    }
    const searchResults = sections.filter(section =>
      section.name.includes(searchQuery) ||
      section.task.includes(searchQuery) ||
      section.description.includes(searchQuery) ||
      section.location.includes(searchQuery) ||
      section.type.includes(searchQuery)
    ).map(item => ({
      ...item, highlight: true
    }));
    if (searchResults.length === 0) {
      wx.showModal({
        title: '提示',
        content: '无结果',
        showCancel: false
      });
    } else {
      this.setData({ searchResults });
    }
  },

  onInputChange: function (e) { //更新搜索关键词
    this.setData({
      searchQuery: e.detail.value || '' // 使用 || 确保值为空字符串或实际输入
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },
  fetchData:function(){
    const that=this;
    wx.request({
      url: 'http://127.0.0.1:3000/api/getTask_1',
      method:'Get',
      success:function(res){
        if(res.statusCode===200){
          const formattedData=res.data.map(item=>({
            name:item.publisher_username,
            task:item.task_type,
            time:item.deadline,
            description:item.task_description,
            gender:item.runner_gender_requirement,
            location:item.address_info,
            price:item.salary,
            image:item.publisher_avator,
            type:item.task_status,
            byColor:item.gender==='男'?'#FFE4E1':'#E1F5FE',
            borderColor:item.gender==='男'?'#FF6347':'#2196F3'
          }));
          that.setData({
            sections:formattedData
          });
        }else{
          console.error("接口请求失败",res);
        }
      },
      fail:function(error){
        console.error('请求失败',error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})