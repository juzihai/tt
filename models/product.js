import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class Product extends Http {

  /**产品接口 */
  //查询企业下所有产品
  static PageSearch({ EnterpriseID, ProductCode, ProductName, Page, Limit }) {
    return new Paging({
      url: `api/V1/Product/PageSearch`,
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
      }
    }, Limit, Page)
  }

  //查询产品详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/Product/SearchModelDetails",
      data: {
        ID
      }
    })
  }
  // 查询产品轮播图列表
  static SearchRotationChart(ProductCode) {
    return Http.request({
      url: "api/V1/Product/SearchRotationChart",
      data: {
        ProductCode
      }
    })
  }
  //其他


}

export {
  Product
}