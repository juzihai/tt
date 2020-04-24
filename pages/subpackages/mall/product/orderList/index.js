const app = getApp();
import { Order } from "../../../../../models/order.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Status:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.initAllData()
  },
  changeTabs(e){
    let activeKey = e.detail.activeKey
    this.setData({
      Status:activeKey
    })
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseId: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      Status:this.data.Status
    }
    
    const orderModel = Order.QueryForWx(obj)
    this.data.orderModel = orderModel //类属性
    const order = await orderModel.getMoreData();//todo
    this.setData({
      order
    })

  },
  onTime(e){
    console.log(e)
  },
  onCancelOrder(e){
    let obj = {
      EnterpriseId: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      Status: this.data.Status
    }

    const orderModel = Order.QueryForWx(obj)
  },
  onPay(e){

  },
  onUrged(e){

  },
  onReceipt(e){

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