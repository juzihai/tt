import {
  config,
  tips
} from "../config/config";

import {
  promisic
} from "./util";

const app = getApp()

const EnterpriseId = config.EnterpriseID

class Http {
  static async request({
    url,
    data,
    method = 'POST',
    TerminalType = 1
  }) {
    /**
     * wx.request promisic封装
     * @param url   地址
     * @param data  参数
     * @param method    请求方式
     * @returns {Promise<void>}
     */
    const d = new Date();
    const CreationTime = d.toUTCString() //当前utc时间
    const SystemUserID = wx.getStorageSync('OpenID') //用户id

    const res = await promisic(wx.request)({
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
    });
    console.log('接口=', url, '参数=', data, '返回参数', res);
    const statusCode = res.statusCode.toString()
    if (statusCode.startsWith('2')) {
      let resultCode = res.data.ResultCode
      if (resultCode && resultCode.startsWith('2')) {} else {
        this._show_error(resultCode);
      }
    } else {
      this._show_error(statusCode)
    }

    return res.data.ResultValue;
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