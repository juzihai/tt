import {
  promisic
} from "../utils/util";
import {
  Http
} from "../utils/http-a";

/**客户接口 */
class Customers {

  static async Login() {
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
  static GetWeChatUserInfo({
    SessionKey,
    EncryptedData,
    IV
  }) {
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
  static RegisterCustomers({
    Unionid,
    OpenID,
    Phone,
    Name,
    QrType,
    EnterpriseID,
    AuthorizationType
  }) {
    return Http.request({
      url: "api/V1/Customers/RegisterCustomers",
      data: {
        Unionid,
        OpenID,
        Phone,
        Name,
        QrType,
        EnterpriseID,
        AuthorizationType
        // 未授权0，已授权1
      }
    })
  }

  // 4. 客户分享
  static MyCustomersSave({
    EnterpriseID,
    OpenIDOne,
    OpenIDTwo
  }) {
    return Http.request({
      url: "api/V1/Customers/MyCustomersSave",
      data: {
        EnterpriseID,
        OpenIDOne,
        OpenIDTwo
      }
    })
  }

  //7. 查询客户信息
  static GetCustomersInfo({ EnterpriseID, OpenID}) {
    return Http.request({
      url: "api/V1/Customers/GetCustomersInfo",
      data: {
        EnterpriseID,
        OpenID
      }
    })
  }



  /**统计接口 */
  // 1.统计用户进入小程序方式的比例
  static GetChannelCustomer({
    EnterpriseID,
    startTime,
    endTime
  }) {
    return Http.request({
      url: "api/V1/Customers/GetChannelCustomer",
      data: {
        EnterpriseID,
        startTime,
        endTime
      }
    })
  }

  // 2.统计小程序的周使用频率
  static PageSearchFrequencyWX({
    EnterpriseID,
    type
  }) {
    return Http.request({
      url: "api/V1/CustomerLogin/PageSearchFrequencyWX",
      data: {
        EnterpriseID,
        type
      }
    })
  }

  // 3.统计小程序累计用户量
  static GetTotalCustomer({
    EnterpriseID,
    endTime
  }) {
    return Http.request({
      url: "api/V1/Customers/GetTotalCustomer",
      data: {
        EnterpriseID,
        endTime
      }
    })
  }
  // 4.小程序用户新增查询
  static GetNewAddCustomer({
    EnterpriseID,
    startTime,
    endTime
  }) {
    return Http.request({
      url: "api/V1/Customers/GetNewAddCustomer",
      data: {
        EnterpriseID,
        startTime,
        endTime
      }
    })
  }
}
export {
  Customers
}