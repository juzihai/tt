// pages/subpackages/mall/product/productDetailTypeOne/index.js
import {getWindowHeightRpx} from "../../../../../utils/system";
import {HotelMaterialType} from "../../../../../models/hotelMaterialType";
import {HotelRoomType} from "../../../../../models/hotelRoomType";

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    let id = options.id
    this.setData({
      id,
      h,

    })


    this.initDataAll()
  },
  async initDataAll() {
    const roomData = await HotelRoomType.PageSearchProperty(this.data.id)
    this.setData({
      roomData,
      banner: roomData.Rotationchart,
    })

    let items2 = [{
      title: '免费取消',
      time: ''
    }, {
      title: '不可取消',
      time: ''
    }]
    items2[0].time = roomData.Room.StartValidityTime
    items2[1].time = roomData.Room.EndValidityTime
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
        } else if (headers[j]['text'] === "LoginTime") {
          let LoginTime = tabData[i][headers[j]['text']]
          let a = app.util.utcToBj(LoginTime, 'M/D h:m:s')
          console.log(LoginTime)
          console.log(a)
          tempObj[headers[j]['text']] = a
        } else {
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
  onNextTap(e) {
    let id = this.data.id
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/orderTypeOne/index?id=${id}`,
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
})
