const app = getApp();

import { Time } from '../../../../../utils/time.js'
import {formatTime} from '../../../../../utils/util.js'
import { Coupon } from '../../../../../models/coupon.js'
let time=new Time()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp=new Date()
    var temp1 = time.getRealtime(temp)
    var temp2 = new Date()
    console.log(temp1.toLocaleString())
    var time1=time.subTime(temp1, temp2)
    console.log(time1)
    // var timesDiff = Math.abs(temp1.getTime() - temp.getTime());
    // var total = (temp1.getTime() - temp.getTime())/1000
    // var day=parseInt(total/(24*60*60))
    // console.log("day is "+day)
    // var afterDay=total-day*24*60*60
    // var hour=parseInt(afterDay/(60*60))
    // console.log("hour is "+hour)
    //  var afterHour=total-day*24*60*60-hour*60*60
    //  var minutes=parseInt(afterHour/60)
    // console.log("minutes is "+minutes)
    // var afterMinuers = parseInt(total - day * 24 * 60 * 60 - hour * 60 * 60 - minutes * 60) 
    // console.log("second is "+afterMinuers )

    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      ProductClassID:0,
      CouponType:0,
    }
    const couponModel = await Coupon.PageSearch(obj)
    this.data.couponModel = couponModel //类属性
    const coupon = await couponModel.getMoreData();//todo
    this.setData({
      coupon
    })
  },

  async onCard(e){

    let item=e.currentTarget.dataset.cell
    let userInfo = wx.getStorageSync('userInfo')
    let obj={
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID"),
      CustomerID: userInfo.ID,
      ID: item.ID
    }
    try{
      const coupon = await Coupon.ReceiveCoupon(obj)
      if (coupon.ResultBool) {
        wx.showToast({
          title: '您已领取了该优惠券，在"我的优惠券中"可查看',
          icon: "none"
        })
      } else {
        wx.showToast({
          title: '领取失败，请重试',
          icon: "none"
        })
      }
    }catch(e){

    }

  }
})