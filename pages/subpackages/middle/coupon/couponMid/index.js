// pages/subpackages/middle/coupon/couponMid/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toActiveConpon(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/cards/activityCouponList/index',
    })
  },
  toMyConpon(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/cards/couponList/index',
    })
  },
  toPlatformConpon(){
    wx.navigateTo({
      url: '/pages/subpackages/property/cards/myCouponList/index',
    })
  }
})