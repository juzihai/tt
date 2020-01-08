// pages/navigator/mall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    bannerB: null,
    grid: [],
    arr: [
      '震惊。马化腾和马云在深夜～',
      '如果不是为了飞翔，。我要这翅膀有何用'

      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const bannerB = this.json2;
    const grid = this.json3;
    this.setData({
      bannerB,
      grid
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onCardItem(e){
    let url ='https://www.baidu.com'
    console.log(url)
    wx.navigateTo({
      url: '/pages/subpackages/mall/activity/web-view/index?url='+url,
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