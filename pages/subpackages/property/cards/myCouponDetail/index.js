// pages/subpackages/mall/cards/activityCouponDetail/index.js
import {PlatformProductCoupon} from "../../../../../models/platformProductCoupon";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expandArray:["0"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let ID=options.ID
    let obj = {
      ID
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const couponModel = await PlatformProductCoupon.SearchModelDetailsWX(obj)
    this.setData({
      ID,
      couponModel,
      showCoupon:true
    })

  },
  onQRCode(){
    var currentImage = this.data.couponModel.Image
    var imageList = []
    imageList.push(currentImage)

    wx.previewImage({
      urls: imageList,
      current: currentImage
    })
  }

})