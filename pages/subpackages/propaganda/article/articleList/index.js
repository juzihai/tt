const app = getApp();

import { Article } from "../../../../../models/article.js";
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
    this.data.ArticleType = options.ArticleType


  },
  onShow: async function () {
    let ArticleType = this.data.ArticleType
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      ArticleType
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const articleModel = Article.PageSearch(obj)
    this.data.articleModel = articleModel //类属性
    const article = await articleModel.getMoreData();//todo
    setTimeout(function () {
      wx.lin.hideToast()
    }, 500)
    this.setData({
      article: article
    })
  },
  onCardItem(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
  },
  // onShareAppMessage: function () {
  //   let id = this.data.id;
  //   let OpenID = wx.getStorageSync('OpenID')
  //   let url = encodeURIComponent('/pages/subpackages/propaganda/article/articleList/index');

  //   return {
  //     title: "详情",
  //     path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}&SharType=mall`
  //   }
  // },

  /**
  *
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: async function () {

    const data = await this.data.articleModel.getMoreData();
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
      article: data
    })
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },


})