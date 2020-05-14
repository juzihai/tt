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


  /**产品种类查询所有接口 */
  static ProductClassModuleRelationSearch({ EnterpriseID, ClassName = '', Limit = 999, Page = 1 }) {
    return Http.request({
      url: "api/V1/ProductClassModuleRelation/PageSearchWX",
      data: {
        EnterpriseID,
        ClassName,
        Limit,
        Page
      }
    })
  }



}
export {
  ProductClass
}