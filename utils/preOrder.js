class PreOrder {
  constructor() {

  }
  orderCostParam = {

    ProductCount: 0, //商品总数 
    ProductPrice: 0, //原订单价格 

    LogisticsFee: 0, //运费金额

    Integral: 0, //使用积分 
    GetIntegral: 0, //生成的积分数量 
    IntegralPrice: 0, //积分抵扣价格 
    CouponPrice: 0, //优惠券抵扣价格 

    orderCheck: {
      pickUp: false, //自提 
      integral: false, //使用积分 
    }
  }
  orderFee = {
    OrderPrice: 0, //订单价格 
    PayPrice: 0, //实际付款价格 
  }


  set orderParam(parameter) {
    //赋值 
    for (let key in parameter) {
      if (parameter[key] !== undefined) {
        this.orderCostParam[key] = parameter[key]
      }
    }

    this.orderFee.OrderPrice = this.OrderPrice
    this.orderFee.PayPrice = this.PayPrice
  }
  //运费价格
  get LogisticsFee() {
    //自提
    if (this.orderCostParam.orderCheck.pickUp) {
      return 0;
    }
    return Number(this.orderCostParam.LogisticsFee);
  }
  //订单总价
  get OrderPrice() {
    let ProductPrice = Number(this.orderCostParam.ProductPrice)
    let num = ProductPrice + this.LogisticsFee
    return num.toFixed(2);
  }
  //优惠券抵扣价
  get CouponPrice() {

    return Number(this.orderCostParam.CouponPrice);
  }
  //积分抵扣价
  get IntegralPrice() {
    //不使用积分
    if (!this.orderCostParam.orderCheck.integral) {
      return 0;
    }
    return Number(this.orderCostParam.IntegralPrice);
  }
  //实付价格
  get PayPrice() {
    let num = this.OrderPrice - this.CouponPrice - this.IntegralPrice
    return num.toFixed(2);
  }
}

export {
  PreOrder
};