import { promisic } from "../utils/util";
import { Http } from "../utils/http-a";

/**客户接口 */
class Customers{

  static async Login(){
    const res = await promisic(wx.login)({

    })
    return res.code
  }

// 1. 小程序登录用Code获取openID和key
  static GetWeChatOpenIDAndKey(EnterpriseID, Code) {
    return Http.request({
      url: "api/V1/Customers/GetWeChatOpenIDAndKey",
      data: {
        EnterpriseID,
        Code
      }
    })
  }

  // 2. 获取用户信息（WechatUserInfo）
  static GetWeChatUserInfo({SessionKey, EncryptedData, IV}) {
    return Http.request({
      url: "api/V1/Customers/GetWeChatUserInfo",
      data: {
        SessionKey,
        EncryptedData,
        IV
      }
    })
  }
  // 3. 注册用户
  static RegisterCustomers({Unionid, OpenID, Phone, Name}) {
    return Http.request({
      url: "api/V1/Customers/RegisterCustomers",
      data: {
        Unionid,
        OpenID,
        Phone,
        Name
      }
    })
  }

  // 4. 客户分享
  static MyCustomersSave({ EnterpriseID, OpenIDOne, OpenIDTwo }) {
    return Http.request({
      url: "api/V1/Customers/MyCustomersSave",
      data: {
        EnterpriseID,
        OpenIDOne,
        OpenIDTwo
      }
    })
  }

  // // 5. 客户分享
  // static CustomersShareSave({ FromPerson, ToPerson}) {
  //   return Http.request({
  //     url: "api/V1/Customers/CustomersShareSave",
  //     data: {
  //       FromPerson,
  //       ToPerson
  //     }
  //   })
  // }

}
export {
  Customers
}