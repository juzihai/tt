// pages/subpackages/mall/product/search/index.js
const app = getApp();
import { HistoryKeyword } from "../../../../../models/history-keyword.js";
import { Product } from "../../../../../models/product.js";
const history = new HistoryKeyword()

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
    const historyTags = history.get()
    this.setData({
      historyTags,
    })
  },
  async onSearch(event) {
    this.setData({
      search: true,
      items: []
    })
    const keyword = event.detail.value || event.detail.name
    if (!keyword) {
      wx.lin.showToast({
        title: '请输入关键字',
      })
      return
    }
    history.save(keyword)
    this.setData({
      historyTags: history.get()
    })
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      ProductName: keyword
    }

    const productModel = Product.PageSearch(obj)
    wx.lin.showLoading({
      color: '#157658',
      type: 'flash',
      fullScreen: true
    })

    wx.lin.hideLoading()
    this.data.productModel = productModel //类属性
    const data = await productModel.getMoreData()
    this.bindItems(data)
  },
  onCancel(event) {
    this.setData({
      search: false,
      statusShow: false
    })
  },
  bindItems(data) {
    if (data.items.length !== 0) {
      // this.setData({
      //   items: data.accumulator
      // })
      wx.lin.renderWaterFlow(data.items, true);
    } else {
      this.setData({
        statusShow: true
      })
    }
  },
  onDeleteHistory(event) {
    history.clear()
    this.setData({
      historyTags: []
    })
  },


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