const app = getApp();

import {
  getWindowHeightRpx
} from "../../../../../utils/system";
import { Order } from "../../../../../models/order.js";

Page({
  data: {

  },

  onLoad: async function (options) {
    let ProductModel = JSON.parse(options.ProductModel)
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      ProductModel
    })
  },

  onShow: function () {
    let ShippingAddress = wx.getStorageSync("ShippingAddress")
    this.setData({
      ShippingAddress
    })
  },
  onGetAdd(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressList/index',
    })
  },

  async onNextTap(){
    let ShippingAddress=this.data.ShippingAddress
    let obj={
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync('OpenID'),
      ProductCount:0,//商品数量
      RealName: ShippingAddress.RealName,
      TelPhone: ShippingAddress.TelPhone,
      Address: ShippingAddress.Address ,
      OrderPrice: this.data.ProductModel.ProductPrice,
      PayPrice:1,
      Integra: 1,
      IntegraPrice: 1,
      LogisticsFee: 1,
      Remark: 1,
      DeliveryModel: 1,//配送方式（1：物流；2：自提；3：包邮）
      OrderDetailListModel: 1,
      OrderCouponListModel: 1,
    }
    const order=await Order.Add()

  }

})