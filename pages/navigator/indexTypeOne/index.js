// pages/navigator/indexTypeOne/index.js
import {
  HotelRoomType
} from "../../../models/hotelRoomType";

const app = getApp();
import {
  HotelRotationchart
} from "../../../models/hotelRotationchart";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopGrid: [{
        "id": 1,
        "title": "地图导航",
        "img": "address",
        "name": null,
        "category_id": null,
        "root_category_id": 2
      },
      {
        "id": 2,
        "title": "电话",
        "img": "phone",
        "name": null,
        "category_id": null,
        "root_category_id": 3
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const shopInfo = wx.getStorageSync('shopInfo')
    this.setData({
      shopInfo
    })
    this.initDataAll()
    this.initBottomList()
  },
  async initDataAll() {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
    }
    const banner = await HotelRotationchart.PageSearch(obj)
    this.setData({
      banner,
      grid: this.json3,
    })

  },
  async initBottomList() {
    let obj = {
      "EnterpriseID": "3373",
      "StartValidityTime": 20200801,
      "EndValidityTime": 20200805,
      "Total": 4,
      "Page": 1,
      "Limit": 10
    }
    const hotelRoomModel = HotelRoomType.PageSearch(obj)
    this.data.hotelRoomModel = hotelRoomModel
    const hotelRoom = await hotelRoomModel.getMoreData();
    console.log('2222',hotelRoom)
    if (!hotelRoom) {
      return
    }
    this.setData({
      hotelRoom
    })

  },

  onShopItem(e) {
    let shopInfo =this.data.shopInfo
    let index = e.detail.index
    if (index == 0) {
      wx.openLocation({
        latitude: shopInfo.Latitude,
        longitude: shopInfo.Longitude,
        name:shopInfo.CompanyName,
        address:shopInfo.Address,
        scale: 18
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: shopInfo.Phone,
        complete: (res) => {},
        fail: (res) => {},
        success: (res) => {},
      })
    }
  },


})