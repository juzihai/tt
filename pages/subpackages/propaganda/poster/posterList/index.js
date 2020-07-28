// pages/subpackages/mall/product/classiFication/index.js
import { getSystemSize } from "../../../../../utils/system.js";
import { px2rpx } from "../../../../../miniprogram_npm/lin-ui/utils/util";
const app = getApp()
import {Poster} from "../../../../../models/poster";

Page({
  data: {

  },
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

    const grid = await Poster.PosterTypePageSearchWX(obj)
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
      "EnterpriseID":app.config.EnterpriseID,
      "PosterTypeID":ClassID
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const productModel = Poster.PosterPageSearchWX(obj)
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
  onSpuItem(e) {
    console.log(e)
    let spu=e.currentTarget.dataset.cell;

    wx.navigateTo({
      url: `/pages/subpackages/propaganda/poster/posterDetail/index?image=${spu.baseUrl+spu.Image}`
    })
  },

})