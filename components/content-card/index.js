// components/cotent-title/index.js
Component({
  externalClasses: ['l-content'],
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String
    },
    cardPadding: {
      type: Boolean,
      value: false
    },
    more:{
      type:Boolean,
      value:false
    }
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
    onMore(res) {
      this.triggerEvent('tapping', {}, {})
    },
  }
})