import { promisic } from "./util";

const config = {
  /** 正式地址*/
  // api_base_url: 'https://www.jinduochina.com/webapi/',
  /** 测试地址*/
  api_base_url: 'http://180.76.177.49:8011/',
}
/**
 * 定义http的request方法，包装wx.request 方法
 */

class Http {
  static async request({url, data, method='POST'}){
    const res = await promisic(wx.request)({
      url: `${config.api_base_url}${url}`,
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