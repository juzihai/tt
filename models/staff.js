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
  //11. 查询某产品或文章和员工是否存在绑定关系，并返回员工数据
  static GetStaffRelation({ID, EnterpriseID, OpenID, Type}) {
    return Http.request({
      url: "api/V1/Staff/GetStaffRelation",
      data: {
        ID,
        EnterpriseID,
        OpenID,
        Type
      }
    })
  }
  //12. 查询某产品的所有绑定员工数据
  static GetStaffRelationList({ ID, EnterpriseID, Type, Page, Limit }) {
    return new Paging({
      url: "api/V1/Staff/GetStaffRelationList",
      data: {
        EnterpriseID,
        ID,
        Type
      }
    }, Page, Limit)
  }
}

export {
  Staff
}