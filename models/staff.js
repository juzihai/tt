import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**员工staff接口 */
class Staff extends Http {
  //4. 查询
  static PageSearch({ EnterpriseID, StaffCode, StaffName, Page, Limit }) {
  return new Paging({
    url: "api/V1/Staff/PageSearch",
    data: {
      EnterpriseID,
      StaffCode,
      StaffName
    }
  }, Page, Limit)
}

  //7. 查询详情
  static SearchModelDetails(ID) {
  return Http.request({
    url: "api/V1/Staff/SearchModelDetails",
    data: {
      ID
    }
  })
 }

}

export {
  Staff
}