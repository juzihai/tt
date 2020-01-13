import { Product } from '../../../../../models/product.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let scene =decodeURIComponent(options.scene);
    let pid=options.pid;
    let pcode = options.pcode;
    const spu=await Product.SearchModelDetails(pid)
    const banner = await Product.SearchRotationChart(pcode)
    this.setData({ 
      spu,
      banner,
      pid,
      pcode
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let pid = this.data.pid;
    let pcode = this.data.pcode;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent(`/pages/subpackages/mall/product/productDetail1/index?pid=${pid}&pcode=${pcode}`);

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&sharOpenID=${OpenID}`
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