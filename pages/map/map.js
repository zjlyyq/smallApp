// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    // mapContext
    mapCtx: null,
    markers: [{
      latitude: 0,
      longitude: 0,
      alpha: 1,
      iconPath: '../images/markerIcon.png'
    }],
  },
  position: {
    direction:0,
    x: 0,
    y: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.draw()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /**
     * 使用 wx.createMapContext 获取 map 上下文
     */
    this.mapCtx = wx.createMapContext('mapCtx')
  },
  canvasClick:function(){
    console.log('this.position.x = ', this.position.x)
    setInterval(this.draw,10)
  },
  /**
   * 绘画
   */
  draw: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    if (this.position.x > 350)
      this.position.direction = 1
    if (this.position.x < -350)
      this.position.direction = 0
    if(this.position.direction == 0)
      this.position.x++
    else
      this.position.x--
    context.rect(this.position.x, this.position.y, 300, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  },
  getLocation: function () {

    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log("longitude1 = " + longitude);
        console.log("latitude = " + latitude);
        that.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
      },
      complete: function () {
        console.log('调用结束')
      }
    })
    console.log('当前地dian经度：' + that.longitude);
    console.log('当前地dian纬度：' + that.latitude);
    console.log("longitude2 = " + longitude);
  },
  // 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation	
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log('当前地图中心经度：' + res.longitude);
        console.log('当前地图中心纬度：' + res.latitude);
      }
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

  }
})