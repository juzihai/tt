const app = getApp()
import {
  Order
} from "../../../../../models/order.js";
import {
  OrderAndPayLogic
} from "../../../../../models/orderAndPayLogic.js";
import {
  getWindowHeightRpx
} from "../../../../../utils/system";
import {
  PreOrder
} from "../../../../../utils/preOrder.js"　　
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
    let pagePath = options.pagePath;
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    let ProductModel = JSON.parse(options.ProductModel)
    const sorted = this.groupBy(ProductModel.ProductlListModel, function(item) {
      return [item.ClassID];
    })
    //获取所有优惠券
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      sorted
    }
    const getAllUseCouponByProduct = await OrderAndPayLogic.GetAllUseCouponByProduct(obj)
    // 1、校验店铺是否开通支付，是否支付物流，是否支持自提
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState({
      EnterpriseID: app.config.EnterpriseID,
    })


    let orderParam = {
      ProductCount: ProductModel.ProductCount, //商品总数 
      ProductPrice: ProductModel.ProductPrice, //原订单价格 
    }
    this.orderParam(orderParam)
    this.setData({
      h,
      pagePath,
      ProductModel,
      sorted, //展示商品
      payState: payState.ResultValue, //可支付状态
      // DeliveryModel, //取货方式
      getAllUseCouponByProduct: getAllUseCouponByProduct.ResultValue //优惠券
    })
    setTimeout(function() {

      wx.lin.hideToast()
    }, 500);
    let jiage = await this.checkProductPriceAndStockModel()
    let wuliu = await this.initAllData()

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
  //4、for循环拼接产品list校验商品库存及价格是否正确（商品有变动会提示商品问题、重选商品或者返回上一页）
  async checkProductPriceAndStockModel() {
    let ProductModel = this.data.ProductModel
    let Date = []
    ProductModel.ProductlListModel.forEach(item => {
      let i = {
        ProductID: item.ProductID,
        CountPrice: item.ProductCountPrice,
        Price: item.ProductPrice,
        Count: item.ProductNum
      }
      Date.push(i)
    })
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    try {
      const checkProductPriceAndStockModel = await OrderAndPayLogic.CheckProductPriceAndStockModel({
        Date
      })
      let price = Number(checkProductPriceAndStockModel.ResultValue.toFixed(2))


    } catch (e) {
      wx.showModal({
        title: '提示',
        content: e.data.ResultValue,
        cancelText: '重选商品',
        confirmText: '确定',
        success: (res) => {
          if (res.confirm) {

          } else if (res.cancel) {
            wx.navigateBack()
          }

        }
      })
      setTimeout(function() {

        wx.lin.hideToast() 
      }, 500);
      return false
    }
    setTimeout(function() {

      wx.lin.hideToast()
    }, 500);
    return true
  },
  //5、通过店铺id及groupby后的产品查询物流价格(如果所选地址不支持物流提示切换地址或重选商品返回上一页)
  async initAllData() {
    //查询邮费信息


    if (preOrder.orderCostParam.orderCheck.pickUp == false) { //快递
      if (this.data.ShippingAddress && this.data.sorted) {
        let obj1 = {
          EnterpriseID: app.config.EnterpriseID,
          OpenId: wx.getStorageSync("OpenID"),
          sorted: this.data.sorted,
          Code: this.data.ShippingAddress.Code
        }

        try {
          const CheckLogisticsMatchProduct = await OrderAndPayLogic.CheckLogisticsMatchProduct(obj1)
          let orderParam = {
            LogisticsFee: CheckLogisticsMatchProduct.ResultValue
          }
          this.orderParam(orderParam)

        } catch (e) {
          console.log(e)
          wx.showModal({
            title: '提示',
            content: e.data.ResultValue,
            cancelText: '重选商品',
            confirmText: '切换地址',
            success: (res) => {
              if (res.confirm) {

              } else if (res.cancel) {
                wx.navigateBack()
              }

            }
          })

          return false
        }
      }
    } else { //自提
      this.setData({
        LogisticsFee: 0
      })

    }
    this.integralSum()
    return true





  },
  // 选择收货地址
  onGetAdd() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressList/index',
    })
  },
  //自提
  onMyGo(e) {
    let value = e.detail.value
    let orderCheck = preOrder.orderCostParam.orderCheck
    orderCheck.pickUp = value

    let orderParam = {
      orderCheck: orderCheck
    }
    this.orderParam(orderParam)
    this.initAllData()

  },
  // 选择自提地址
  onMyGoAdd(e) {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/subCompanyList/index',
    })
  },
  inputRemark(e) {
    let value = e.detail.value;
    this.setData({
      Remark: value
    })

  },
  // 选择优惠券
  onCoupon(e) {
    let data = this.data.getAllUseCouponByProduct
    if (data.Data.length > 0) {
      this.setData({
        showCoupon: true
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '暂无优惠券',
        showCancel: false
      })
    }

  },
  //取消弹框
  onPopupBack() {
    this.setData({
      showCoupon: false
    })
  },
  // 弹框确定选中
  async onCouponAdd(event) {
    let couponData = event.detail.couponData
    let CouponPrice = 0;
    couponData.forEach(i => {
      CouponPrice += i.ReductionAmount
    })

    this.setData({
      OrderCouponListModel: couponData,
      showCoupon: false
    })
    let orderParam = {
      CouponPrice
    }
    this.orderParam(orderParam)
    this.integralSum()

  },
  //选中使用积分
  async onIntegral(e) {
    let checked = e.detail.checked;
    let orderCheck = preOrder.orderCostParam.orderCheck
    orderCheck.integral = checked

    let orderParam = {
      orderCheck
    }
    this.orderParam(orderParam)
    this.integralSum()
  },
  //积分及其他计算
  async integralSum(e) {

    let money = preOrder.orderFee.OrderPrice - preOrder.orderCostParam.CouponPrice
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      money: money.toFixed(2),
      UseIntegral: preOrder.orderCostParam.orderCheck.integral
    }
    wx.showLoading({
      title: '处理中～',
      mask: true
    })
    const GeneratePayablePrice = await OrderAndPayLogic.GeneratePayablePrice(obj)
    let orderParam = {
      "Integral": GeneratePayablePrice.ResultValue.Integral,
      "IntegralPrice": GeneratePayablePrice.ResultValue.IntegraPrice,
      "GetIntegral": GeneratePayablePrice.ResultValue.GetIntegral,
    }

    this.orderParam(orderParam)
  },
  // 提交订单
  async onNextTap() {

    let jiage = await this.checkProductPriceAndStockModel()
    if (!jiage) {
      return
    }
    let wuliu = await this.initAllData()
    console.log('物流验证',wuliu)
    if (!wuliu) {
      wx.showModal({
        title: '提示',
        content: '请选择联系人信息',
      })
      return
    }
    let ShippingAddress = this.data.ShippingAddress

    let RealName;
    let TelPhone;
    let SubCompanyID;
    let PickUpAddress;
    let Address;
    if (!preOrder.orderCostParam.orderCheck.pickUp) {

      if (!ShippingAddress) {
        wx.showModal({
          title: '提示',
          content: '请选择联系人信息',
        })
        return
      }
      RealName = ShippingAddress.RealName
      TelPhone = ShippingAddress.TelPhone
      SubCompanyID = 0
      PickUpAddress = null
      Address = ShippingAddress.Province + ShippingAddress.City + ShippingAddress.Area + ShippingAddress.Street
    } else {
      let subCompanyItem = this.data.subCompanyItem
      if (!subCompanyItem) {
        wx.showModal({
          title: '提示',
          content: '请选择联系人信息',
        })
        return
      }
      RealName = this.data.ContactName
      TelPhone = this.data.ContactNumber
      SubCompanyID = subCompanyItem.ID
      PickUpAddress = subCompanyItem.Address
      Address = subCompanyItem.Address
    }

    let pickUp = preOrder.orderCostParam.orderCheck.pickUp
    let integral = preOrder.orderCostParam.orderCheck.integral
    wx.showLoading({
      title: '处理中～',
      mask: true
    })

    let ProductModel = this.data.ProductModel
    let ProductlListModel = ProductModel.ProductlListModel;
    let OrderDetailListModel = [];
    ProductlListModel.forEach(i => {

      let item = {
        "ProductId": i.ProductID,
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
    let OrderCouponList = this.data.OrderCouponListModel
    let OrderCouponListModel = [];
    if (OrderCouponList) {
      OrderCouponList.forEach(i => {
        let item = {
          "CouponId": i.CouponId,
          "CustomerCouponID": i.ID
        }
        OrderCouponListModel.push(item)
      })
    }
    let ShoppingCarDetailList = [];
    if (this.data.pagePath == 'cart') {
      ProductlListModel.forEach(i => {
        ShoppingCarDetailList.push(i.ID)
      })
    }


    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      ProductCount: ProductModel.ProductCount, //商品数量
      RealName,
      TelPhone,
      Address,
      OrderPrice: preOrder.OrderPrice,
      PayPrice: preOrder.PayPrice,
      Integra: integral ? preOrder.orderCostParam.Integral : 0,
      GetIntegra: integral ? preOrder.orderCostParam.GetIntegral : 0,
      SubCompanyID,
      PickUpAddress,
      IntegraPrice: integral ? preOrder.IntegralPrice : 0,
      LogisticsFee: preOrder.LogisticsFee,
      Remark: this.data.Remark,
      Phone: wx.getStorageSync('phoneNumber'),
      DeliveryModel: pickUp ? 2 : 1, //配送方式（1：物流；2：自提；）
      OrderDetailListModel,
      OrderCouponListModel,
      ShoppingCarDetailList,

    }

    const order = await Order.Add(obj)

    if (order && order.Success) {
      wx.redirectTo({
        url: '/pages/subpackages/mall/product/orderList/index',
      })
    }


  }
})