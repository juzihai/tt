// 配置项
const config = {
  /** 正式地址*/
  
  // "apiBaseUrl": 'https://company.gzchinaunion.com/',
  // "EnterpriseID": "1824",//A杜尚美术 wxd761439fbf570705 
  // "EnterpriseID": "5385",//A成都焕颜坊美容院 wxc55be904eb7097aa 
  // "EnterpriseID": "7645",//A山东阅澜式文化创意有限公司 wx9125ddcfb26323de
  // "EnterpriseID": "2258",//A创智车业 wx000970c8d427155a

  // "EnterpriseID": "4981",//a益清正式 wxdc90f597804fb320
  // "EnterpriseID": "3063",//a融汇正式 wx9b9444c94ae8a071
  // "EnterpriseID": "8654",//a谷银基金 wx6cd14a7fb77bf48c
  // "EnterpriseID": "6955",//a瑞晟（天津）文化传媒有限公司 wxa076c3926e2da7e2

  // "EnterpriseID": "7103",//p杨秸秆 wx163a906af5fc7211
  // "EnterpriseID": "1639",//p依斗米业 wxb4377b2602a6c4c8
  // "EnterpriseID": "2314",//p宝力化肥 wx3129429b4472df08

  // "EnterpriseID": "9646", //果资正式 wxadb9c5292f70762a

  // "EnterpriseID": "1512",//wx588f0a9983b3d27b 田禹正式版测试用
  // "EnterpriseID": "8343",//婚庆公司 wxf857e7c332c7ed04
  // "EnterpriseID": "9446",//天津乖乖宠物医院 wx98e3d124373d212f
  // "EnterpriseID": "3532",//汽车美容  wx9c425df6d5ecb7ac
  // "EnterpriseID": "3478",//雅儿口腔医疗 wxf1bdc7db5abe5aea
  // "EnterpriseID": "7720",//伊美尔连锁整形美容 wx2e8e4434a39d3508
  // "EnterpriseID": "6236",//天津明朗广告传媒有限公司 wx999fb45b6c67c707
  // "EnterpriseID": "2016",//果资律师 wxbf16fb811554d7c4

  /** test测试地址*/
  "apiBaseUrl": 'https://test.gzchinaunion.com/',
  // "EnterpriseID": "1276", //wxd4a6cbbab77c70ff 小孟测试
  // "EnterpriseID": "4981", //wx2e8e4434a39d3508 益清测试
  // "EnterpriseID": "3373", //wxa93d39f1484ac31a 天津金朵科技测试
  "EnterpriseID": "8869", //wxbf16fb811554d7c4 子企业
  // "apiBaseUrl": 'https://shl.gzchinaunion.com/',
  // "EnterpriseID": "6937",//A山东阅澜式文化创意有限公司 wx9125ddcfb26323de
    /** 电信地址*/
      // "apiBaseUrl": 'https://company.tc-btc.com/',
      // "EnterpriseID": "8755", //wx3a19a07d883c17ae 电信测试

}
const tips = {
  //基础Http请求码 
  "1": '服务繁忙,请稍后再试',
  "500": '内部请求出错',
  "600.1": '数据已存在',
  "600.2": '输入数据格式不正确',
  "600.3": '参数错误',
  "600.4": '输入数据大小不正确',
  "600.5": '输入数据顺序不正确',
  "600.6": '数据不可删除',
  "600.7": ' 轮播图个数超出',
  "600.8": ' 空数据',
  "600.9": ' 支付错误',
  "600.12": '房间数量不足',
  "600.13": ' 支付异常请重试',
  "600.14": ' 产品价格发生改变，请重新下单',
  "660.1": ' 下单失败',
  "999.9": ' 请求头错误',
  //HttpLoginStateCode
  "700.1": '用户名或密码不存在',
  "700.2": '账号已被冻结',
  "700.3": '企业不存在',
  //HttpCustomersStateCode
  "800.1": '企业还未配置小程序账号',
  //HttpStaffStateCode
  "900.1": '手机号已存在',
  "900.2": '员工编码已存在',

  /// 平台类接口返回定义

  "1050.5": ' 参数有误',

  "1301.3": ' 剩余数量不足',
  "1301.4": ' 今日已领取',
  "1301.5": ' 不能重复领取',

  /// 订单和支付相关的数据校验
  "1303.0": ' 产品下架或者删除无法进行购买',
  "1303.1": ' 产品下架或者删除无法进行购买',
  "1303.2": ' 优惠券已经使用',
  "1303.3": ' 积分不足无法抵扣',
  "1303.4": ' 产品价格异常',
  "1303.5": ' 产品库存不足',
  "1303.6": ' 产品发生改变',
  "1303.7": ' 数据补偿时二次提交',
  "1303.8": ' 商家不存在物流规则',
  "1303.9": ' 单品物流数据不匹配',
  "1303.10": ' 商家物流数据不匹配',
  //logisticsShopStatus
  "1304.1": ' 校验城市是否已经存在',

  "2112.3": ' 库存不足',
  "2112.5": ' 参数有误',
  "2114.5": ' 参数有误',
  "2114.6": ' 此团人已满',
  "2114.8": ' 参团限制',
  "2114.9": ' 参团限制（此团已经参与）',
  "2118.5": ' 参数有误',
  "2120.5": ' 参数有误',
  "2122.5": ' 参数有误',
  "2124.5": ' 参数有误',
}



// 配置文件es6导出
export {
  config,
  tips,
}