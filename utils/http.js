const tips = {
  1: '服务繁忙,请稍后再试',

  500: '500问题',
  504: '504问题',
}
const config = {
  // 正式地址
  // api_base_url: 'https://www.jinduochina.com/webapi/',
  // 测试地址
  api_base_url: 'http://180.76.177.49:8011/',
}
class Http {
  //解构
  request({ url, data = {}, method = 'POST' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  //request方法～ 类下面的函数通常叫做方法
  _request(url, resolve, reject, data = {}, method = 'POST') {
    // url,data,method,
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {},
      success: (res) => {
        console.log('接口=', url, '参数=', data, '成功返回参数', res);
        const code = res.statusCode.toString(); //通用的状态吗

        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        console.log('接口=', url, '参数=', data, '失败返回参数', err);
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
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
  Http,
  config
}