import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class Product extends Http {

  /**产品接口 */
  //4. 查询企业下所有产品
  static PageSearch({ EnterpriseID, ProductCode, ProductName, ClassID, Page, Limit }) {
    return new Paging({
      url: `api/V1/Product/PageSearchWX`,
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
        ClassID,
        ClassID
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
      url: "api/V1/Product/SearchRotationChartWX",
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