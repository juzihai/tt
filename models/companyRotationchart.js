import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class CompanyRotationchart extends Http {


  static Search({EnterpriseID,Title, Page = 1, Limit = 10}) {
    return Http.request({
      url: "api/V1/CompanyRotationchart/PageSearch",
      data: {
        EnterpriseID,
        Title,
        Page,
        Limit
      }
    })
  }

  //查询产品详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/CompanyRotationchart/SearchModelDetails",
      data: {
        ID
      }
    })
  }

}
export{
  CompanyRotationchart
}