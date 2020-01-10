import { config } from "../config/config";
import { promisic } from "./util";


class Http {
  static async request({url, data, method='POST'}){
    /**
     * wx.request promisic封装
     * @param url   地址
     * @param data  参数
     * @param method    请求方式
     * @returns {Promise<void>}
     */
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header:{
        // appkey: config.appKey
      },
    });
    console.log('接口=', url, '参数=', data, '返回参数', res);

    return res.data.ResultValue;
  }


}

export {
  Http
}