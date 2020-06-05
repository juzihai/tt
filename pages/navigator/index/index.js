// pages/navigator/mall/index.js
const app = getApp();
import { ArticleModule } from "../../../models/articleModule.js";
import { ArticleType } from "../../../models/articleType.js";
import { Article } from "../../../models/article.js";
import { CompanyRotationchart } from "../../../models/companyRotationchart.js";
import { AppModel} from '../../../models/app.js';
import { Company } from "../../../models/company.js";
import { File } from "../../../models/file.js";
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
  onLoad: async function(options) {
    const scene = decodeURIComponent(options.scene)
    console.log('???',scene)
    if ( scene != 'undefined'){
      const data = await File.SearchModelDetails({ ChannleCode:scene})
      let ChannleCode;
      let ChannleName;
      app.openIDCallback = OpenID=>{
        console.log('openid回调',OpenID)
        switch (data.type) {
          case 0:
            ChannleCode = 'ABCDEFGH'
            ChannleName = '员工二维码'
            let JsonCode = JSON.parse(data.JsonCode)
            let SharOpenID = JsonCode.SharOpenID
            if (SharOpenID) {
              app.globalData.SharOpenID = SharOpenID
              wx.setStorageSync('SharOpenID', SharOpenID)
            }
            break;
          case 1:
            ChannleCode = data.GUID
            ChannleName = data.JsonCode
            break;

          default:
        }
        let obj = {
          "EnterpriseID": app.config.EnterpriseID,
          "OpenID": OpenID,
          "ChannleCode": ChannleCode,
          "ChannleName": ChannleName,
        }
        const save =  File.SaveChannleByPCQRCode(obj)
      }

    }else if (options.url) {
      let url = decodeURIComponent(options.url);
      
      let SharOpenID = decodeURIComponent(options.SharOpenID);
      if (SharOpenID){
        app.globalData.SharOpenID = SharOpenID
        wx.setStorageSync('SharOpenID', SharOpenID)
      }
      wx.navigateTo({
        url: url,
      })

    }
    app.shopInfoReadyCallback = res => {
      console.log('刷新店铺信息回调', res)
      this.setData({
        shopInfo: res
      })
      wx.setNavigationBarTitle({
        title: res.CompanyName
      })
    }

  },
  onShareAppMessage: function () {
    let id = this.data.id;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent('/pages/navigator/index/index');

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}&SharType=index`
    }
  },

  onShow(){
    this.initAllData();
  },
  onPullDownRefresh() {
    this.initAllData();
  },
  async initAllData(){
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
    }
    const notice = await Article.GetTopArticle(obj)
    const nav = await ArticleType.Search(obj)
    const bannerB = await CompanyRotationchart.Search(obj)
    const basicsGrid = this.json3;
    const grid = await ArticleModule.Search(obj)
    const noticeArr=[];
    if (notice){
      if (notice.Data){
        for (let key of notice.Data) {
          noticeArr.push(key.Title) 
        }
      }

    }
    this.setData({
      bannerB,
      basicsGrid,
      grid,
      nav,
      notice,
      noticeArr,
      loading:false,
      shopInfo: wx.getStorageSync('shopInfo')
    })
    wx.stopPullDownRefresh();
    this.tabSelectGetData()
  },
/** */
  async onOpenLocation(){
    wx.showToast({
      title: '加载中～',
      mask: true,
      icon: "none"
    })

    const company =await Company.SearchModelDetails(app.config.EnterpriseID)
    wx.setStorageSync('shopInfo', company)
    let shopInfo = this.data.shopInfo
    setTimeout(function () {
      wx.hideToast()
    }, 100)
    // 用户授权
    AppModel.getSetting().then(res => {
      // 用户定位
      return AppModel.getUserLocation()
    }).then(res => {
      wx.openLocation({
        latitude: company.Latitude,
        longitude: company.Longitude,
        scale: '16',
        name: company.CompanyName,
        address: company.Address,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
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
    let notice = this.data.notice;
    let id = notice.Data[index].ID;
    
    wx.navigateTo({
      url: `/pages/subpackages/propaganda/article/articleDetail/index?id=${id}`,
    })
  },
  /**功能块点击 */
  async onNaviCard(e){
    // 用户授权
    await AppModel.getSetting()
    let phone = wx.getStorageSync('phoneNumber')
    if(!phone){
      wx.showModal({
        title: '提示',
        content: '您还未登录是否现在登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/navigator/mine/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }

    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    switch(name){
      case '公司资质':
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/article/articleList/index?ArticleType=7`,
        })
        break;
      case '公司招聘':
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/article/articleList/index?ArticleType=8`,
        })
        break;
      case '案例展示':
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/article/articleList/index?ArticleType=6`,
        })
        break;
      case '员工列表':
        wx.navigateTo({
          url: `/pages/subpackages/mall/company/staffList/index`,
        })
        break;
      case '产品查看':
        wx.navigateTo({
          url: `/pages/subpackages/mall/product/classiFication/index`,
        })
        break;
      case '金融产品':
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/financeProduct/financeProductList/index`,
        })
        break;
      case '文章':
        wx.navigateTo({
          url: `/pages/subpackages/propaganda/article/articleList/index?ArticleType=${id}`,
        })
        break;

      default:
        wx.showToast({
          title: '即将开放尽情期待',
          icon:'none'
        })
          // wx.navigateTo({
          //   url: `/pages/subpackages/mall/product/classiFication/index`,
          // })
    }

  },
  /**切换点击 */
  tabSelect(e) {

    this.setData({
      TabCur: e.currentTarget.dataset.index,
    })
    this.tabSelectGetData()
  },

  async tabSelectGetData(){
    let data=this.data.nav.Data
    let index =this.data.TabCur;
    if(data.length>0){
      let obj = {
        "EnterpriseID": app.config.EnterpriseID,
        ArticleType: data[index].ID,
      }
      const articleModel = Article.PageSearch(obj)
      this.data.articleModel = articleModel //类属性
      const article = await articleModel.getMoreData();//todo
      this.setData({
        article: article
      })
    }

  },
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
  async onCardItem(e){
    // 用户授权
    await AppModel.getSetting()
    let phone = wx.getStorageSync('phoneNumber')
    if (!phone) {
      wx.showModal({
        title: '提示',
        content: '您还未登录是否现在登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/navigator/mine/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
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
  json3: [
    // {
    //   "id": 1,
    //   "title": "公司资质",
    // "img": "/imgs/home/guanli.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 2
    // },
    // {
    //   "id": 2,
    //   "title": "公司招聘",
    //   "img": "/imgs/home/fenxiang.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 3
    // },
    // {
    //   "id": 3,
    //   "title": "员工列表",
    //   "img": "/imgs/home/kefu.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 1
    // },
    // {
    //   "id": 4,
    //   "title": "产品查看",
    //   "img": "/imgs/home/chanpinfabu.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 5
    // },
    // {
    //   "id": 5,
    //   "title": "案例展示",
    //   "img": "/imgs/home/diannao.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 4
    // },
    // {
    //   "id": 6,
    //   "title": "金融产品",
    //   "img": "/imgs/home/shujufenxi.png",
    //   "name": null,
    //   "category_id": null,
    //   "root_category_id": 24
    // }
  ],

})