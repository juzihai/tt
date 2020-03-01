import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**首页功能模块 接口 */
class ArticleModule extends Http {

  //查询
  static Search({ EnterpriseID, TypeName, Page = 1, Limit = 10 }) {
    return Http.request({
      url: "api/V1/ArticleModule/PageSearchWX",
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
      url: "api/V1/ArticleModule/PageSearchWX",
      data: {
        EnterpriseID,
        TypeName
      }
    }, Page, Limit)
  }

}

export {
  ArticleModule
}