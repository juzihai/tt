import { Http } from "../utils/http-a";
/**企业 */
class IntegralRule extends Http {


  //查询企业详情
  static SearchModelDetails({ EnterpriseID }) {
    return Http.request({
      url: "api/V1/IntegralRule/SearchModelDetailsWX",
      data: {
        EnterpriseID
      }
    })
  }

}
export {
  IntegralRule
}