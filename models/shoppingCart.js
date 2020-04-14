import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**购物车相关接口 */
class ShoppingCart extends Http {

  // 1. 购物车添加接口
  static Add({ OpenId, EnterpriseId, ProductId, ProductNum, ProductType }) {
    return Http.request({
      url: "api/V1/ShoppingCart/Add",
      data: {
        OpenId,
        EnterpriseId,
        ProductId,
        ProductNum,
        ProductType
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