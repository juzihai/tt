const app = getApp();
import { Order } from "../../../../../models/order.js";
import { OrderAndPayLogic } from "../../../../../models/orderAndPayLogic.js";

import {
  getWindowHeightRpx
} from "../../../../../utils/system";


Page({
  data: {
    showRealm: false,
    // 原始价格
    ProductModel:{
      ProductCount:0,
      ProductPrice: 0,//订单价格
      ProductlListModel:null,
    },
    //处理后的价格
    PayPrice: 0,//实际付款价格
    Integra:0,
    IntegraPrice:0,
    LogisticsFee:0,
    Remark:null,
    DeliveryModel:1,
    OrderCouponListModel:null,

  },

  onLoad: async function (options) {
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的

    let ProductModel = JSON.parse(options.ProductModel)
    // 1、校验店铺是否开通支付，是否支付物流，是否支持自提
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState({ EnterpriseID: app.config.EnterpriseID, })
    // 2、产品价格和库存校验 并返回总价
    let Date=[]
    ProductModel.ProductlListModel.forEach(item=>{
      let i={
        ProductID: item.ProductId,
        CountPrice: item.ProductCountPrice,
        Price: item.ProductPrice,
        Count: item.ProductNum
      }
      Date.push(i)
    })
    const checkProductPriceAndStockModel = await OrderAndPayLogic.CheckProductPriceAndStockModel({ Date })
    let price = Number(checkProductPriceAndStockModel.toFixed(2))
    ProductModel.ProductPrice = price
    
    this.setData({
      h,
      ProductModel,
      payState,
      PayPrice: price

    })
    this.initAllData()
  },
  async initAllData() {
    let ProductModel = this.data.ProductModel
    const sorted = this.groupBy(ProductModel.ProductlListModel, function (item) {
      return [item.ClassID];
    })
    let obj={
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      sorted
    }
    const getAllUseCouponByProduct = await OrderAndPayLogic.GetAllUseCouponByProduct(obj)

    this.setData({
      sorted,
      getAllUseCouponByProduct
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

  onShow: function () {
    let ShippingAddress = wx.getStorageSync("ShippingAddress")
    this.setData({
      ShippingAddress
    })
  },
  // 选择收货地址
  onGetAdd(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressList/index',
    })
  },
  //自提
  onMyGo(e){
    let value=e.detail.value
      this.setData({
        DeliveryModel:value?1:0
      })

  },
  // 选择配送方式
  onDistribution(e){
    this.setData({
      showRealm:true
    })
  },
  //取消弹框
  onPopupBack(){
    this.setData({
      showRealm: false
    })
  },
  // 弹框确定选中
  async onSpecAdd(event) {
    this.setData({
      showRealm: false
    })
  },
// 提交订单
  async onNextTap(){
    let ShippingAddress=this.data.ShippingAddress
    if (!ShippingAddress){
      wx.showToast({
        title: '请选择地址',
      })
      return
    }
    let ProductModel = this.data.ProductModel
    let ProductlListModel = ProductModel.ProductlListModel;
    let OrderDetailListModel = [];
    ProductlListModel.forEach(i=>{

      let item = {
        "ProductId": i.ProductId,
        "ProductType": 1,
        "ProductName": i.ProductName,
        "ProductTypeName": i.ClassName,
        "ProductMoney": i.ProductCountPrice,
        "ProductNum": i.ProductNum,
        "ProductPrice": i.ProductPrice,
        "ProductImage": i.ProductImage
      }
      OrderDetailListModel.push(item)
    })
    let OpenId = wx.getStorageSync("OpenID")
    let obj={
      EnterpriseID: app.config.EnterpriseID,
      OpenId,
      ProductCount: ProductModel.ProductCount,//商品数量
      RealName: ShippingAddress.RealName,
      TelPhone: ShippingAddress.TelPhone,
      Address: ShippingAddress.Province + ShippingAddress.City + ShippingAddress.Area + ShippingAddress.Street  ,
      OrderPrice: ProductModel.ProductPrice,
      PayPrice: this.data.PayPrice,
      Integra: this.data.Integra,
      IntegraPrice: this.data.IntegraPrice,
      LogisticsFee: this.data.LogisticsFee,
      Remark: this.data.Remark,
      DeliveryModel: this.data.DeliveryModel,//配送方式（1：物流；2：自提；3：包邮）
      OrderDetailListModel ,
      OrderCouponListModel: this.data.OrderCouponListModel,
    }
    const order=await Order.Add(obj)
    console.log(order)

  }

})