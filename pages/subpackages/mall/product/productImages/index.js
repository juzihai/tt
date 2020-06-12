// pages/subpackages/mall/product/productImages/index.js
const app = getApp()
import {Product} from "../../../../../models/product";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAllData()
  },
  initAllData: async function () {
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      "ClassID": 8,
    }
    const productModel = Product.PageSearch(obj);
    this.data.productModel = productModel //类属性
    const product = await productModel.getMoreData();//todo
    setTimeout(function () {
      wx.hideToast()
    }, 100)
    wx.stopPullDownRefresh();
    this.setData({
      product
    })
    if (!product) {
      return;
    }
    // data 数组, refresh 清空元素, success 返回成功
    wx.lin.renderWaterFlow(product.items, true);
  },
  onImg(e){
    console.log('111',e)
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