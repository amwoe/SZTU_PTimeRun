Page({
  onShareAppMessage() {
    return {};
  },

  data: {
    balance: 5.3, // 初始余额
    withdrawalAmount: '', // 提现金额
  },
  onWithdrawalInput: function(e) {
    this.setData({
      withdrawalAmount: e.detail.value,
    });
  },
  handleWithdraw: function() {
    const withdrawalAmount = this.data.withdrawalAmount.trim(); // 去除前后空格
    if (withdrawalAmount === '' || parseFloat(withdrawalAmount) <= 0 || isNaN(parseFloat(withdrawalAmount))) {
      // 提现金额为空、非正数或不是一个有效的数字
      wx.showToast({
        title: '请输入有效的提现金额',
        icon: 'none',
      });
      return;
    }
    if (parseFloat(withdrawalAmount) > this.data.balance) {
      // 提现金额超过余额
      wx.showToast({
        title: '提现金额超过余额',
        icon: 'none',
      });
      return;
    }
    // 计算新的余额
    const newBalance = this.data.balance - parseFloat(withdrawalAmount);
    // 更新余额数据
    this.setData({
      balance: newBalance,
      withdrawalAmount: '', // 清空输入框
    });
    wx.showToast({
      title: '提现成功',
      icon: 'success',
    });
  },
})
