// pages/subpackages/mall/product/coupon/index.js
import { Time } from '../../../../../utils/time.js'
import {formatTime} from '../../../../../utils/util.js'
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
  },

  onCard(){
    wx.showModal({
      title: '提示',
      content: '您已成功领取',
    })
  }
})