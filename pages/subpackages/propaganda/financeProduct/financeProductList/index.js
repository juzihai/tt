const app = getApp();

import { FinanceProduct } from "../../../../../models/financeProduct.js";
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



  },
  onShow: async function(){
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
    }
    const articleModel = FinanceProduct.PageSearch(obj)
    this.data.articleModel = articleModel //类属性
    const article = await articleModel.getMoreData();//todo
    this.setData({
      article: article
    })
  },
  onCardItem(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/financeProduct/financeProductDetail/index?id=${id}`,
    })
  },
  /**
  *
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: async function () {

    const data = await this.data.articleModel.getMoreData();
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
      article: data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }

  },


})