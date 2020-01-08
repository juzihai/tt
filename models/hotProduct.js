import { Http } from "../utils/http-p";
import { Paging } from "../utils/paging";


class HotProduct{

  /**热门产品接口 */
  static getHotProduct(EnterpriseID, ProductCode, ProductName, Limit = 10, Page= 0) {
    return new Paging({
      url: "api/V1/Product/PageSearch",
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
        Page,
        Limit,
      }
    }, Limit, Page)
  }


}
export{
  HotProduct
}