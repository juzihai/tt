import {
  Http
} from '../utils/http.js'

class ActiveModel extends Http {

  //产品查询
  search(EnterpriseID, ActivityName, Page, Limit) {
    return this.request({
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