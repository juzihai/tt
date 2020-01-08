import {
  Http
} from '../utils/http.js'

class ProductModel extends Http {

  /**产品种类接口 */

  getProductClass(EnterpriseID, ClassName, Page, Limit) {
    return this.request({
      url: "api/V1/ProductClass/PageSearch",
      data: {
        EnterpriseID,
        ClassName,
        Page,
        Limit,
      }
    })
  }

  /**产品接口 */
  //查询企业下所有产品
  getProductPageSearch(EnterpriseID, ProductCode, ProductName, Page, Limit) {
    return this.request({
      url: "api/V1/Product/PageSearch",
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
        Page,
        Limit,
      }
    })
  }
  //查询产品详情
  getProductSearchModelDetails(ID) {
    return this.request({
      url: "api/V1/Product/SearchModelDetails",
      data: {
        ID
      }
    })
  }
  // 查询产品轮播图列表
  getProductSearchRotationChart(ProductCode) {
    return this.request({
      url: "api/V1/Product/SearchRotationChart",
      data: {
        ProductCode
      }
    })
  }
  /**热门产品接口 */
  getHotProduct(EnterpriseID, ProductCode, ProductName, Page, Limit) {
    return this.request({
      url: "api/V1/Product/PageSearch",
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
        Page,
        Limit,
      }
    })
  }

  //其他


}

export {
  ProductModel
}