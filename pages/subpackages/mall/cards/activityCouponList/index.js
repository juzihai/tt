// pages/subpackages/mall/cards/activityCouponList/index.js

import {
  ActivityCouponCustomerReceive
} from "../../../../../models/activityCouponCustomerReceive";

const app = getApp();

var QRCode = require('../../../../../utils/weapp-qrcode.js')
var qrcode;
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const code_w = 300 / rate;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code_w: code_w,
    activeKey: 0,
    showCoupon: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.initAllData(0)
  },
  onShow(){
    this.initAllData()
  },
  changeTabs(e) {
    // console.log(e)
    // let activeKey = e.detail.activeKey
    // switch (activeKey) {
    //   case "0":
    //     this.initAllData(0)
    //     break;
    //   case "1":
    //     this.initAllData(1)
    //     break;
    //   case "2":
    //     this.initAllData(2)
    //     break;
    //   default:
    // }
    // this.setData({
    //   activeKey
    // })

    this.data.activeKey=e.detail.activeKey
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync('OpenID'),
      Phone: wx.getStorageSync('phoneNumber'),
      Status:this.data.activeKey
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const couponModel = await ActivityCouponCustomerReceive.PageSearch(obj)
    this.data.couponModel = couponModel //类属性
    const coupon = await couponModel.getMoreData(); //todo
    setTimeout(function () {
      wx.lin.hideToast()
    }, 100)
    this.setData({
      coupon
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.couponModel.getMoreData();
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
      coupon: data
    })
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },
  async onGoto(e) {
    let cell = e.currentTarget.dataset.cell
    let GUID = cell.GUID
    let ActivityCoupon_CGUID = cell.ActivityCoupon_CGUID
    wx.navigateTo({
      url: `../activityCouponDetail/index?GUID=${GUID}&ActivityCoupon_CGUID=${ActivityCoupon_CGUID}`,
    })

    // let OpenID = wx.getStorageSync('OpenID')
    // console.log(e)
    // let GUID=e.currentTarget.dataset.guid
    // let text={
    //   Key:'guoziCoupon',
    //   GUID
    // }
    // qrcode = new QRCode('canvas', {
    //   // usingIn: this,
    //   text: JSON.stringify(text),
    //   image: '',
    //   width: code_w,
    //   height: code_w,
    //   colorDark: "#000000",
    //   colorLight: "white",
    //   correctLevel: QRCode.CorrectLevel.H,
    //   callback: (res) => {
    //     // 生成二维码的临时文件
    //     console.log(res.path)
    //   }
    // });
    // this.setData({
    //   showCoupon:true
    // })

  }
})