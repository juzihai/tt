// pages/subpackages/mall/product/coupon/index.js
import { Time } from '../../../../../utils/time.js'
import {formatTime} from '../../../../../utils/util.js'
let time=new Time()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})