// pages/navigator/mall/index.js
const app = getApp();
import { ArticleType } from "../../../models/articleType.js";
import { Article } from "../../../models/article.js";
import { CompanyRotationchart } from "../../../models/companyRotationchart.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    TabCur: 0,
    scrollLeft: 0,
    bannerB: null,
    grid: [],
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // 分享后的页面打开先进入首页再跳转到分享的页面,首页的js要做如下设置
    if (options.url) {
      let url = decodeURIComponent(options.url);
      let SharOpenID = decodeURIComponent(options.SharOpenID);
      if (SharOpenID){
        app.globalData.SharOpenID = SharOpenID
        wx.setStorageSync('SharOpenID', SharOpenID)
      }
      wx.navigateTo({
        url
      })
    }


    this.initAllData();
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },

  async initAllData(){
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
    }
    const notice = await Article.GetTopArticle(obj)
    const nav = await ArticleType.Search(obj)
    if (nav.Data){
      this.tabSelectGetData(nav.Data[0].ID)
    }
  
    const bannerB = await CompanyRotationchart.Search(obj)
    const grid = this.json3;
    const noticeArr=[];
    if (notice.Data){
      for (let key of notice.Data){
        noticeArr.push(key.Title)
      }
    }

    this.setData({
      bannerB,
      grid,
      nav,
      notice,
      noticeArr,
      loading:false
    })
    
  },
/** */
  onOpenLocation(){
    wx.openLocation({
      latitude: 39.12,
      longitude: 117.20 ,
      scale: '16',
      name: '名称',
      address: "天津市和平区",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**banner点击 */
  onBanner(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/subpackages/mall/activity/activityDetail/index?id=${id}&pagePath=CompanyRotationchart`,
    })
  },
  /**通知栏点击 */
  onNoticeBar(e){
    let index = e.detail.index
    let data = this.data.notice.Data;
    let id = data[index].ID;
    
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
  },
  /**功能块点击 */
  onNaviCard(e){
    // wx.navigateTo({
    //   url: `/pages/subpackages/mall/company/staffList/index`,
    // })
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/classiFication/index`,
    })

  },
  /**切换点击 */
  tabSelect(e) {
    let id=e.currentTarget.dataset.id;
    console.log(id)
    this.tabSelectGetData(id)
    this.setData({
      TabCur: e.currentTarget.dataset.index,
    })
  },

  async tabSelectGetData(ArticleType){
    let obj={
      "EnterpriseID": app.config.EnterpriseID,
      ArticleType
    }
    const articleModel = Article.PageSearch(obj)
    this.data.articleModel = articleModel //类属性
    const article = await articleModel.getMoreData();//todo
    this.setData({
      article: article
    })
  },

  onCardItem(e){
    let id =e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
  },

  json2: {
    "id": 1,
    "name": "b-1",
    "description": "首页顶部主banner",
    "img": null,
    "title": null,
    "items": [{
        "id": 12,
        "img": "http://i2.sleeve.7yue.pro/m1.png",
        "keyword": "t-2",
        "type": 3,
        "name": null,
        "banner_id": 1
      },
      {
        "id": 13,
        "img": "http://i1.sleeve.7yue.pro/assets/702f2ce9-5729-4aa4-aeb3-921513327747.png",
        "keyword": "23",
        "type": 1,
        "name": null,
        "banner_id": 1
      },
      {
        "id": 14,
        "img": "http://i1.sleeve.7yue.pro/assets/b8e510a1-8340-43c2-a4b0-0e56a40256f9.png",
        "keyword": "24",
        "type": 1,
        "name": null,
        "banner_id": 1
      }
    ]
  },
  json3: [{
      "id": 1,
      "title": "公司资质",
      "img": "http://i1.sleeve.7yue.pro/grid/clothing.png",
      "name": null,
      "category_id": null,
      "root_category_id": 2
    },
    {
      "id": 2,
      "title": "公司招聘",
      "img": "http://i1.sleeve.7yue.pro/grid/bag.png",
      "name": null,
      "category_id": null,
      "root_category_id": 3
    },
    {
      "id": 3,
      "title": "员工列表",
      "img": "http://i1.sleeve.7yue.pro/grid/shoes.png",
      "name": null,
      "category_id": null,
      "root_category_id": 1
    },
    {
      "id": 4,
      "title": "产品查看",
      "img": "http://i1.sleeve.7yue.pro/grid/jewelry.png",
      "name": null,
      "category_id": null,
      "root_category_id": 5
    },
    {
      "id": 5,
      "title": "案例展示",
      "img": "http://i1.sleeve.7yue.pro/grid/furniture.png",
      "name": null,
      "category_id": null,
      "root_category_id": 4
    },
    {
      "id": 6,
      "title": "更多",
      "img": "http://i1.sleeve.7yue.pro/grid/book.png",
      "name": null,
      "category_id": null,
      "root_category_id": 24
    }
  ],

})