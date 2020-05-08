import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";
/**自提店铺列表 */
class SubCompany extends Http {

  static PageSearch({ EnterpriseID, CompanyName, Page, Limit }) {
    return new Paging({
      url: "api/V1/SubCompany/PageSearchWX",
      data: {
        EnterpriseID,
        CompanyName
      }
    }, Page, Limit)
  }


  //查询店铺详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/SubCompany/SearchModelDetailsWX",
      data: {
        ID
      }
    })
  }

}
export {
  SubCompany
}