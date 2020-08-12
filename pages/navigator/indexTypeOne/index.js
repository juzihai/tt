// pages/navigator/indexTypeOne/index.js
import {File} from "../../../models/file";

var Moment = require("../../../utils/moment");
import {
  HotelRoomType
} from "../../../models/hotelRoomType";
import { AppModel} from '../../../models/app.js';
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
  onLoad: async function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    const scene = decodeURIComponent(options.scene)
    console.log('???', scene)
    if (scene != 'undefined') {
      const data = await File.SearchModelDetails({ChannleCode: scene})
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
    const shopInfo = wx.getStorageSync('shopInfo')
    this.setData({
      shopInfo
    })
    //设缓存缓存起来的日期
    let checkInDate = Moment(new Date()).format('YYYY-MM-DD')
    let checkOutDate = Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')

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
      selectDay: Moment(checkOutDate).differ(checkInDate)
    })
    this.initDataAll()
    this.initBottomList()
  },
  onShareAppMessage: function() {
    let id = this.data.id;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent('/pages/navigator/indexTypeOne/index');

    return {
      title: "详情",
      path: `/pages/navigator/indexTypeOne/index?url=${url}&SharOpenID=${OpenID}&SharType=indexTypeOne`
    }
  },
  onShow(){
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    if(getDate){
      this.setData({
        StartValidityTime: getDate.checkInDate,
        EndValidityTime: getDate.checkOutDate,
        selectDay:Moment(getDate.checkOutDate).differ(getDate.checkInDate)
      })
      this.initDataAll()
      this.initBottomList()
    }

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
  async onTap(e){
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
 async onRight(e){
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