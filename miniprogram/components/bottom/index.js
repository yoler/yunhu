Component({
  properties: {
    type: String,
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
    }
  }
  
})