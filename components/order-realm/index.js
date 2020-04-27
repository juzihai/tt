// components/order-realm/index.js
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
    couponData:null,
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
