// pages/imghander/imghander.js
const db = new wx.cloud.database()
import {
  Bitmap,
  ImageRunner,
  ShapeTypes,
  SvgExporter
} from '../../miniprogram_npm/geometrizejs/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getFile() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res.result.openid)
      db.collection('images').where({
        _openid: res.result.openid
      }).get().then(res2 => {
        console.log(res2)
        this.setData({
          imgList: res2.data
        })
        this.handlerImg(this.data.imgList[0])
      }).catch(err => {
        console.log(err)
      })
    })
  },
  handlerImg(img) {
    console.log(img)
  },
  onLoad: function(options) {
    // cloud://dh-prylc.6468-dh-prylc/1562601473566.png
    // const image = await Jimp.read('test/assets/logo.png')
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