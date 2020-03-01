// components/spu-scroll/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['my-class'],
  properties: {
    theme: Object,
    spuList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItem(res){
      let item = res.currentTarget.dataset.item
      this.triggerEvent('tapping', item, {})
    },
    onTitle(){
      wx.navigateTo({
        url: '/pages/subpackages/mall/product/hotProductList/index',
      })
    }
  }
})
