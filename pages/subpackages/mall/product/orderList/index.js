const app = getApp();
import {
  Order
} from "../../../../../models/order.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Status: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    
  },
  onShow(){
    this.initAllData()
  },
  changeTabs(e) {
    let activeKey = e.detail.activeKey
    this.setData({
      Status: activeKey
    })
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseId: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      Status: this.data.Status
    }
    const scheduled =await Order.ScheduledSearchDetails()
    const orderModel = Order.QueryForWx(obj)
    this.data.orderModel = orderModel //类属性
    const order = await orderModel.getMoreData(); //todo
    this.setData({
      scheduled,
      order
    })
    wx.stopPullDownRefresh();
  },
  // onTime(e) {
  //   this.initAllData()
  // },
  onCancelOrder(e){
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
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
      ID: item.ID,
      OederNumber: item.OrderNo
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await Order.CancelOrder(obj)
    setTimeout(function() {
      wx.lin.hideToast()
    }, 100)
    this.initAllData()
  },
  onDelete(e){
    wx.showModal({
      title: '提示',
      content: '是否删除订单',
      success: res => {
        if (res.confirm) {
          this.Delete(e)
        }
      }
    })
  },
  async Delete(e) {
    let item = e.currentTarget.dataset.cell
    let obj = {
      OrderNo: item.OrderNo
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true,
      duration:15000
    })
    const orderModel = await Order.Delete(obj)
    setTimeout(function() {
      wx.lin.hideToast()
    }, 100)
    this.initAllData()
  },
  async onPay(e) {
    let item = e.currentTarget.dataset.cell
    //TODO 待支付
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID"),
      OrderNo: item.OrderNo,
      OrderPrice: item.OrderPrice,
      PayPrice: item.PayPrice
    }
    let that=this;
    if (item.PayPrice==0){
      let order = await Order.DeductiblePay(obj)
      wx.showModal({
        title: '提示',
        content: order ? '提交成功' :'提交失败',
        showCancel: false,
        success() {
          that.initAllData()
        }
      })
    }else{
      let messageJson = await Order.WXPay(obj)
      wx.requestPayment({
        'timeStamp': messageJson.timeStamp,
        'nonceStr': messageJson.nonceStr,
        'package': messageJson.package,
        'signType': messageJson.signType,
        'paySign': messageJson.paySign,
        'success': function (res) {
          wx.showModal({
            title: '提示',
            content: '付款成功',
            showCancel: false,
            success() {
              that.initAllData()
            }
          })
        },
        'fail': function (res) {

          var errMsg = res.errMsg;
          if (errMsg == "requestPayment:fail cancel")
            wx.showToast({
              title: '已取消支付',
              icon: 'none',
              duration: 2000
            })
        }
      });
    }

  },

  onUrged(e) {
    wx.showModal({
      title: '提示',
      content: '已经快马加鞭的为小主送去通知～',
    })
  },
  onReceipt(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认收货',
      success: res => {
        if (res.confirm) {
          this.Receipt(e)
        }
      }
    })
  },
  async Receipt(e) {
    let item = e.currentTarget.dataset.cell
    let obj = {
      OrderNo: item.OrderNo,
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await Order.Receipt(obj)
    setTimeout(function() {
      wx.lin.hideToast()
    }, 100)
    this.initAllData()
  },
  onGoDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/orderDetail/index?id=' + id,
    })
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

})