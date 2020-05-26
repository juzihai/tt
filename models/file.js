import { Http } from "../utils/http-a";
/**企业 */
class File extends Http {


  //1. 根据二维码的Scen值（渠道编码）查询详细信息
  static SearchModelDetails({ ChannleCode }) {
    return Http.request({
      url: "api/V1/ChannleJson/SearchModelDetails",
      data: {
        ChannleCode
      }
    })
  }

  //1.用户扫描二维码后提交数据（若发正式版无需接收返回值）
  static SaveChannleByPCQRCode({ EnterpriseID, OpenID, ChannleCode, ChannleName }) {
    return Http.request({
      url: "api/V1/Sustomers/SaveChannleByPCQRCode",
      data: {
        EnterpriseID,
        OpenID,
        ChannleCode,
        ChannleName
      }
    })
  }

  //3. 生成二维码（前后台通用）
  static getQRcode({ EnterpriseID, ChannelCode, ChannelName, type }) {
    return Http.request({
      url: "api/V1/File/getQRcode",
      data: {
        EnterpriseID,
        ChannelCode,
        ChannelName,
        type
      }
    })
  }

}
export {
  File
}