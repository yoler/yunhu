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
      duration: 500,
      canvasHeight: 800,
      viewCount: 5,
      showAd: false
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
    wx.showLoading({
      title: '加载中',
    })
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
            wx.hideLoading()
          },
        })
      }
    })
    
  },

  bindanimationfinish(event) {
    if (event.detail.current === this.data.list.length - 1) {
      if (this.data.list.length <= this.data.viewCount) {
        this.getPhoto()
      } else {
        this.setData({
          showAd: true
        })
      }
    }
  },
  copy(event) {
    let content = event.target.dataset.data.hitokoto
    wx.setClipboardData({
      data: content,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  share(event) {
    let paperThis = this
    let ctx = wx.createCanvasContext('shareCanvas')
    let str = event.target.dataset.data.hitokoto
    str = str.replace(/\n/g, ' ')
    let comment = (event.target.dataset.data.from_who || '佚名') + ' - ' + '《' + event.target.dataset.data.from + '》'
    let canvasWidth = 400
    let leftWidth = 24
    let initHeight = 50
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引

    ctx.setFontSize(18)       // 文字字号：22px

    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > (canvasWidth - leftWidth * 2)) {
        initHeight += 36; //22为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
    }

    lastSubStrIndex = 0
    initHeight += 50
    lineWidth = 0
    ctx.setFontSize(14)
    for (let i = 0; i < comment.length; i++) {
      lineWidth += ctx.measureText(comment[i]).width;
      if (lineWidth > (canvasWidth - leftWidth * 2)) {
        initHeight += 30; //22为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
    }

    paperThis.canvasHeight = initHeight + 30 + 100 + 30

    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, 400, paperThis.canvasHeight)
    
    
    ctx.setTextAlign('left')    // 文字居中
    ctx.setFillStyle('#666')  // 文字颜色：黑色
    ctx.font = '18px KaiTi' 

    initHeight = 60
    lastSubStrIndex = 0
    lineWidth = 0

    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > (canvasWidth - leftWidth * 2)) {
        ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分
        initHeight += 36; //22为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == str.length - 1) { //绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
      }
    }

    ctx.stroke()

    ctx.setTextAlign('right')    // 文字居中
    ctx.setFillStyle('#888')  // 文字颜色：黑色
    ctx.setFontSize(14)       // 文字字号：22px
    lastSubStrIndex = 0
    initHeight += 50
    lineWidth = 0
    for (let i = 0; i < comment.length; i++) {
      lineWidth += ctx.measureText(comment[i]).width;
      if (lineWidth > (canvasWidth - leftWidth * 2)) {
        ctx.fillText(comment.substring(lastSubStrIndex, i), 380, initHeight); //绘制截取部分
        initHeight += 30; //22为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == comment.length - 1) { //绘制剩余部分
        ctx.fillText(comment.substring(lastSubStrIndex, i + 1), 380, initHeight);
      }
    }

    ctx.stroke()

    ctx.drawImage('/images/qrcode.jpg', 0, 0, 258, 258, 280, initHeight + 30, 100, 100)
    ctx.draw()

    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: paperThis.canvasHeight,
      canvasId: 'shareCanvas',
      quality: 1,
      success(res) {
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath]
        })
      },
      fail(err) {
        console.log(err)
      }
    }, paperThis)
  }
})