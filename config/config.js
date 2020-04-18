// 配置项
const config = {
  /** 正式地址*/
  // "apiBaseUrl": 'https://qy.gzchinaunion.com/',
  // "EnterpriseID": "2645",//金朵正式 wxadb9c5292f70762a
  // "EnterpriseID": "4981",//益清正式 wxdc90f597804fb320
  // "EnterpriseID": "8343",//蕾特恩专业祛痘连锁 wxf857e7c332c7ed04
  // "EnterpriseID": "9446",//天津乖乖宠物医院 wx98e3d124373d212f
  // "EnterpriseID": "3532",//汽车美容  wx9c425df6d5ecb7ac
  // "EnterpriseID": "3478",//雅儿口腔医疗 wxf1bdc7db5abe5aea
  // "EnterpriseID": "7720",//伊美尔连锁整形美容 wx2e8e4434a39d3508
  // "EnterpriseID": "6236",//天津明朗广告传媒有限公司 wx999fb45b6c67c707


  /** 测试地址*/
  "apiBaseUrl": 'https://company.gzchinaunion.com/',
  "EnterpriseID": "3373",//wxa93d39f1484ac31a
}
const tips = {
  /// 平台类接口返回定义   
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

}



// 配置文件es6导出
export {
  config,
  tips,
}