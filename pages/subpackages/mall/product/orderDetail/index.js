// pages/subpackages/mall/product/orderDetail/index.js
import { Order } from "../../../../../models/order.js";
import {
  getWindowHeightRpx
} from "../../../../../utils/system";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let id=options.id
    let obj = {
      ID:id

    }
    const order = await Order.DetailByOrderIdForWx(obj)
    // const sorted = this.groupBy(order.Data, function (item) {
    //   return [item.ClassID];
    // })
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里
    this.setData({
      h,
      order
    })
  },
  groupBy(array, f) {

    const groups = {};
    array.forEach(o => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    })
    return Object.keys(groups).map(function (group) {
      return {
        ClassID: groups[group][0].ClassID,
        ClassName: groups[group][0].ClassName,
        value: groups[group]
      }
    })
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