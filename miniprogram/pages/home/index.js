// miniprogram/pages/home/index.js
const jinrishici = require('../../utils/jinrishici.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [],
      imageList: [],
      indicatorDots: false,
      vertical: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      canvasHeight: 800,
      viewCount: 5,
      showAd: false,
      tips: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget')
    this.getData(0)
    setTimeout(() => {
      this.getData(1)
    }, 3000)


    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('sentence')
    // .aggregate()
    // .sample({
    //   size: 2
    // })
    // .end().then(res => {  
    //   console.log(res)
    // })
    
    
    // .where({
    //   _openid: this.data.openid
    // }).get({
    //   success: res => {
        
    //   },
    //   fail: err => {
       
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // <view class="ad" wx:if="{{index % 3 == 0 && index !== 0}}">
    //   <ad unit-id="adunit-6302bcc311fe8b40"></ad>
    // </view>
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

  getData (index) {
    if (index < this.data.imageList.length - 1) {
      jinrishici.load(result => {
        if (result.data.content.length > 12) {
          result.data.content = result.data.content.replace('，', '，\n')
        }
        this.setData({
          list: [...this.data.list, {url: this.data.imageList[index].urls.small, data: result.data}]
        })
        wx.hideLoading()
      })
    } else {
      this.getPhoto().then(res => {
        jinrishici.load(result => {
          if (result.data.content.length > 12) {
            result.data.content = result.data.content.replace('，', '，\n')
          }
          this.setData({
            list: [...this.data.list, {url: this.data.imageList[index].urls.small, data: result.data}]
          })
          wx.hideLoading()
        })
      })
    }
    
  },

  getPhoto () {
    let url = 'https://api.unsplash.com/photos/random?count=10&client_id=I34B29cGyFcghMtmEYd__KFl7yKi99KS-IAPS06Ub4c&w=300&h=600'
    url = 'https://api.unsplash.com/photos/random?count=30&query=scenery&client_id=I34B29cGyFcghMtmEYd__KFl7yKi99KS-IAPS06Ub4c&orientation=portrait'
    return new Promise((resolve, reject) => {
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
                this.setData({
                  imageList: [...this.data.imageList, {urls: {small: res.data.imgurl}}]
                })
                resolve()
              }
            })
          } else {
            this.setData({
              imageList: [...this.data.imageList, ...res.data]
            })
            resolve()
          }
        },
        fail: () => {
          wx.request({
            url: 'https://api.ixiaowai.cn/gqapi/gqapi.php?return=json', //仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              this.setData({
                imageList: [...this.data.imageList, {urls: {small: res.data.imgurl}}]
              })
              resolve()
            }
          })
        }
      })
    })
    
  },

  bindanimationfinish(event) {
    this.setData({
      tips: false
    })
    if (event.detail.current === this.data.list.length - 1) {
      if (this.data.list.length <= this.data.viewCount) {
        this.getData(event.detail.current)
      } else {
        this.setData({
          showAd: true
        })
      }
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