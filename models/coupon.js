import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**优惠券相关接口 */
class Coupon extends Http {

  //查询所有优惠券
  static PageSearch({ EnterpriseID, ProductClassID, CouponType, Name, OpenID,Page, Limit }) {
    return new Paging({
      url: "api/V1/Coupon/PageSearchWX",
      data: {
        EnterpriseID,
        ProductClassID,
        CouponType,
        Name,
        OpenID
      }
    }, Page, Limit)
  }

  //查询我的所有领取的优惠券
  static CustomerCouponPageSearch({ EnterpriseID, OpenID, IsUse, IsValidity, Page, Limit }) {
    return new Paging({
      url: "api/V1/CustomerCoupon/PageSearchWX",
      data: {
        EnterpriseID,
        OpenID,
        IsUse,
        IsValidity,
      }
    }, Page, Limit)
  }

  //（小程序）领取优惠券
  static ReceiveCoupon({ EnterpriseID, OpenID, CustomerID, ID}) {
    return Http.request({
      url: "api/V1/CustomerCoupon/ReceiveCoupon",
      data: {
        EnterpriseID,
        OpenID,
        CustomerID,
        ID
      }
    })
  }


}

export {
  Coupon
}