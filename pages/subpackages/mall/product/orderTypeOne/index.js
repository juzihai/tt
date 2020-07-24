const app = getApp()
import {HotelRoomType} from "../../../../../models/hotelRoomType";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TotalRoom:1,
    TotalDay:1,
    StartValidityTime:null,
    EndValidityTime:null,
    OrderMoney:0,
    PayMoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id
    this.setData({
      id,
      StartValidityTime:20200804,
      EndValidityTime: 20200805,
      TotalDay: 1,
      TotalRoom:1

    })

    this.initData()
    this.initDataAll()
  },
  async initData() {
    let obj = {
      ID: this.data.id,
      StartValidityTime: this.data.StartValidityTime,
      EndValidityTime: this.data.EndValidityTime,
      TotalDay: this.data.TotalDay,
      TotalRoom: this.data.TotalRoom
    }
    const order = await HotelRoomType.PageSearchOrderWX(obj)
    this.setData({
      order,
      OrderMoney:order.TotalMoney.toFixed(2),
      PayMoney:order.TotalMoney.toFixed(2),
    })
   
  },
  async initDataAll() {
    const roomData = await HotelRoomType.PageSearchProperty(this.data.id)
    this.setData({
      roomData,
    })

  },
  onRoomNumber(e){
    console.log(e)
    let value=e.detail.value
    this.data.TotalRoom=value
    this.initData()
  },
  async formSubmit(e) {
    let {
      name,
      phone
    } = e.detail.value
    let OpenID = wx.getStorageSync('OpenID')
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return;
    }
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      HotelRoomTypeId: this.data.id,
      OpenID: OpenID,
      Name: name,
      Phone: phone,
      TotalRoom: this.data.TotalRoom,
      TotalDay: this.data.TotalDay,
      StartValidityTime: this.data.StartValidityTime,
      EndValidityTime: this.data.EndValidityTime,
      OrderMoney: this.data.OrderMoney,
      PayMoney: this.data.PayMoney
    }
    const order = await HotelRoomType.HotelPayOrder(obj)
    if (order){
      wx.navigateTo({
        url: '/pages/subpackages/mall/product/orderListTypeOne/index',
      })
    }

  }
})