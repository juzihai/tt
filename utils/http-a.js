import { config} from "../config/config";
import {  promisic} from "./util";

const app = getApp()

const AreaName = config.EnterpriseID

var test1 = "金朵科技"

class Http {
  static async request({
    url,
    data,
    method = 'POST',
    header
  }) {
    /**
     * wx.request promisic封装
     * @param url   地址
     * @param data  参数
     * @param method    请求方式
     * @returns {Promise<void>}
     */
    const d = new Date();
    const CreationTime = d.toUTCString()
    const SystemUserID = wx.getStorageSync('OpenID')//用户id

    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        SystemUserID,
        CreationTime,
        AreaName,
        AreaDisplayName: encodeURI(test1),
        SystemIP: "", //ip
        TerminalType: 1,

      },
    });
    console.log('接口=', url, '参数=', data, '返回参数', res);

    return res.data.ResultValue;
  }


}

export {
  Http
}