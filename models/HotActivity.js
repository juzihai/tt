import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

class HotActivity extends Http {

  /**热门活动接口 */
  static Search(EnterpriseID, ActivityName = '', Limit = 10, Page = 1) {
    return Http.request({
      url: "api/V1/HotActivity/PageSearch",
      data: {
        EnterpriseID,
        ActivityName,
        Limit,
        Page
      }
    })
  }

  static PageSearch({ EnterpriseID, ActivityName, Limit, Page }) {
    return new Paging({
      url: "api/V1/HotActivity/PageSearch",
      data: {
        EnterpriseID,
        ActivityName
      }
    }, Limit, Page)
  }


}

export {
  HotActivity
}