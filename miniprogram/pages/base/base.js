// pages/base/base.js
const db = new wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'Cyberpunk 2077',
    img: '/images/cyber.png',
    date: new Date(2020, 3, 16).getTime(),
    day: '',
    hour: '',
    minute: '',
    sec: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setInterval(() => {
      let now = new Date().getTime()
      let sec = Math.floor((this.data.date - now) / 1000)
      let day = Math.floor(sec / 86400)
      sec %= 86400
      let hour = Math.floor(sec / 3600)
      sec %= 3600
      let minute = Math.floor(sec / 60)
      sec = Math.floor(sec % 60)
      this.setData({
        day,
        hour,
        minute,
        sec
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})