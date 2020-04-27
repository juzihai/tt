import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class OrderAndPayLogic extends Http {

  /**订单和支付相关 */
  //1.校验积分抵扣
  static CheckIntegralDeduction({ OrderNumber, OpenID, DeductionIntegral, DeductionPrice, CreationTime}) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/CheckIntegralDeduction",
      data: {
        OrderNumber,
        OpenID,
        DeductionIntegral,
        DeductionPrice,
        CreationTime
      }
    })
  }
  //2.校验优惠券抵扣
  static CheckCouponDeduction({ OrderNumber, CustomerCouponID, CouponID, CreationTime}) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/CheckCouponDeduction",
      data: {
        OrderNumber,
        CustomerCouponID,
        CouponID,
        CreationTime
      }
    })
  }
  //3.校验产品库存和价格
  static CheckProductPriceAndStock({ OrderNumber, ProductType, ProductID, CountPrice, Price, Count, CreationTime }) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/CheckProductPriceAndStock",
      data: {
        OrderNumber,
        ProductType,
        ProductID,
        CountPrice,
        Price,
        Count,
        CreationTime
      }
    })
  }
  //4. 积分、优惠券、库存数据补偿
  static DataCompensation({ OrderNumber, CreationTime }) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/DataCompensation",
      data: {
        OrderNumber,
        CreationTime
      }
    })
  }
  //5.获取产品信息

  static CheckProduct({ EnterpriseID, ListProductID, ListHotProductID}) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/CheckProduct",
      data: {
        EnterpriseID,
        ListProductID,
        ListHotProductID
      }
    })
  }

  //6. 校验店铺是否开通支付，是否支付物流，是否支持自提
  static GetPayAndLogisticsState({ EnterpriseID}) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/GetPayAndLogisticsState",
      data: {
        EnterpriseID
      }
    })
  }
  //7.校验积分抵扣
  static GeneratePayablePrice({ EnterpriseID, OpenId, money}) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/GeneratePayablePrice",
      data: {
        EnterpriseID,
        OpenId,
        money
      }
    })
  }
  //8.获取所有产品可用的优惠券
  static GetAllUseCouponByProduct({ EnterpriseID, OpenId, sorted }) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/GetAllUseCouponByProduct",
      data: {
        EnterpriseID,
        OpenId,
        sorted
      }
    })
  }
  //9.产品价格和库存校验 并返回总价 （小程序）
  static CheckProductPriceAndStockModel({ Date }) {
    return Http.request({
      url: "api/V1/OrderAndPayLogic/CheckProductPriceAndStockModel",
      data: {
        Date
      }
    })
  }

}

export {
  OrderAndPayLogic
}