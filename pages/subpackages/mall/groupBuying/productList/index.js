// pages/subpackages/mall/groupBuying/productList/index.js
const app = getApp();
import {GroupBuying} from "../../../../../models/groupBuying";

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.data.ActivityId=options.ActivityId;
    this.initAllData()
  },
  onPullDownRefresh() {
    this.initAllData();
  },
  async initAllData() {
    let obj = {
      ActivityId:this.data.ActivityId
    }
    const groupBuyModel =await GroupBuying.QueryEGroupForWx({EnterpriseId: app.config.EnterpriseID})
    const productModel = GroupBuying.QueryEGroupProductListForWx(obj)
    this.data.productModel = productModel //类属性
    const product = await productModel.getMoreData();//todo

    this.setData({
      product,
      groupBuyModel
    })
  },
  onReachBottom: async function () {
    const data = await this.data.productModel.getMoreData();

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
      product:data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }

  },

  async onRight(e) {
    let spu=e.detail
    let ActivityId=this.data.ActivityId
    wx.navigateTo({
      url: `../productDetail/index?pid=${spu.ID}&pcode=${spu.ProductCode}&ActivityId=${ActivityId}`,
    })
  }

})