const {wxml, style} = require('../home/index.js')
Page({
  data: {
    src: ''
  },
  onLoad() {
    this.widget = this.selectComponent('.widget')
  },
  renderToCanvas() {
    const p1 = this.widget.renderToCanvas({ wxml, style })
    p1.then((res) => {
      this.container = res
      this.extraImage()
    })
  },
  extraImage() {
    const p2 = this.widget.canvasToTempFilePath()
    p2.then(res => {
      this.setData({
        src: res.tempFilePath,
        width: this.container.layoutBox.width,
        height: this.container.layoutBox.height
      })
    })
  }
})