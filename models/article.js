import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**文章接口 */
class Article extends Http {

  //查询
  static PageSearch({ EnterpriseID, ArticleType, Title, Page, Limit }) {
    return new Paging({
      url: "api/V1/Article/PageSearchWX",
      data: {
        EnterpriseID,
        ArticleType,
        Title
      }
    }, Page, Limit)
  }

  //查询产品详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/Article/SearchModelDetails",
      data: {
        ID
      }
    })
  }
}

export {
  Article
}