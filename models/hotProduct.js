
import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";


class HotProduct{

  /**热门产品接口 */

  //查询
  static Search({EnterpriseID, ProductCode='', ProductName='', Limit=10, Page=1}) {
    return Http.request({
      url: "api/V1/HotProduct/PageSearchWX",
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,
        Limit,
        Page
      }
    })
  }
 //分页查询
  static PageSearch({EnterpriseID, ProductCode, ProductName, Limit, Page}) {
    return new Paging({
      url: "api/V1/HotProduct/PageSearchWX",
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
      url: "api/V1/HotProduct/SearchModelDetails",
      data: {
        ID
      }
    })
  }
  // 查询产品轮播图列表
  static SearchRotationChart(ProductCode) {
    return Http.request({
      url: "api/V1/HotProduct/SearchRotationChartWX",
      data: {
        ProductCode
      }
    })
  }

}
export{
  HotProduct
}
