// pages/subpackages/mall/product/orderListTypeOne/index.js
import {HotelRoomType} from "../../../../../models/hotelRoomType";
import {Order} from "../../../../../models/order";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Status: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initDataAll()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.initAllData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    const data = await this.data.orderModel.getMoreData();
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
      order: data
    })
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }
  },
  async initDataAll() {
    let obj = {
      EnterpriseID: wx.getStorageSync('shopInfo').EnterpriseID,
      Status: this.data.Status,
      OpenID: wx.getStorageSync('OpenID')
    }

    const orderModel = HotelRoomType.OrderListPageSearch(obj)
    this.data.orderModel = orderModel //类属性
    const order = await orderModel.getMoreData(); //todo
    this.setData({
      order
    })
    wx.stopPullDownRefresh();
  },
  changeTabs(e) {
    let activeKey = e.detail.activeKey
    this.setData({
      Status: activeKey
    })
    this.initDataAll()
  },
  onCancelOrder(e){ 
    let item = e.currentTarget.dataset.cell
    if(!item.IsRefund){
      wx.showToast({
        title: '暂不支持退款',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否申请退款',
      success:res=> {
        if (res.confirm) {
          this.CancelOrder(e)
        }
      }
    })
  },
  async CancelOrder(e) {
    let item = e.currentTarget.dataset.cell
    let obj = {
      EnterpriseID:wx.getStorageSync('shopInfo').EnterpriseID,
      OpenID:wx.getStorageSync('OpenID'),
      OrderNo: item.OrderNo,
      RefundReason:''
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await HotelRoomType.HotelRefundOrder(obj)
    setTimeout(function() {
      wx.lin.hideToast()
    }, 100)
    this.initAllData()
  },

  onGoDetail(e) {
    let item = e.currentTarget.dataset.cell
    // let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/orderDetailTypeOne/index?item=' + item,
    })
  },
})