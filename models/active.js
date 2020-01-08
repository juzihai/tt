import {
  Http
} from '../utils/http.js'

class ActiveModel extends Http {

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
  ActiveModel
}