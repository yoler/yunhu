Component({
  properties: {
    
  },
  data: {
    active: 0
  },
  ready() {
    this.setData({active: this.properties.type})
  },
  methods: {
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
    switchGirl() {
      wx.switchTab({url: '/pages/girl/index'})
    },
    close() {
      this.triggerEvent("onClose")
    },
    paly() {
      // 在页面中定义激励视频广告
      let videoAd = null
      this.triggerEvent("onClose")
      // 在页面onLoad回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-a0cdc1a53c25641f'
        })
        videoAd.onLoad(() => {})
        videoAd.onError((err) => {})
        videoAd.onClose((res) => {
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            this.triggerEvent("palyEnd")
            wx.showToast({
              title: '已获取5条内容',
            })
          } else {
            // 播放中途退出，不下发游戏奖励
            wx.showToast({
              title: '获取内容失败',
            })
          }
        })
      }

      // 用户触发广告后，显示激励视频广告
      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd.load()
            .then(() => videoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败')
            })
        })
      }
    }
  }
  
})