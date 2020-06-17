// pages/navigator/indexTypeOne/index.js
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
    this.setData({
      bannerB:this.json2,
      grid:this.json3,
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
    {
      "id": 1,
      "title": "公司资质",
      "img": "/imgs/home/guanli.png",
      "name": null,
      "category_id": null,
      "root_category_id": 2
    },
    {
      "id": 2,
      "title": "公司招聘",
      "img": "/imgs/home/fenxiang.png",
      "name": null,
      "category_id": null,
      "root_category_id": 3
    },
    {
      "id": 3,
      "title": "员工列表",
      "img": "/imgs/home/kefu.png",
      "name": null,
      "category_id": null,
      "root_category_id": 1
    },
    {
      "id": 4,
      "title": "产品查看",
      "img": "/imgs/home/chanpinfabu.png",
      "name": null,
      "category_id": null,
      "root_category_id": 5
    },
    {
      "id": 5,
      "title": "案例展示",
      "img": "/imgs/home/diannao.png",
      "name": null,
      "category_id": null,
      "root_category_id": 4
    },
    {
      "id": 6,
      "title": "金融产品",
      "img": "/imgs/home/shujufenxi.png",
      "name": null,
      "category_id": null,
      "root_category_id": 24
    }
  ],
})