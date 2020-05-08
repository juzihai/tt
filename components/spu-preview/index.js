// components/spu-preview/index.js
const app = getApp()
import {
  ShoppingCart
} from "../../models/shoppingCart.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
    type:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array,
    data: null,
    baseUrl: null,

  },
  /**
   * 属性监听器
   */
  observers: {
    data: function(data) {
      if (!data) {
        return
      }

      if (!data.tags) {
        return;
      }
      const tags = data.tags.split('$'); //将标签字符串转换成数组

      this.setData({
        tags
      })

    }
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
    onItemTap(event) {
      const pid = event.currentTarget.dataset.pid
      const pcode = event.currentTarget.dataset.pcode 

      wx.navigateTo({
        url: `/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}`
      })

    },
    // onItemTap(res){
    //   let item = this.data.data
    //   this.triggerEvent('tapping', item, {})
    // }

    async onCartAdd(e) {
      console.log(e)
      let spu = this.properties.data;
      if (spu.SalesStock == 0) {
        wx.showModal({
          title: '提示',
          content: '暂无库存，请联系店铺管理员',
        })
        return
      }
      let obj = {
        OpenId: wx.getStorageSync('OpenID'),
        EnterpriseId: app.config.EnterpriseID,
        ProductID: spu.ID,
        ProductNum: 1,
        ProductType: this.data.pagePath == "HotProduct" ? 2 : 1
      }
      wx.lin.showToast({
        title: '处理中～',
        mask: true
      })
      const cart = await ShoppingCart.Add(obj)
      if (cart.Success) {
        console.log("加入购物车")

        wx.lin.showToast({
          title: '添加成功~',
          icon: 'success'
        })
      } else {
        wx.lin.showToast({
          title: '添加失败~',
          icon: 'success'
        })
        console.log('添加err')
      }

      setTimeout(function () {
        wx.lin.hideToast()
      }, 500)
    },
  }
})