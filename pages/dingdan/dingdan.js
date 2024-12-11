Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchQuery: '',
    searchResults: [],
    sections: [
      {
        name: '沈海辛',
        task: '食堂带饭',
        time: '09:18',
        description: '第二食堂带辣椒炒肉，西红柿鸡蛋',
        gender: '女生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image: '/pages/images/8/1.png',
        borderColor: '#FF6347',
        bgColor: '#FFE4E1',
        type: '未接单'
      },
      {
        name: '宁桑娅',
        task: '代取快递',
        time: '16:18',
        description: '菜鸟驿站 3个小件',
        gender: '男生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image: '/pages/images/8/3.png',
        borderColor: '#FF6347',
        bgColor: '#FFE4E1',
        type: '未接单'
      },
      {
        name: '邓御寒',
        task: '外卖上楼',
        time: '20:00',
        description: '娃哈哈 x1',
        gender: '女生',
        location: 'xx省xx市xx区学校宿舍5栋203',
        price: '20',
        image: '/pages/images/8/4.png',
        borderColor: '#FF6347',
        bgColor: '#FFE4E1',
        type: '已完成'
      },
      {
        name: '小陈',
        task: '闲物出售',
        time: '20:00',
        description: '毕业季清仓',
        gender: '不限',
        location: 'xx省xx市xx区学校宿舍e2栋203',
        price: '0',
        image: '/pages/images/17,18/1.png',
        borderColor: '#FF6347',
        bgColor: '#FFE4E1',
        type: '未接单'
      },
      {
        name: '李哥',
        task: '租借',
        time: '20:00',
        description: '出租佳能',
        gender: '不限',
        location: 'xx省xx市xx区学校宿舍e3栋1703',
        price: '100',
        image: '/pages/images/17,18/2.png',
        borderColor: '#FF6347',
        bgColor: '#FFE4E1',
        type: '未接单'
      },
    ],
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
        url: '/pages/dingdanxiangqing/xiangqing?index=' + index,
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