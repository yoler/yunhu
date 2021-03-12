// miniprogram/pages/home/index.js
const jinrishici = require('../../utils/jinrishici.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [],
      indicatorDots: false,
      vertical: true,
      autoplay: false,
      interval: 2000,
      duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget')
    this.getPhoto()
    setTimeout(() => {
      this.getPhoto()
    }, 3000)
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

  },

  getPhoto () {
    let url = 'https://api.unsplash.com/photos/random?count=10&client_id=I34B29cGyFcghMtmEYd__KFl7yKi99KS-IAPS06Ub4c&w=300&h=600'
    url = 'https://api.unsplash.com//photos/random?count=1&query=scenery&client_id=I34B29cGyFcghMtmEYd__KFl7yKi99KS-IAPS06Ub4c&orientation=portrait'
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if (res.statusCode === 403) {
          wx.request({
            url: 'https://api.ixiaowai.cn/gqapi/gqapi.php?return=json', //仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              jinrishici.load(result => {
                this.setData({
                  list: [...this.data.list, {urls: {regular: res.data.imgurl}, data: result.data}]
                })
              })
            }
          })
        } else {
          jinrishici.load(result => {
            this.setData({
              list: [...this.data.list, {urls: res.data[0].urls, data: result.data}]
            })
          })
        }
      },
    })
  },

  bindanimationfinish(event) {
    if (event.detail.current === this.data.list.length - 1) {
      this.getPhoto()
    }
  },
  share() {
    wx.navigateTo({
      url: '/pages/wxml2canvas/index',
    })
  },
  switchHome() {
    wx.switchTab({url: '/pages/home/index'})
  },
  switchPhoto() {
    wx.switchTab({url: '/pages/photo/index'})
  },
  switchSentence() {
    wx.switchTab({url: '/pages/sentence/index'})
  },
  switchMusic() {
    wx.switchTab({url: '/pages/music/index'})
  }
})