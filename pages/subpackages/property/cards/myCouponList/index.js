// pages/subpackages/mall/cards/activityCouponList/index.js

import {
  ActivityCouponCustomerReceive
} from "../../../../../models/activityCouponCustomerReceive";
import {PlatformProductCoupon} from "../../../../../models/platformProductCoupon";

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initAllData(0,1)
  },
  onShow(){

  },
  changeTabs(e) {
    let activeKey = e.detail.activeKey
    switch(activeKey){
      case "0":
        this.initAllData(0, 1)
        break;
      case "1":
        this.initAllData(1, 0)
        break;
      case "2":
        this.initAllData(0, 0)
        break;
      default:
    }
    this.setData({
      activeKey
    })
  },
  async initAllData(IsUse, IsValidity) {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID : wx.getStorageSync('OpenID'),
      Phone:wx.getStorageSync('phoneNumber'),
      IsUse,
      IsValidity,
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const couponModel = await PlatformProductCoupon.PlatformProductPageSearchWX(obj)
    this.data.couponModel = couponModel //类属性
    const coupon = await couponModel.getMoreData();//todo
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
    let ID =cell.CouponId
    wx.navigateTo({
      url: `../myCouponDetail/index?ID=${ID}`,
    })


  }
})