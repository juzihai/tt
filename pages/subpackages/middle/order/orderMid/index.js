// pages/subpackages/middle/order/orderMid/index.js
Page({
  data: {

  },
  toHotel(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/orderListTypeOne/index',
    })
  },
  toProject(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/orderList/index',
    })
  },
  toGroupShop(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/groupBuying/orderList/index',
    })
  }

})