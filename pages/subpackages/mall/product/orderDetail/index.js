// pages/subpackages/mall/product/orderDetail/index.js
const app = getApp();
import {
  Order
} from "../../../../../models/order.js";
import {
  SubCompany
} from "../../../../../models/subCompany.js";

import {
  getWindowHeightRpx
} from "../../../../../utils/system";
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
    discountAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let id = options.id

    // const sorted = this.groupBy(order.Data, function (item) {
    //   return [item.ClassID];
    // })
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里
    this.setData({
      h,
      id
    })
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      ID: this.data.id
    }
    const order = await Order.DetailByOrderIdForWx(obj)
    let discountAmount = order.OrderPrice - order.PayPrice
    let text={
      OrderNo: order.OrderNo,
      ID: order.ID,
      Key:'guozi'
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
      order,
      discountAmount: discountAmount.toFixed(2)
    })
  },
  // onTime(e) {
  //   this.initAllData()
  // },
  groupBy(array, f) {

    const groups = {};
    array.forEach(o => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    })
    return Object.keys(groups).map(function(group) {
      return {
        ClassID: groups[group][0].ClassID,
        ClassName: groups[group][0].ClassName,
        value: groups[group]
      }
    })
  },
  onCancelOrder(e) {
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success: res => {
        if (res.confirm) {
          this.CancelOrder(e)
        }
      }
    })
  },
  async CancelOrder(e) {
    let item = this.data.order
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
  onDelete(e) {
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

    let item = this.data.order
    let obj = {
      OrderNo: item.OrderNo
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await Order.Delete(obj)
    setTimeout(function() {
      wx.lin.hideToast()
      wx.navigateBack()
    }, 500)

  },
  async onPay(e) {
    let item = this.data.order
    //TODO 待支付
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID"),
      OrderNo: item.OrderNo,
      OrderPrice: item.OrderPrice,
      PayPrice: item.PayPrice
    }
    if (item.PayPrice == 0) {
      let order = await Order.DeductiblePay(obj)
      wx.showModal({
        title: '提示',
        content: order ? '提交成功' : '提交失败',
        showCancel: false,
        success() {
          this.initAllData()
        }
      })
    } else {
      let messageJson = await Order.WXPay(obj)
      wx.requestPayment({
        'timeStamp': messageJson.wcPayDataTimeStamp,
        'nonceStr': messageJson.wcPayDataNonceStr,
        'package': messageJson.wcPayDataPackage,
        'signType': messageJson.wcPayDataSignType,
        'paySign': messageJson.wcPayDataPaySign,
        'success': function(res) {
          wx.showModal({
            title: '提示',
            content: '付款成功',
            showCancel: false,
            success() {
              this.initAllData()
            }
          })
        },
        'fail': function(res) {

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


    let item = this.data.order
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
  onShopPhone(e) {
    let itemList = [{
      name: '拨打电话',
      icon: 'phone'
    }, {
      name: '地图导航',
      icon: 'address'
    }]
    wx.lin.showActionSheet({
      itemList,
      showCancel: true,
      success: (res) => {
        let name = res.item.name
        let shopInfo = wx.getStorageSync('shopInfo')
        switch (name) {
          case '拨打电话':
            let phoneNumber = shopInfo.Phone
            wx.makePhoneCall({
              phoneNumber,
            })
            break;
          case '地图导航':
            wx.openLocation({
              latitude: shopInfo.Latitude,
              longitude: shopInfo.Longitude,
              scale: '16',
              name: shopInfo.CompanyName,
              address: shopInfo.Address,
            })
            break;
        }
      }
    })
  },
  onGoToShip(e) {
    // let a ='https://www.baidu.com/s?wd=2323'
    // wx.navigateTo({
    //   url: `/pages/subpackages/mall/activity/web-view/index?url=${a}`,
    // })
    let code = this.data.order.ShipNumber
    if (!code) {
      wx.showToast({
        title: '暂无物流编号',
        icon: 'none'
      })
      return
    }
    wx.setClipboardData({
      data: code,
      success: (res) => {
        wx.showToast({
          title: '复制成功，可前往浏览器粘贴查询',
          icon: 'none'
        })
      }
    })
  },
  async onGoToSubCompany(e){
    let obj={
      ID: this.data.order.SubCompanyID
    }
    let subCompany = await SubCompany.SearchModelDetails(obj)

    wx.openLocation({
      latitude: subCompany.Latitude,
      longitude: subCompany.Longitude,
      scale: '16',
      name: subCompany.CompanyName,
      address: subCompany.Address,
    })
  },
})