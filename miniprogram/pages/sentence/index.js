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
    wx.request({
      url: 'https://api.ixiaowai.cn/api/api.php?return=json', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.request({
          url: 'https://v1.hitokoto.cn?c=a&c=b&c=d&c=h&c=k&c=j',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (result) => {
            this.setData({
              list: [...this.data.list, {urls: {regular: res.data.imgurl}, data: result.data}]
            })
          },
        })
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
  }
})