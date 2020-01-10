import {
  Http
} from '../utils/http.js'

class HotActivityModel extends Http {

  //查询
  PageSearch(EnterpriseID, ActivityName, Page, Limit) {
    return Http.request({
      url: "api/V1/HotActivity/PageSearch",
      data: {
        EnterpriseID,
        ActivityName,
        Page,
        Limit,
      }
    })
  }

  //其他


}

export {
  HotActivityModel
}