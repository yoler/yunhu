// miniprogram/pages/home/index.js
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
    this.getPhoto()
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
    wx.request({
      url: 'https://api.unsplash.com/photos/random?count=10&client_id=I34B29cGyFcghMtmEYd__KFl7yKi99KS-IAPS06Ub4c&w=300&h=600',
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
              this.setData({
                list: [...this.data.list, {urls: {regular: res.data.imgurl}}]
              })
            }
          })
        } else {
          let list = []
          res.data.forEach(item => {
            list.push({urls: item.urls})
          })
          this.setData({
            list: [...this.data.list, ...list]
          })
        }
      }
    })
  },

  bindanimationfinish(event) {
    if (event.detail.current === this.data.list.length - 1) {
      this.getPhoto()
    }
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
  },
  photoPreview(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  }
})