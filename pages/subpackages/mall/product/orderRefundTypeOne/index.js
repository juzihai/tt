// pages/subpackages/mall/product/orderRefundTypeOne/index.js
import {HotelRoomType} from "../../../../../models/hotelRoomType";


const app = getApp();
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
    this.data.item=JSON.parse(options.item)
    this.WxValidate = app.WxValidate({
      describe: {
        required: true,
      }
    }, {
      describe: {
        required: '请输入退款原因',
      }
    })
  },
  async formSubmit (e){
    const params = e.detail.value
    console.log(params)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      console.log(this.WxValidate.errorList)
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      });
      return false
    }
    let item = this.data.item
    let obj = {
      EnterpriseID:wx.getStorageSync('shopInfo').EnterpriseID,
      OpenID:wx.getStorageSync('OpenID'),
      OrderNo: item.OrderNo,
      RefundReason:params.describe
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await HotelRoomType.HotelRefundOrder(obj)
    setTimeout(function() {
      wx.lin.hideToast()
    }, 100)
    if(!orderModel.ResultBool){
      wx.showToast({
        title: '申请失败',
        icon:"none"
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
      if (res.confirm) {
      console.log('用户点击确定')
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
      }
      })

    let pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      let prePage = pages[pages.length - 2];
      //关键在这里
      prePage.onLoad()
    }
    wx.navigateBack()

}

})