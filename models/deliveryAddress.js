import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**收货地址相关接口 */
class ShoppingCart extends Http {

  // 1. 单条新增收货地址
  static Add({ EnterpriseId, CustomerId, RealName, TelPhone, TelPhone2, Country }) {
    return Http.request({
      url: "api/V1/ShoppingCart/Add",
      data: {
        EnterpriseId,
        CustomerId,
        RealName,
        TelPhone,
        TelPhone2,
        Country
      }
    })
  }
  // 2. 清空购物车
  static Remove({ ID }) {
    return Http.request({
      url: "api/V1/ShoppingCart/Remove",
      data: {
        ID
      }
    })
  }

  //3. 查询
  static Query({ EnterpriseID, OpenId, Page, Limit }) {
    return new Paging({
      url: "api/V1/ShoppingCart/Query",
      data: {
        EnterpriseID,
        OpenId
      }
    }, Page, Limit)
  }

  // 4.删除购物车商品接口
  static RemoveProduct({ Ids }) {
    return Http.request({
      url: "api/V1/ShoppingCart/RemoveProduct",
      data: {
        Ids
      }
    })
  }

}

export {
  ShoppingCart
}