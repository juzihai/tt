import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**优惠券相关接口 */
class Coupon extends Http {

  //4. 查询
  static PageSearch({ EnterpriseID, ProductClassID, CouponType, Name, Page, Limit }) {
    return new Paging({
      url: "api/V1/Coupon/PageSearchWX",
      data: {
        EnterpriseID,
        ProductClassID,
        CouponType,
        Name,
      }
    }, Page, Limit)
  }
  //7. 查询文章详情
  // static SearchModelDetails(ID) {
  //   return Http.request({
  //     url: "api/V1/Article/SearchModelDetailsWX",
  //     data: {
  //       ID
  //     }
  //   })
  // }


}

export {
  Coupon
}