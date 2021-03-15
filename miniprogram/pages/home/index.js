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
      duration: 500,
      canvasHeight: 800
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
                  list: [...this.data.list, {url: res.data.imgurl, data: result.data}]
                })
              })
            }
          })
        } else {
          jinrishici.load(result => {
            this.setData({
              list: [...this.data.list, {url: res.data[0].urls.small, data: result.data}]
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
  copy(event) {
    let content = event.target.dataset.data.content
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
    let str = event.target.dataset.data.content
    str = str.replace(/\n/g, ' ')
    let comment = event.target.dataset.data.origin.author + ' - ' + '《' + event.target.dataset.data.origin.title + '》'
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