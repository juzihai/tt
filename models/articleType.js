import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**文章接口 */
class ArticleType extends Http {

  //查询
  static Search({EnterpriseID,TypeName, Page=1, Limit=10 }) {
    return Http.request({
      url: "api/V1/ArticleType/PageSearchWX",
      data: {
        EnterpriseID,
        TypeName,
        Page,
        Limit
      }
    })
  }

  static PageSearch({ EnterpriseID, TypeName, Page, Limit }) {
    return new Paging({
      url: "api/V1/ArticleType/PageSearchWX",
      data: {
        EnterpriseID,
        TypeName
      }
    }, Page, Limit)
  }

  //查询产品详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/ArticleType/SearchModelDetails",
      data: {
        ID
      }
    })
  }
}

export {
  ArticleType
}