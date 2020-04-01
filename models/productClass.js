import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";


class ProductClass {

  /**产品种类接口 */
  static Search({EnterpriseID, ClassName='', Limit=10, Page=1}) {
    return Http.request({
      url: "api/V1/ProductClass/PageSearchWX",
      data: {
        EnterpriseID,
        ClassName,
        Limit,
        Page
      }
    })
  }

  static PageSearch({EnterpriseID, ClassName, Limit , Page }) {
    return new Paging({
      url: "api/V1/ProductClass/PageSearchWX",
      data: {
        EnterpriseID,
        ClassName
      }
    }, Page, Limit,)
  }


}
export {
  ProductClass
}