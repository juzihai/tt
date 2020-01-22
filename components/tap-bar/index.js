// components/tap-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftTitle: String,
    rightTitle: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftTitle: '联系我们',
    rightTitle:'立即购买',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGoToHome(event) {
      this.triggerEvent('gotohome', {
      })
    },

    onGoToCart(event) {
      this.triggerEvent('gotocart')
    },

    onAddToCart(event) {
      this.triggerEvent("addtocart")
    },

    onBuy(event) {
      this.triggerEvent("buy")
    }
  }
})
