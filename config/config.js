// 配置项
const config = {
  /** 正式地址appid：wxa93d39f1484ac31a*/
  // "apiBaseUrl": 'https://www.yulongyi.com/',
  // "EnterpriseID": "242415",//正式id
  // "EnterpriseID": "4644",//石家庄测试id

  /** 测试地址appid：wx72c692238d3d16bc*/
  // "apiBaseUrl": 'https://www.jinduochina.com/',
  "apiBaseUrl": 'http://company.jinduochina.com/',
  "EnterpriseID": "3373",//测试id
}
const tips = {
  "1": '服务繁忙,请稍后再试',
  "500": '内部请求出错',
  "600.1":'数据已存在',
  "600.2":'输入数据格式不正确',
  "600.3":'参数错误',
  "600.4":'输入数据大小不正确',
  "600.5":'输入数据顺序不正确',
  "600.6":'数据不可删除',
  "600.7":' 轮播图个数超出',


  "700.1":'用户名或密码不存在',
  "700.2":'账号已被冻结',
  "700.3":'企业不存在',
  "800.1":'企业还未配置小程序账号',
  "900.1":'手机号已存在',
  "900.2":'员工编码已存在',
  "660.1":' 数据操作失败',

/// 平台类接口返回定义   

}



// 配置文件es6导出
export {
  config,
  tips
}