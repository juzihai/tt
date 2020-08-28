// pages/navigator/index/index.js
import {File} from "../../../models/file";

const app = getApp();
import {
  Product
} from "../../../models/product";
import {
  ProductClass
} from "../../../models/productClass.js";
import {
  HotProduct
} from "../../../models/hotProduct.js";
import {
  HotActivity  
} from "../../../models/hotActivity.js";
import {
  ProductRotationchart
} from "../../../models/productRotationchart.js";
import {GroupBuying} from "../../../models/groupBuying";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeESpu: null,
    bannerB: null,
    grid: [],
    activityD: null,
    themeF: null,
    bannerG: null,
    themeH: null,
    spuPaging: null,
    // loadingType: "loading",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    const scene = decodeURIComponent(options.scene)
    console.log('???', scene)
    if (scene != 'undefined') {
      const data = await File .SearchModelDetails({ChannleCode: scene})
      let ChannleCode;
      let ChannleName;
      app.openIDCallback = OpenID => {
        console.log('openid回调', OpenID)
        switch (data.type) {
          case 0://员工二维码
            ChannleCode = 'ABCDEFGH'
            ChannleName = '员工二维码'
            let JsonCode = JSON.parse(data.JsonCode)
            let SharOpenID = JsonCode.SharOpenID
            if (SharOpenID) {
              app.globalData.SharOpenID = SharOpenID
              wx.setStorageSync('SharOpenID', SharOpenID)
            }
            let obj = {
              "EnterpriseID": app.config.EnterpriseID,
              "OpenID": OpenID,
              "ChannleCode": ChannleCode,
              "ChannleName": ChannleName,
            }
            File.SaveChannleByPCQRCode(obj)
            break;
          case 1://渠道二维码
            ChannleCode = data.GUID
            ChannleName = data.JsonCode
            let obj1 = {
              "EnterpriseID": app.config.EnterpriseID,
              "OpenID": OpenID,
              "ChannleCode": ChannleCode,
              "ChannleName": ChannleName,
            }
            File.SaveChannleByPCQRCode(obj1)
            break;
          case 2://物料二维码
            let MaterielID = data.JsonCode
            let obj2 = {
              "EnterpriseID": app.config.EnterpriseID,
              "OpenID": OpenID,
              "MaterielID": MaterielID,
            }
            File.MaterielCustomersAdd(obj2)
            break;
          default:
        }

      }

    } else if (options.url) {
      let url = decodeURIComponent(options.url);

      let SharOpenID = decodeURIComponent(options.SharOpenID);
      if (SharOpenID) {
        app.globalData.SharOpenID = SharOpenID
        wx.setStorageSync('SharOpenID', SharOpenID)
      }
      wx.navigateTo({
        url: url,
      })

    }
    this.initAllData();
  },

  onShareAppMessage: function() {
    let id = this.data.id;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent('/pages/navigator/mall/index');

    return {
      title: "详情",
      path: `/pages/navigator/mall/index?url=${url}&SharOpenID=${OpenID}&SharType=mall`
    }
  },
  onPullDownRefresh() {
    this.initAllData();
  },
  onShow() {

  },

  async initAllData() {

    const themeA = this.json1;
    // const bannerB = this.json2;
    // const grid = this.json3;
    const activityD = this.json4;
    // const bannerG = this.json6;
    let index = this.randomNum(0, 3);


    //TODO:真实数据
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      "Limit": 999
    }
    const bannerB = await ProductRotationchart.Search(obj)
    const grid = await ProductClass.Search({
      "EnterpriseID": app.config.EnterpriseID,
      "Limit": 11
    });

    const themeE = await HotProduct.Search(obj);
    const bannerG = await HotActivity.Search(obj);
    let themeESpu = themeE.Data
    const nav = await ProductClass.ProductClassModuleRelationSearch(obj)
    let activekey=0
    if (nav.Data.length > 0) {
      activekey = nav.Data[0].ProductClassID
      this.tabSelectGetData(activekey)
    }

    this.setData({
      themeA: themeA[index],
      bannerB,
      activityD,

      // themeF,
      bannerG,
      // themeH

      grid,
      themeE,
      themeESpu,
      nav,
      activekey
    })
    wx.stopPullDownRefresh();
    const groupBuying =await GroupBuying.QueryEGroupForWx({"EnterpriseId": app.config.EnterpriseID})
    this.setData({
      groupBuying
    })
  },
  /**切换点击 */
  tabSelect(e) {
    console.log()
    let ClassID = e.detail.activeKey
    this.tabSelectGetData(ClassID)
  },
  async tabSelectGetData(ClassID) {
    wx.showToast({
      title: '加载中～',
      mask: true,
      icon:"none"
    })
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      ClassID
    }
    const paging = Product.PageSearch(obj);
    this.data.spuPaging = paging //类属性
    const data = await paging.getMoreData(); //todo
    setTimeout(function() {
      wx.hideToast()
    }, 500)
    if (!data) {
      this.setData({
        loadingType: 'end'
      })
      return;
    }
    // data 数组, refresh 清空元素, success 返回成功
    wx.lin.renderWaterFlow(data.items, true);

  },

  /**banner点击 */
  onBanner(e) {
    let cell = e.currentTarget.dataset.cell;
    const pid = cell.ProductID
    const pcode = cell.ProductCode
    if (pid == 0) {
      let id = e.currentTarget.dataset.id;

      wx.navigateTo({
        url: `/pages/subpackages/mall/activity/activityDetail/index?id=${id}&pagePath=ProductRotationchart`,
      })
      return
    }
    if (!cell.IsJump){
      
      return
    }

    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pid}`
    })


  },
  /**功能块 */
  onNaviCard(e) {

    const classid = e.currentTarget.dataset.classid;
    if (classid) {
      wx.navigateTo({
        url: `/pages/subpackages/mall/product/productList/index?classid=${classid}`,
      })
    }


  },
  onNaviCard1() {
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/classiFication/index`
    })
  },
  onGotoSearch() {
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/search/index`
    })
  },
  onActicity() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/cards/coupon/index',
    })
  },
   onActicity1() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/groupBuying/productList/index',
    })
  },
  onMore() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/hotProductList/index',
    })
  },
  onSpuItem(e) {
    let item = e.detail
    let pid = item.ID
    let pcode = item.ProductCode

    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}&pagePath=HotProduct`
    })

  },
  onCart(e){
    console.log(e)
    wx.switchTab({
      url: '/pages/navigator/cart/index',
    })
  },
  /**
   *
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {

    const data = await this.data.spuPaging.getMoreData();
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

  //生成从minNum到maxNum的随机数
  randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  json1: [{
      "id": 1,
      "title": "清凉一夏，折扣季",
      "description": "秋天是金色的。麦穗是金色的，秋阳是金色的。虽然冬快至，但宜人的温度总是让我们心情愉快#我们为您精选了一系列秋冬折扣商品，慢慢挑选吧~",
      "name": "t-1",
      "entrance_img": "http://i2.sleeve.7yue.pro/m2.png",
      "extend": null,
      "internal_top_img": "http://i2.sleeve.7yue.pro/m33.png",
      "title_img": "",
      "tpl_name": "janna",
      "online": true
    },
    {
      "id": 4,
      "title": "每周上新",
      "description": "风袖`每周上新`活动#每周都有一款折扣商品，每周都有适合你的唯一专属#有Ins复古风装饰；金属CD唱片夹；每周来逛逛，找到你所喜爱的东西",
      "name": "t-2",
      "entrance_img": null,
      "extend": null,
      "internal_top_img": "http://i2.sleeve.7yue.pro/m1.png",
      "title_img": "http://i2.sleeve.7yue.pro/m3.png",
      "tpl_name": null,
      "online": true
    },
    {
      "id": 5,
      "title": "风袖甄选",
      "description": "甄选",
      "name": "t-3",
      "entrance_img": "http://i2.sleeve.7yue.pro/m9.png",
      "extend": null,
      "internal_top_img": "http://i2.sleeve.7yue.pro/m11.png",
      "title_img": "",
      "tpl_name": "diana",
      "online": true
    },
    {
      "id": 6,
      "title": "时尚穿搭",
      "description": "帅点才有女朋友",
      "name": "t-4",
      "entrance_img": "http://i2.sleeve.7yue.pro/m10.png",
      "extend": null,
      "internal_top_img": "http://i2.sleeve.7yue.pro/m12.png",
      "title_img": "",
      "tpl_name": "irelia",
      "online": true
    }
  ],
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

  json4: {
    "id": 2,
    "title": "夏日好礼送不停",
    "entrance_img": "http://i2.sleeve.7yue.pro/m14.png",
    "online": true,
    "remark": "限服装、鞋、文具等商品",
    "start_time": null,
    "end_time": null
  },


})