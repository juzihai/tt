// components/spu-image/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event) {
      const {
        width,
        height
      } = event.detail
      this.setData({
        w: 340,
        h: 340 * height / width
      })
    },
    // onItemTap(event) {
    //   const pid = event.currentTarget.dataset.pid
    //   const pcode = event.currentTarget.dataset.pcode 

    //   wx.navigateTo({
    //     url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}`
    //   })

    // },
    onItemTap(res){
      let item = this.data.data
      // console.log(item)
      this.triggerEvent('tapping', item, {})
    }

 
  }
})
