import {GroupBuying} from "../../../../../models/groupBuying";

const app = getApp()
import {
  OrderAndPayLogic
} from "../../../../../models/orderAndPayLogic.js";
import {
  getWindowHeightRpx
} from "../../../../../utils/system";
import {
  PreOrder
} from "../../../../../utils/preOrder.js"
import {ShoppingWay} from "../../../../../core/enum";
let preOrder;
Page({


  data: {
    showCoupon: false,
    DeliveryModel: 1, //配送方式
  },

  onLoad: async function(options) {
    preOrder = new PreOrder()
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    let ProductModel = JSON.parse(options.ProductModel)
    // 1、校验店铺是否开通支付，是否支付物流，是否支持自提
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState({EnterpriseID: app.config.EnterpriseID,})
    const  GroupBuy= await  GroupBuying.QueryEGroupForWx({EnterpriseId: app.config.EnterpriseID})
    let orderParam = {
      ProductCount: ProductModel.ProductCount, //商品总数
      ProductPrice: ProductModel.ProductPrice, //原订单价格
      LogisticsFee: GroupBuy.GroupBuy
    }
    this.orderParam(orderParam)
    this.setData({
      GroupBuy,
      h,
      ProductModel,
      payState: payState.ResultValue, //可支付状态
    })
    setTimeout(function() {

      wx.lin.hideToast()
    }, 500);


  },
  onShow: function() {
    let ShippingAddress = wx.getStorageSync("ShippingAddress")
    this.setData({
      ShippingAddress
    })
    this.initAllData()
  },
  //更新订单价格等信息
  orderParam(obj) {
    preOrder.orderParam = obj
    this.setData({
      preOrder
    })
  },

  // 选择收货地址
  onGetAdd() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressList/index',
    })
  },
  inputRemark(e) {
    let value = e.detail.value;
    this.setData({
      Remark: value
    })
  },
  initAllData(){

  },
  // 提交订单
  async onNextTap() {

    let ShippingAddress = this.data.ShippingAddress
    let RealName = ShippingAddress.RealName
    let TelPhone = ShippingAddress.TelPhone
    let Address = ShippingAddress.Province + ShippingAddress.City + ShippingAddress.Area + ShippingAddress.Street

    if (!ShippingAddress) {
      wx.showModal({
        title: '提示',
        content: '请选择联系人信息',
      })
      return
    }

    wx.showLoading({
      title: '处理中～',
      mask: true
    })
    let ProductModel = this.data.ProductModel
    let ProductlListModel = ProductModel.ProductlListModel;

    let obj={
      BillId:ProductModel.BillId,
      ProductCode:ProductlListModel[0].ProductCode,
      OpenId: wx.getStorageSync("OpenID"),
      Phone:wx.getStorageSync("phoneNumber"),
      PayMoney:preOrder.OrderPrice,
      Carriage:preOrder.LogisticsFee,
      Address,
      Consignee:RealName,
      ConsigneePhone:TelPhone,
      PayNumber:preOrder.orderCostParam.ProductCount,
    }
    let order;
    if (ProductModel.orderWay === ShoppingWay.CREATE_GROUP){
      order = await GroupBuying.BillCreate(obj)
    }else if(ProductModel.orderWay === ShoppingWay.MAKE_GROUP){
      order = await GroupBuying.BillMakeGroup(obj)
    }else if(ProductModel.orderWay === ShoppingWay.BUY){
      order = await GroupBuying.AloneBuyForWx(obj)
    }

    if (order && order.Success) {
      wx.redirectTo({
        url: '/pages/subpackages/mall/groupBuying/orderList/index',
      })
    }


  }
})