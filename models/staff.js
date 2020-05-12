import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**员工staff接口 */
class Staff extends Http {
  //4. 查询全部
  static PageSearch({ EnterpriseID, StaffCode, StaffName, IsService, IsModule, Page, Limit }) {
  return new Paging({
    url: "api/V1/Staff/PageSearchWX",
    data: {
      EnterpriseID,
      StaffCode,
      StaffName,
      IsService,
      IsModule
    }
  }, Page, Limit)
}
  //4. 个人中心里联系我们的员工接口
  static StaffServicePageSearch({ EnterpriseID, StaffCode, StaffName, IsService, IsModule, Page, Limit }) {
    return new Paging({
      url: "api/V1/StaffService/PageSearchWX",
      data: {
        EnterpriseID,
        StaffCode,
        StaffName,
        IsService,
        IsModule
      }
    }, Page, Limit)
  }
  //4. 首页员工模块里面的员工列表
  static StaffModulePageSearch({ EnterpriseID, StaffCode, StaffName, IsService, IsModule, Page, Limit }) {
    return new Paging({
      url: "api/V1/StaffModule/PageSearchWX",
      data: {
        EnterpriseID,
        StaffCode,
        StaffName,
        IsService,
        IsModule
      }
    }, Page, Limit)
  }
  //4. 普通文章中的员工列表
  static PageSearchStaff({ EnterpriseID, StaffCode, StaffName, IsService, IsModule, ClassID,Page, Limit }) {
    return new Paging({
      url: "api/V1/ArticleType//PageSearchStaff",
      data: {
        EnterpriseID,
        StaffCode,
        StaffName,
        IsService,
        IsModule,
        ClassID
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