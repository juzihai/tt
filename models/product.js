import {
  Http
} from '../utils/http.js'

class ProductModel extends Http {

  //产品查询
  search(EnterpriseID, ProductCode, ProductName, Page , Limit ) {
    return this.request({
      url: "api/V1/Product/PageSearch",
      data: {
        EnterpriseID: EnterpriseID,
        ProductCode: ProductCode,
        ProductName: ProductName,
        Page: Page,
        Limit: Limit,
      }
    })
  }

  //其他


}

export {
  ProductModel
}