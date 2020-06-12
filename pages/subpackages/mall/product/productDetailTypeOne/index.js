// pages/subpackages/mall/product/productDetailTypeOne/index.js
import {getWindowHeightRpx} from "../../../../../utils/system";

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
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      bannerB:this.json2,
      grid:this.json3,
      explain:this.json4
    })

    let items2 = [{
      title: '免费取消',
      time: '2020/02/01'
    }, {
      title: '不可取消',
      time: '2020/02/01'
    }]
    this.changeData(items2)
  },
  changeData(tabData) {
    let headers = [{
      text: 'time',
      display: '北京时间'
    }, {
      text: 'title',
      display: '政策及费用'
    },
    ]
    let tempData = []
    for (let i = 0; i < tabData.length; i++) {
      let tempObj = {}
      for (let j = 0; j < headers.length; j++) {
        if (headers[j]['text'] === "Operation") {
          tempObj[headers[j]['text']] = '详情'
        } else if (headers[j]['text'] === "LoginTime"){
          let LoginTime = tabData[i][headers[j]['text']]
          let a = app.util.utcToBj(LoginTime, 'M/D h:m:s')
          console.log(LoginTime)
          console.log(a)
          tempObj[headers[j]['text']] = a
        }else {
          tempObj[headers[j]['text']] = tabData[i][headers[j]['text']]
        }

      }
      tempData.push(tempObj)
    }
    this.setData({
      headers: headers,
      row: tempData,
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
  json4:['1. 请携带有效身份证件入住，请在14:00后入住并于次日12:00之前退房。',
  '2. 如需提前退房及续住请与商家协商。',
  '3. 如需发票请与商家沟通。',
'4. 房型图片仅供参考。']
})