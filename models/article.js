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
  static UpdateReadAmount({ ID, ReadPerson, ReadTime}) {
    return Http.request({
      url: "api/V1/Article/UpdateReadAmount",
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

}

export {
  Article
}