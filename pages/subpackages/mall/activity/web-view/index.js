// pages/subpackages/mall/activity/web-view/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = options.url;
    console.log(url)
    this.setData({
      url: url
    })
  },

 
})