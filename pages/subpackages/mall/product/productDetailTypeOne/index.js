// pages/subpackages/mall/product/productDetailTypeOne/index.js
import {getSystemSize, getWindowHeightRpx, getWindowWidthtRpx} from "../../../../../utils/system";
import {HotelMaterialType} from "../../../../../models/hotelMaterialType";
import {HotelRoomType} from "../../../../../models/hotelRoomType";
import {px2rpx} from "../../../../../miniprogram_npm/lin-ui/utils/util";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const windowWidth = await getWindowWidthtRpx()
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    const tdWidth =(windowWidth-10)/2

    let obj=JSON.parse(options.obj)

    this.setData({
      tdWidth,
      obj,
      spu:obj.spu,
      selectDay:obj.selectDay,
      IsSale:obj.IsSale,
      id:obj.ID,
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
    items2[0].time = roomData.Room.FreeCancelTime +"  前"
    items2[1].time = roomData.Room.NoCancelTime+"  后"
    this.changeData(items2)

  },
  changeData(tabData) {
    let that=this
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
        } else if (headers[j]['text'] === "time") {
          let StartValidityTime= app.util.tsFormatTime(that.data.obj.StartValidityTime,'M-D')
          let Time = tabData[i][headers[j]['text']]
          let a =StartValidityTime+" "+Time.slice(0,2)+":"+Time.slice(2)
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
    let obj = this.data.obj
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/orderTypeOne/index?obj=${JSON.stringify(obj)}`,
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
