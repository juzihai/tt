const app = getApp();
import {
  Order
} from "../../../../../models/order.js";
import {
  OrderAndPayLogic
} from "../../../../../models/orderAndPayLogic.js";

import {
  getWindowHeightRpx
} from "../../../../../utils/system";


Page({
  data: {
    showRealm: false,
    showCoupon: false,
    // 原始价格
    ProductModel: {
      ProductCount: 0, //商品总数
      ProductPrice: 0, //原订单价格
      ProductlListModel: null,
    },
    //处理后的价格
    OrderPrice: 0, //订单价格
    PayPrice: 0, //实际付款价格
    Integral: 0, //使用积分
    GetIntegral: 0, //生成的积分数量
    IntegralPrice: 0, //积分抵扣价格
    CouponPrice: 0, //优惠券抵扣价格
    LogisticsFee: 0, //运费金额
    Remark: null, //备注
    DeliveryModel: 1, //配送方式
    OrderCouponListModel: null,
    Integralchecked: false, //使用积分
    SubCompanyID: null, //自提时传递的参数
    ContactName: null, //联系人姓名
    ContactNumber: null, //联系人手机号
    subCompanyItem: null //店铺信息
  },

  onLoad: async function(options) {
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    let pagePath = options.pagePath;
    console.log(options)
    let ProductModel = JSON.parse(options.ProductModel)
    const sorted = this.groupBy(ProductModel.ProductlListModel, function(item) {
      return [item.ClassID];
    })
    this.setData({
      pagePath,
      sorted, //展示商品
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
    let DeliveryModel = 1;
    if (payState) {
      if (payState.Logistics) {
        DeliveryModel = 1
      } else if (payState.PickUp) {
        DeliveryModel = 2
      }
    }
    // 2、产品价格和库存校验 并返回总价



    this.setData({
      h,
      ProductModel, //原商品数据

      payState: payState.ResultValue, //可支付状态
      DeliveryModel, //取货方式
      getAllUseCouponByProduct: getAllUseCouponByProduct.ResultValue //优惠券

    })
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
    try {
      const checkProductPriceAndStockModel = await OrderAndPayLogic.CheckProductPriceAndStockModel({
        Date
      })
      let price = Number(checkProductPriceAndStockModel.ResultValue.toFixed(2))
      ProductModel.ProductPrice = price;
      this.setData({
        ProductModel
      })
      this.integralSum()
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
      this.integralSum()
      return false
    }
    return true
  },
  async initAllData() {

    let DeliveryModel = this.data.DeliveryModel

    //查询邮费信息
    if (this.data.ShippingAddress && this.data.sorted) {
      let obj1 = {
        EnterpriseID: app.config.EnterpriseID,
        OpenId: wx.getStorageSync("OpenID"),
        sorted: this.data.sorted,
        Code: this.data.ShippingAddress.Code
      }
      if (DeliveryModel == 1) { //快递
        try {
          const CheckLogisticsMatchProduct = await OrderAndPayLogic.CheckLogisticsMatchProduct(obj1)
          this.setData({
            LogisticsFee: CheckLogisticsMatchProduct.ResultValue
          })
          this.integralSum()
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
          this.integralSum()
          return false
        }
      } else { //自提
        this.setData({
          LogisticsFee: 0
        })
        this.integralSum()
      }

      return true

    }



  },
  /**  计算总金额 及商品数量*/
  sum: function() {
    let ProductPrice = this.data.ProductModel.ProductPrice; //原订单价格
    let LogisticsFee = this.data.LogisticsFee; //运费金额
    let IntegralPrice = this.data.IntegralPrice; //积分
    let CouponPrice = this.data.CouponPrice; //优惠券
    let OrderPrice = Number(ProductPrice) + Number(LogisticsFee);
    let PayPrice = Number(ProductPrice) + Number(LogisticsFee) - Number(IntegralPrice) - Number(CouponPrice);
    this.setData({
      OrderPrice: OrderPrice.toFixed(2), //保留小数点后两位 //订单价格
      PayPrice: PayPrice.toFixed(2), //实付
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


  // 选择收货地址
  onGetAdd() {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressList/index',
    })
  },
  //自提
  onMyGo(e) {
    let value = e.detail.value
    this.setData({
      DeliveryModel: value ? 2 : 1
    })
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
  // 选择配送方式
  onDistribution(e) {
    this.setData({
      showRealm: true
    })
  },
  onCoupon(e) {
    this.setData({
      showCoupon: true
    })
  },
  //取消弹框
  onPopupBack() {
    this.setData({
      showRealm: false,
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
      CouponPrice,
      showCoupon: false
    })
    this.integralSum()
  },
  //选中使用积分
  async onIntegral(e) {
    let checked = e.detail.checked;
    this.setData({
      Integralchecked: checked
    })
    this.integralSum()
  },
  //积分及其他计算
  async integralSum(e) {
    let checked = this.data.Integralchecked;　
    let OrderPrice = this.data.OrderPrice;
    let CouponPrice = this.data.CouponPrice;
    let money = OrderPrice - CouponPrice
    if (checked) {
      let obj = {
        EnterpriseID: app.config.EnterpriseID,
        OpenId: wx.getStorageSync("OpenID"),
        money: money.toFixed(2)
      }
      const GeneratePayablePrice = await OrderAndPayLogic.GeneratePayablePrice(obj)
      this.setData({
        "Integral": GeneratePayablePrice.ResultValue.Integral,
        "IntegralPrice": GeneratePayablePrice.ResultValue.IntegraPrice,
        "GetIntegral": GeneratePayablePrice.ResultValue.GetIntegral,
      })
    } else {
      this.setData({
        "Integral": 0,
        "IntegralPrice": 0,
        "GetIntegral": 0,
      })
    }
    this.sum()
  },
  // 提交订单
  async onNextTap() {
    let ShippingAddress = this.data.ShippingAddress
    if (!ShippingAddress) {
      wx.showToast({
        title: '请选择联系人地址',
        icon: "none"
      })
      return
    }
    let jiage = await this.checkProductPriceAndStockModel()
    if (!jiage) {
      return
    }
    let wuliu = await this.initAllData()
    if (!wuliu) {
      return
    }
    wx.lin.showToast({
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
    let RealName;
    let TelPhone;
    let SubCompanyID;
    let PickUpAddress;
    if (this.data.DeliveryModel == 1) {
      RealName = ShippingAddress.RealName
      TelPhone = ShippingAddress.TelPhone
      SubCompanyID = 0
      PickUpAddress = null
    } else {
      let subCompanyItem = this.data.subCompanyItem
      if (!subCompanyItem) {
        wx.lin.showToast({
          title: '请选择取货地址',
          mask: true
        })
        return
      }
      RealName = this.data.ContactName
      TelPhone = this.data.ContactNumber
      SubCompanyID = subCompanyItem.ID
      PickUpAddress = subCompanyItem.Address
    }


    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenId: wx.getStorageSync("OpenID"),
      ProductCount: ProductModel.ProductCount, //商品数量
      RealName,
      TelPhone,
      Address: ShippingAddress.Province + ShippingAddress.City + ShippingAddress.Area + ShippingAddress.Street,
      OrderPrice: this.data.OrderPrice,
      PayPrice: this.data.PayPrice,
      Integra: this.data.Integral,
      GetIntegra: this.data.GetIntegral,
      SubCompanyID,
      PickUpAddress,
      IntegraPrice: this.data.IntegralPrice,
      LogisticsFee: this.data.LogisticsFee,
      Remark: this.data.Remark,
      Phone: wx.getStorageSync('phoneNumber'),
      DeliveryModel: this.data.DeliveryModel, //配送方式（1：物流；2：自提；）
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
    setTimeout(function() {

      wx.lin.hideToast()
    }, 500);


  }

})