// components/order-realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "couponData": [
      {
        "ClassID": 3,
        "ClassName": "产品",
        "list": [
          {
            "ID": 117,
            "EnterpriseID": "3373",
            "CouponId": 63,
            "ReductionAmount": 30,
            "Denomination": 50,
            "IsUse": 0,
            "UseTime": null,
            "StartValidity": 1585670400,
            "EndValidity": 1589916800,
            "CreationTime": 1587865000,
            "CouponName": "满50减30",
            "Code": "bbba32e0b79241679195a3194adb4855",
            "CoverImage": "2020-04-26/ca2de05a664e45b496ca41ade7351af8.png",
            "Memo": "暂无描述",
            "IsDelete": 0,
            "ClassName": "美容养生"
          },
          {
            "ID": 119,
            "EnterpriseID": "3373",
            "CouponId": 64,
            "ReductionAmount": 10,
            "Denomination": 99,
            "IsUse": 0,
            "UseTime": null,
            "StartValidity": 1585670400,
            "EndValidity": 1589916800,
            "CreationTime": 1587865001,
            "CouponName": "满99减10",
            "Code": "fe003fbaf3ce4586b2badb80497cec57",
            "CoverImage": "2020-04-26/27c9ce0b2ba044409ca46c530f9a2d30.png",
            "Memo": "111",
            "IsDelete": 0,
            "ClassName": "美容养生"
          }
        ]
      },
      {
        "ClassID": 3,
        "ClassName": "产品",
        "list": [
          {
            "ID": 117,
            "EnterpriseID": "3373",
            "CouponId": 63,
            "ReductionAmount": 30,
            "Denomination": 50,
            "IsUse": 0,
            "UseTime": null,
            "StartValidity": 1585670400,
            "EndValidity": 1589916800,
            "CreationTime": 1587865000,
            "CouponName": "满50减30",
            "Code": "bbba32e0b79241679195a3194adb4855",
            "CoverImage": "2020-04-26/ca2de05a664e45b496ca41ade7351af8.png",
            "Memo": "暂无描述",
            "IsDelete": 0,
            "ClassName": "美容养生"
          },
          {
            "ID": 119,
            "EnterpriseID": "3373",
            "CouponId": 64,
            "ReductionAmount": 10,
            "Denomination": 99,
            "IsUse": 0,
            "UseTime": null,
            "StartValidity": 1585670400,
            "EndValidity": 1589916800,
            "CreationTime": 1587865001,
            "CouponName": "满99减10",
            "Code": "fe003fbaf3ce4586b2badb80497cec57",
            "CoverImage": "2020-04-26/27c9ce0b2ba044409ca46c530f9a2d30.png",
            "Memo": "111",
            "IsDelete": 0,
            "ClassName": "美容养生"
          }
        ]
      }
    ],
    items8: [{
      id: 1,
      name: '2004年12月16日',
    }, {
      id: 2,
      name: '2005年3月20日'
    }, {
      id: 3,
      name: '2019年8月27日'
    }],
    position: 'left'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSpecAdd() {
      this.triggerEvent('specadd', {
        orderWay: this.properties.orderWay,
        spu: this.properties.spu,
        currentSkuCount: this.data.currentSkuCount
      })
    },
  }
})
