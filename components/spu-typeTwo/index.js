// components/spu-typeTwo/index.js
import string from "../../miniprogram_npm/lin-ui/common/async-validator/validator/string";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    startTime:String,
    endTime:String,
    selectDay:String,
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
    onTap(event){
      let spu = this.properties.spu
      this.triggerEvent('tapping',spu)
    },
    onRight(event){
      let spu = this.properties.spu
      this.triggerEvent('tappingRight',spu)
    }

  }
})

