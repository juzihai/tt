import {
  config,
  tips
} from "../config/config";

import {
  promisic
} from "./util";

const app = getApp()
let _that;
const EnterpriseId = config.EnterpriseID

class Http {

  static async request({ url, data, method = 'POST', TerminalType = 1 }) {
    const d = new Date();
    const CreationTime = d.toUTCString() //当前utc时间
    const SystemUserID = wx.getStorageSync('OpenID') //用户id
    _that = this;
    const res = await new Promise(function (resolve, reject) {
      wx.request({
        url: `${config.apiBaseUrl}${url}`,
        data,
        method,
        header: {
          SystemUserID,
          CreationTime,
          AreaName: EnterpriseId,
          AreaDisplayName: encodeURI("果资科技"),
          SystemIP: "", //ip
          TerminalType,
          EnterpriseId,
          AuthCode: SystemUserID

        },
        success: (res) => {
          wx.hideLoading();
          //这里可以根据自己项目服务端定义的正确的返回码来进行，接口请求成功后的处理，当然也可以在这里进行报文加解密的统一处理

          const statusCode = res.statusCode.toString()
          if (statusCode.startsWith('2')) {
            let resultCode = res.data.ResultCode
            if (resultCode && resultCode.startsWith('2')) {
              resolve(res);
            } else {
              reject(res)
              _that._show_error(resultCode);
            }
          } else {
            reject()
            _that._show_error(statusCode)
          }
        },
        fail: (error) => {
           wx.hideLoading();
          _that._show_error(1)
          reject(error);
        },
        complete: (res) => {
         
          let a=JSON.stringify(data)
          let b=JSON.stringify(res.data)
          console.log('接口=', url, '参数=',data,a, '返回参数', res );
        }
      })
    });
    return res.data.ResultValue

  }


  static _show_error(error_code) {

    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

}

export {
  Http
}