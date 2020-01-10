// pages/navigator/introduce/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List :["企业宣传", "案例展示", "精英人才"] ,//标题栏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.Tabcub)
    if (options.Tabcub == 0) {
      this.setData({
        hiddenName1: false,
        hiddenName2: true,
        hiddenName3: true,
      })
    }
    if (options.Tabcub == 1) {
      this.setData({
        hiddenName1: true,
        hiddenName2: false,
        hiddenName3: true,
      })
    }
    if (options.Tabcub == 2) {
      this.setData({
        hiddenName1: true,
        hiddenName2: true,
        hiddenName3: false,
      })
    }
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

  }
})