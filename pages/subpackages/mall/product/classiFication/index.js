// pages/subpackages/mall/product/classiFication/index.js
import { getSystemSize } from "../../../../../utils/system.js";
import { px2rpx } from "../../../../../components/lin-ui/utils/util";
const app = getApp()
import { Product } from '../../../../../models/product.js'
import { ProductClass } from '../../../../../models/productClass.js'
import {
  ShoppingCart
} from "../../../../../models/shoppingCart.js";

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
    this.setDynamicSegmentHeight()
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
  /** */
  async setDynamicSegmentHeight() {
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      segHeight: h
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
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const productModel = Product.PageSearch(obj)
    this.data.productModel = productModel //类属性
    const product = await productModel.getMoreData(); //todo
    setTimeout(function () {
      wx.lin.hideToast()
    }, 500)
    this.setData({
      product
    })
  },
  async scrolltolower() {
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
    this.setData({
      product: data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }
  },
  onSpuItem(event) {
    const pid = event.currentTarget.dataset.pid
    const pcode = event.currentTarget.dataset.pcode

    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}`
    })
  },
  async onCartAdd(e){
    console.log(e)
    let spu=e.currentTarget.dataset.cell;
    if (spu.SalesStock == 0) {
      wx.showModal({
        title: '提示',
        content: '暂无库存，请联系店铺管理员',
      })
      return
    }
    let obj = {
      OpenId: wx.getStorageSync('OpenID'),
      EnterpriseId: app.config.EnterpriseID,
      ProductID: spu.ID,
      ProductNum: 1,
      ProductType: this.data.pagePath == "HotProduct" ? 2 : 1
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const cart = await ShoppingCart.Add(obj)
    if (cart.Success) {
      console.log("加入购物车")

      wx.lin.showToast({
        title: '添加成功~',
        icon: 'success'
      })
    } else {
      wx.lin.showToast({
        title: '添加失败~',
        icon: 'success'
      })
      console.log('添加err')
    }

    setTimeout(function () {
      wx.lin.hideToast()
    }, 500)
  },
  onGotoSearch() {
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/search/index`
    })
  },
})