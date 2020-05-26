const app = getApp()
import { Product } from '../../../../../models/product.js'

let _that

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let classid=options.classid
    this.data.classid=classid;
    this.initAllData();
  },
  onPullDownRefresh() {
    this.initAllData();
  },
  onCart(e) {
    console.log(e)
    wx.switchTab({
      url: '/pages/navigator/cart/index',
    })
  },
  async initAllData() {
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      "ClassID": this.data.classid,
    }
    wx.showToast({
      title: '加载中～',
      mask: true,
      icon: "none"
    })
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
  /**
  *
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: async function () {

    const data = await this.data.productModel.getMoreData();
    console.log(data)
    if (!data) {
      this.setData({
        loadingType: 'end'
      })
      return
    } else {
      this.setData({
        loadingType: 'loading'
      })
    }

    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },

})