import { Http } from "../utils/http-a";
/**企业 */
class Company extends Http {


  //查询企业详情
  static SearchModelDetails(EnterpriseID) {
    return Http.request({
      url: "api/V1/Company/SearchModelDetailsWX",
      // url: "api/V1/Company/QueryDetail",//新版查询详情
      data: {
        EnterpriseID
      }
    })
  }

  //小程序用户使用协议
  static SearchModelAgreement({ EnterpriseID }) {
    return Http.request({
      url: "api/V1/Company/SearchModelAgreementWX",
      data: {
        EnterpriseID
      }
    })
  }


}
export {
  Company
}