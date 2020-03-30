// pages/subpackages/mall/product/classiFication/index.js
const app = getApp()
import {
  Product
} from '../../../../../models/product.js'
import {
  ProductClass
} from '../../../../../models/productClass.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.initAllData()
  },
  //加载所有数据
  async initAllData() {
    //TODO:真实数据
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      "Limit": 99
    }

    const grid = await ProductClass.Search(obj);
    if (grid.Data.length > 0) {
      this.tabSelectGetData(grid.Data[0].ID)
    }

    this.setData({
      grid
    })
  },

  /**点击切换 */
  changeTabs(e) {
    let ClassID = e.detail.activeKey
    this.tabSelectGetData(ClassID)

  },
  /**点击切换加载的数据 */
  async tabSelectGetData(ClassID) {
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      ClassID
    }
    const productModel = Product.PageSearch(obj)
    this.data.productModel = productModel //类属性
    const product = await productModel.getMoreData(); //todo
    this.setData({
      product
    })
  },
  onSpuItem(event) {
    const pid = event.currentTarget.dataset.pid
    const pcode = event.currentTarget.dataset.pcode

    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}`
    })
  },

})