import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**文章接口 */
class Article extends Http {

  //4. 查询
  static PageSearch({ EnterpriseID, ArticleType, Title, Page, Limit, TerminalType }) {
    return new Paging({
      url: "api/V1/Article/PageSearchWX",
      data: {
        EnterpriseID,
        ArticleType,
        Title
      }
    }, Page, Limit, TerminalType)
  }
  //6. 修改阅读量
  static UpdateReadAmount({ ID, ReadPerson, FromPerson, EnterpriseID, GUID}) {
    return Http.request({
      url: "api/V1/Article/UpdateReadAmount",
      data: {
        ID,
        ReadPerson,
        FromPerson,
        EnterpriseID,
        GUID
      }
    })
  }
  //7. 查询文章详情
  static SearchModelDetails(ID) {
    return Http.request({
      url: "api/V1/Article/SearchModelDetailsWX",
      data: {
        ID
      }
    })
  }
  //9. 查询置顶文章类型的内容列表
  static GetTopArticle({ EnterpriseID, Page = 1, Limit = 10, TerminalType }) {
    return Http.request({
      url: "api/V1/Article/GetTopArticle",
      data: {
        EnterpriseID,
        Page,
        Limit
      },
      TerminalType
    })
  }

  //11.记录分享数据
  static ArticleShareRecord({ EnterpriseID, GUID, OpenID, ArticleID }) {
    return Http.request({
      url: "api/V1/Article/ArticleShareRecord",
      data: {
        EnterpriseID,
        GUID,
        OpenID,
        ArticleID
      }
    })
  }

}

export {
  Article
}