// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [{urls: 'https://tuapi.eees.cc/api.php?category=fengjing&px=m&type=302&r=' + Math.random()}, {urls: 'https://tuapi.eees.cc/api.php?category=fengjing&px=m&type=302&r=' + Math.random()}],
      indicatorDots: false,
      vertical: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      viewCount: 5,
      showAd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getPhoto()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
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

  closeAd () {
    this.setData({
      showAd: false
    })
  },
  palyEnd () {
    this.setData({
      viewCount: this.data.viewCount + 5
    })
    this.this.getPhoto()
  },

  getPhoto () {
    wx.request({
      url: 'https://www.mxnzp.com/api/image/girl/list/random?app_id=fsehmotitksj8mqq&app_secret=MEhZMitYNGlsVVVRVEt6bjN1VVZnZz09',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
          let list = []
          res.data.data.forEach(item => {
            list.push({urls: item.imageUrl})
          })
          this.setData({
            list: [...this.data.list, ...list]
          })
          wx.hideLoading()
      }
    })
  },

  bindanimationfinish(event) {
    if (event.detail.current === this.data.list.length - 1) {
      this.setData({
        list: [...this.data.list, {urls: 'https://tuapi.eees.cc/api.php?category=fengjing&px=m&type=302&r=' + Math.random()}]
      })
      
      // this.getPhoto()
      // if (event.detail.current < this.data.viewCount - 1) {
      //   this.getPhoto()
      // } else {
      //   this.setData({
      //     showAd: true
      //   })
      // }
    }
  },
  photoPreview(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  }
})