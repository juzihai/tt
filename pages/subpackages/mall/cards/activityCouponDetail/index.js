// pages/subpackages/mall/cards/activityCouponDetail/index.js

import {ActivityCouponCustomerReceive} from "../../../../../models/activityCouponCustomerReceive";

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
    expandArray:["0"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let GUID=options.GUID
     let ActivityCoupon_CGUID=options.ActivityCoupon_CGUID
    let obj = {
      GUID:ActivityCoupon_CGUID
    }
    wx.lin.showToast({
      title: '加载中～',
      mask: true
    })
    const couponModel = await ActivityCouponCustomerReceive.SearchModelDetails(obj)

    let text={
      Key:'guoziCoupon',
      GUID,
      ActivityCoupon_CGUID
    }
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: JSON.stringify(text),
      image: '',
      width: code_w,
      height: code_w,
      colorDark: "#000000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
      callback: (res) => {
        // 生成二维码的临时文件
        console.log(res.path)
      }
    });
    this.setData({
      GUID,
      couponModel,
      showCoupon:true
    })

  },


})