// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [{urls: 'https://tuapi.eees.cc/api.php?category=meinv&px=m&type=302&r=' + Math.random()}, {urls: 'https://tuapi.eees.cc/api.php?category=meinv&px=m&type=302&r=' + Math.random()}],
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

  closeAd () {
    this.setData({
      showAd: false
    })
  },
  palyEnd () {
    this.setData({
      viewCount: this.data.viewCount + 5
    })
    this.getPhoto()
  },

  getPhoto () {
    wx.request({
      url: 'https://gank.io/api/v2/random/category/Girl/type/Girl/count/5',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
          this.setData({
            list: [...this.data.list, ...res.data.data]
          })
          wx.hideLoading()
      }
    })
  },

  bindanimationfinish(event) {
    if (event.detail.current === this.data.list.length - 1) {
      let urls = 'https://tuapi.eees.cc/api.php?category=meinv&px=m&type=302&r=' + Math.random()
      if (this.data.list.length % 2 == 0) {
        urls = 'https://www.hlapi.cn/api/sjmm1?r=' + Math.random()
      }
      this.setData({
        list: [...this.data.list, {urls}]
      })
    }
  },
})