import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class FinanceProduct extends Http {

  /**金融产品接口 */
  //4. 查询所有金融产品
  static PageSearch({ EnterpriseID, Title, Limit, Page }) {
    return new Paging({
      url: "api/V1/FinanceProduct/PageSearchWX",
      data: {
        EnterpriseID,
        Title
      }
    }, Page,Limit)
  }
  //6. 修改阅读量
  static UpdateReadAmount({ ID, ReadPerson, ReadTime }) {
    return Http.request({
      url: "api/V1/FinanceProduct/UpdateReadAmount",
      data: {
        ID,
        ReadPerson,
        ReadTime
      }
    })
  }
  //7. 查询文章详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/FinanceProduct/SearchModelDetails",
      data: {
        ID
      }
    })
  }

}

export {
  FinanceProduct
}