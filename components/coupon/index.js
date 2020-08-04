// components/coupon/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponData: Object,

  },

  /**
   * 组件的初始数据
   */
  data: {
    couponData: null,
    leftTitle: '关闭',
    rightTitle:'前往查看',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(event) {
      this.triggerEvent("onLeft")
    },

    onRight(event) {
      this.triggerEvent("onRight")
    }
  }
})
