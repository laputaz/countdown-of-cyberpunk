// pages/cloud/cloud.js
const db = new wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '某某产品',
    img: '/images/cyber.png',
    date: new Date(2020, 3, 16).getTime(),
    day: '',
    hour: '',
    minute: '',
    sec: '',
    imgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFile()
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

  },
  insert(e) {
    console.log(e)
    db.collection('user').add({
      data: {
        name: 'dh',
        age: 20
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  update(e) {

    let _this = this
    console.log(e)
    db.collection('user').doc('3e1ef27b5d23522d038c0f2e107553e1').update({
      data: {
        name: 'zdh',
        age: 18
      }
    }).then(res => {
      console.log(res)
      _this.getFile()
    }).catch(err => {
      console.log(err)
    })
  },
  sum() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 1,
        b: 2
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getOpenId() {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  mutilDel() {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    wx.cloud.callFunction({
      name: 'batchdel',
    }).then(res => {
      console.log(res)
      _this.getFile()
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  uploadImage() {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        let name = new Date().getTime()
        wx.cloud.uploadFile({
          cloudPath: `${name}.png`,
          filePath: tempFilePaths[0] // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          db.collection('images').add({
            data: {
              fileID: res.fileID,
              name: `${name}.png`,
              manager: 'zdh'
            }
          }).then(res => {
            console.log(res)
            _this.getFile()
            wx.hideLoading()
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
          })
        }).catch(error => {
          // handle error
          console.log(error)
          wx.hideLoading()
        })
      }
    })
  },
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
      }).catch(err => {
        console.log(err)
      })
    })
  },
  download(e) {
    console.log(e.currentTarget.dataset.fileid)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.fileid
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log(res)
        }
      })
    }).catch(error => {
      // handle error
    })
  }
})