const app = getApp()
import {
  Product
} from '../../../../../models/product.js'
import {
  HotProduct
} from '../../../../../models/hotProduct.js'
import {
  getWindowHeightRpx
} from "../../../../../utils/system";
import {
  ShoppingWay
} from "../../../../../core/enum";
import {
  ShoppingCart
} from "../../../../../models/shoppingCart.js";
var WxParse = require('../../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let scene = options.scene;
    let pagePath = options.pagePath;

    let pid, pcode;

    if (scene) {
      scene = decodeURIComponent(scene);
      pid = scene.pid;
      pcode = scene.pcode;
    } else {
      pid = options.pid;
      pcode = options.pcode;
    }

    const spu = pagePath == "HotProduct" ? await HotProduct.SearchModelDetails(pid) : await Product.SearchModelDetails(pid);
    const banner = pagePath == "HotProduct" ? await HotProduct.SearchRotationChart(pcode) : await Product.SearchRotationChart(pcode);
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      spu,
      banner,
      pid,
      pcode,
      pagePath
    })
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    if (spu.ProductDetail) {
      WxParse.wxParse('articleModel', 'html', spu.ProductDetail, this, 5);
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let pid = this.data.pid;
    let pcode = this.data.pcode;
    let OpenID = wx.getStorageSync('OpenID')
    let PageUrlWithArgs = app.util.getCurrentPageUrlWithArgs();
    let url = encodeURIComponent(PageUrlWithArgs);

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}`
    }
  },

  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url: "/pages/navigator/index/index"
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url: "/pages/navigator/cart/index"
    })
  },
  onSpecChange(event) {
    this.setData({
      specs: event.detail,
    })
  },
  async onSpecAdd(event) {
    console.log(event)

    if (event.detail.orderWay === ShoppingWay.CART){
      let obj={
        OpenId: wx.getStorageSync('OpenID'),
        EnterpriseId: app.config.EnterpriseID,
        ProductId: event.detail.spu.ID,
        ProductNum: event.detail.currentSkuCount,
        ProductType: this.data.pagePath == "HotProduct" ? 2 : 1
      }
      const cart=await ShoppingCart.Add(obj)
      if (cart.Success){
        console.log("加入购物车")

        wx.lin.showToast({
          title: '添加成功~',
          icon: 'success'
        })
      }else{
      console.log('添加err')
      }
     
    } else if (event.detail.orderWay === ShoppingWay.BUY){
      wx.navigateTo({
        url: '/pages/subpackages/mall/product/order/index',
      })
    }

    this.setData({
      showRealm: false
    })

  }
})