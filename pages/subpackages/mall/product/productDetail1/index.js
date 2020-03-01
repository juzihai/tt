const app=getApp()
import { Product } from '../../../../../models/product.js'
import { HotProduct } from '../../../../../models/hotProduct.js'
var WxParse = require('../../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let scene =options.scene;
    let pagePath=options.pagePath;

    let pid,pcode;

    if(scene){
      scene= decodeURIComponent(scene);
      pid = scene.pid;
      pcode = scene.pcode;
    }else{
       pid = options.pid;
       pcode = options.pcode;
    }

    const spu = pagePath == "HotProduct" ? await HotProduct.SearchModelDetails(pid) : await Product.SearchModelDetails(pid);
    const banner = pagePath == "HotProduct" ? await HotProduct.SearchRotationChart(pcode) :await Product.SearchRotationChart(pcode);
    this.setData({ 
      spu,
      banner,
      pid,
      pcode
    })
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    if (spu.ProductDetail){
      WxParse.wxParse('articleModel', 'html', spu.ProductDetail, this, 5);
    }

   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let pid = this.data.pid;
    let pcode = this.data.pcode;
    let OpenID = wx.getStorageSync('OpenID')
    let PageUrlWithArgs=app.util.getCurrentPageUrlWithArgs();
    let url = encodeURIComponent(PageUrlWithArgs);

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}`
    }
  },



  onAddToCart(event) {
    this.setData({
      showRealm: true,
      // orderWay: ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm: true,
      // orderWay: ShoppingWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url: "/pages/navigator/index/index"
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url: "/pages/cart/cart"
    })
  },

})