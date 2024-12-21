Page({
  data: {
    years: [],
    months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    days: [],
    hours: [],
    minutes: [],
    selectedYear: '',
    selectedMonth: '1',
    selectedDay: '1',
    selectedHour: '0',
    selectedMinute: '0',
    selected: '不限',
    selectedOption: '请选择服务',
    showModal: false,
    description: '',
    address: '',
    reward: '',
    userId:'',
  },

  onOptionChange(e) {
    this.setData({
      selected: e.detail.value,
    });
  },

  onConfirm() {
    this.submitForm();
  },

  showOption() {
    this.setData({
      showModal: true,
    });
  },

  hideOptions() {
    this.setData({
      showModal: false,
    });
  },

  selectOption(e) {
    const selectedValue = e.currentTarget.dataset.value;
    this.setData({
      selectedOption: selectedValue,
      showModal: false,
    });
  },

  onLoad(options) {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i <= currentYear + 5; i++) {
      years.push(i.toString());
    }
    const hours = Array.from({ length: 24 }, (_, i) => i.toString());
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString());

    this.setData({
      years: years,
      selectedYear: currentYear.toString(),
      hours: hours,
      minutes: minutes,
      userId: wx.getStorageSync('userId') || '',
    });
    this.updateDays();
  },

  onYearChange(e) {
    const year = this.data.years[e.detail.value];
    this.setData({
      selectedYear: year,
    });
    this.updateDays();
  },

  onMonthChange(e) {
    const month = this.data.months[e.detail.value];
    this.setData({
      selectedMonth: month,
    });
    this.updateDays();
  },

  onDayChange(e) {
    const day = this.data.days[e.detail.value];
    this.setData({
      selectedDay: day,
    });
  },

  onHourChange(e) {
    const hour = this.data.hours[e.detail.value];
    this.setData({
      selectedHour: hour,
    });
  },

  onMinuteChange(e) {
    const minute = this.data.minutes[e.detail.value];
    this.setData({
      selectedMinute: minute,
    });
  },

  updateDays() {
    const year = parseInt(this.data.selectedYear);
    const month = parseInt(this.data.selectedMonth);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    this.setData({
      days: days,
      selectedDay: days[0],
    });
  },

  onDescriptionChange(e) {
    this.setData({
      description: e.detail.value,
    });
  },

  onAddressChange(e) {
    this.setData({
      address: e.detail.value,
    });
  },

  onRewardChange(e) {
    this.setData({
      reward: e.detail.value,
    });
  },

  submitForm() {
    const dataToSend = {
      task_type: this.data.selectedOption,
      description: this.data.description,
      location: this.data.address,
      hour: this.data.selectedHour,
      minute: this.data.selectedMinute,
      runner_gender_requirement: this.data.selected,
      salary: this.data.reward,
      publisher_id:this.data.userId,
    };
    console.log(dataToSend)

    wx.request({
      url: 'http://127.0.0.1:3000/api/setTask', 
      method: 'POST',
      data: dataToSend,
      timeout: 30000,
      success: res => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            complete: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 1000);
            }
          });
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: err => {
        console.error('请求失败', err);
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
});