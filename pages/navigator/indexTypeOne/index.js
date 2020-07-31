// pages/navigator/indexTypeOne/index.js
var Moment = require("../../../utils/moment");
import {
  HotelRoomType
} from "../../../models/hotelRoomType";

const app = getApp();
import {
  HotelRotationchart
} from "../../../models/hotelRotationchart";
import date from "../../../miniprogram_npm/lin-ui/common/async-validator/validator/date";

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
    ],
    StartValidityTime:null,
    EndValidityTime:null,
    selectDay:null,//选中的日期天数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const shopInfo = wx.getStorageSync('shopInfo')
    this.setData({
      shopInfo
    })
    //设缓存缓存起来的日期
    let checkInDate=Moment(new Date()).format('YYYY-MM-DD')
    let checkOutDate= Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')

    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate,
        checkOutDate
      }
    });
    this.setData({
      StartValidityTime: checkInDate,
      EndValidityTime: checkOutDate,
      selectDay:Moment(checkOutDate).differ(checkInDate)
    })
  },
  onShow(){
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      StartValidityTime: getDate.checkInDate,
      EndValidityTime: getDate.checkOutDate,
      selectDay:Moment(getDate.checkOutDate).differ(getDate.checkInDate)
    })
    this.initDataAll()
    this.initBottomList()
  },
  onPullDownRefresh() {
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
    })
    wx.stopPullDownRefresh();
  },
  async initBottomList() {
    let StartValidityTime= app.util.tsFormatTime(this.data.StartValidityTime,'YMD')
    let EndValidityTime= app.util.tsFormatTime(this.data.EndValidityTime,'YMD')
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
      "StartValidityTime":StartValidityTime,
      "EndValidityTime":EndValidityTime,
      "Total": this.data.selectDay,
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
  onCalendar(){
     console.log("点击了跳转日历")

    wx.navigateTo({
      url: '/pages/subpackages/mall/product/calendar/index',
    })
    
  },

  onBanner(e){
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productImages/index`,
    })
  },
  onTap(e){
    console.log(e)
    let spu=e.detail
    let obj={
       spu,
       ID:spu.ID,
       IsSale:spu.IsSale,
       StartValidityTime:this.data.StartValidityTime,
       EndValidityTime:this.data.EndValidityTime,
       selectDay:this.data.selectDay,
    }
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/productDetailTypeOne/index?obj=${JSON.stringify(obj)}`,
    })
  },
  onRight(e){
    console.log(e)
    let spu=e.detail
    let obj={
      ID:spu.ID,
      IsSale:spu.IsSale,
      StartValidityTime:this.data.StartValidityTime,
      EndValidityTime:this.data.EndValidityTime,
      selectDay:this.data.selectDay,
    }
    wx.navigateTo({
      url: `/pages/subpackages/mall/product/orderTypeOne/index?obj=${JSON.stringify(obj)}`,
    })

  },
  /**
   *
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {

    const data = await this.data.hotelRoomModel.getMoreData();
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
      hotelRoom: data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },
})