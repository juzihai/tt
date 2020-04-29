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
    couponData: null,
    position: 'left'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSpecAdd() {
      let couponData = this.properties.couponData;
      let idArr = []
      let data = []
      for (let i of couponData) {
        for (let item of i.list) {
          if (item.checked) {
            if (idArr.indexOf(item.CouponId) >= 0) {
              wx.showModal({
                title: '提示',
                content: '同一个优惠券一个订单只能使用一次，请重新选择',
              })
              return
            }
            idArr.push(item.CouponId)
            data.push(item)
          }
        }

      }




      this.triggerEvent('specadd', {
        couponData: data,
      })
    },
    radioChange: function(e) {
      console.log(e)
      let classIndex = e.currentTarget.dataset.index
      let couponData = this.properties.couponData;
      let CouponId = e.detail.key
      let checked = e.detail.checked

      couponData[classIndex].list.forEach(item => {
        if (item.CouponId == CouponId) {
          item.checked = checked
        } else {
          item.checked = false
        }

      })
      this.setData({
        couponData: couponData
      })
    }
  }
})