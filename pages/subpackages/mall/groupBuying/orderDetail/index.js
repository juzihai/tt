// pages/subpackages/mall/product/orderDetail/index.js
import {GroupBuying} from "../../../../../models/groupBuying";

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

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let OrderNo = options.OrderNo
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里
    this.setData({
      OrderNo,
      h
    })
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      OrderNo: this.data.OrderNo
    }
    const order = await GroupBuying.QueryEGroupBillDetail(obj)
    this.setData({
      order,
    })
  },

  onBillOut(e){
    wx.showModal({
      title: '提示',
      content: '是否退团',
      success:res=> {
        if (res.confirm) {
          this.BillOut(e)
        }
      }
    })
  },
  async BillOut(e) {
    let item = e.currentTarget.dataset.cell
    let obj = {
      ID: item.ID
    }
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    const orderModel = await GroupBuying.BillOut(obj)
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