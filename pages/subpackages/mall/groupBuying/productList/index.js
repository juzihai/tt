// pages/subpackages/mall/groupBuying/productList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async onTap(e) {
    wx.navigateTo({
      url: '../productDetail/index',
    })
  }

})