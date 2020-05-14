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
import {
  OrderAndPayLogic
} from "../../../../../models/orderAndPayLogic.js";

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

    // const spu = pagePath == "HotProduct" ? await HotProduct.SearchModelDetails(pid) : await Product.SearchModelDetails(pid);
    // const banner = pagePath == "HotProduct" ? await HotProduct.SearchRotationChart(pid) : await Product.SearchRotationChart(pid);

    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      pid,
      pcode,
    })

    this.initAllData()

  },
  onShow() {
    this.initAllData()
  },
  async initAllData() {
    let pid = this.data.pid
    if(!pid){
      return
    }
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      ProductID: pid
    }
    const spu = await Product.RewritePageSearchWX(obj)
    const banner = await Product.SearchRotationChart(pid)
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState(obj)
    this.setData({
      spu,
      banner,
      payState: payState.ResultValue
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
      path: `/pages/navigator/mall/index?url=${url}&SharOpenID=${OpenID}`
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
    let payState = this.data.payState;
    if (!payState.Pay) {
      wx.showModal({
        title: '提示',
        content: '暂未开通支付，请联系店铺管理员',
      })
      return
    }
    let spu = event.detail.spu;
    if (spu.SalesStock == 0) {
      wx.showModal({
        title: '提示',
        content: '暂无库存，请联系店铺管理员',
      })
      return
    }
    let phone = wx.getStorageSync('phoneNumber')
    if (!phone) {
      wx.showModal({
        title: '提示',
        content: '您还未登录是否现在登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/navigator/mine/index',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    if (event.detail.orderWay === ShoppingWay.CART) {
      let obj = {
        OpenId: wx.getStorageSync('OpenID'),
        EnterpriseId: app.config.EnterpriseID,
        ProductID: spu.ProductID,
        ProductNum: event.detail.currentSkuCount,
        ProductType: this.data.pagePath == "HotProduct" ? 2 : 1
      }
      const cart = await ShoppingCart.Add(obj)
      if (cart.Success) {
        console.log("加入购物车")

        wx.lin.showToast({
          title: '添加成功~',
          icon: 'success'
        })
      } else {
        console.log('添加err')
      }

    } else if (event.detail.orderWay === ShoppingWay.BUY) {
      let ProductlList = [];
      let ProductPrice = this.mainPrice(spu.Price, spu.DiscountPrice).price
      let ProductNum = event.detail.currentSkuCount;
      let ProductCountPrice = ProductPrice * ProductNum
      if (!ProductPrice || ProductPrice==0){
        wx.showModal({
          title: '提示',
          content: '暂不能购买',
          showCancel:false
        })
        return
      }
      let item = {
        ClassID: spu.ClassID,
        ClassName: spu.ClassName,
        ID: spu.ID,
        IsBuy: 1.,
        ProductCountPrice: ProductCountPrice.toFixed(2),
        ProductID: spu.ProductID,
        ProductImage: spu.ProductImage,
        ProductName: spu.ProductName,
        ProductNum,
        ProductPrice: ProductPrice.toFixed(2),
        SalesStock: spu.SalesStock,
        baseUrl: spu.ShowResourcesUrl
      }
      ProductlList.push(item)
      let ProductModel = {
        ProductCount: ProductNum,
        ProductPrice: ProductCountPrice,
        ProductlListModel: ProductlList
      }
      wx.navigateTo({
        url: `/pages/subpackages/mall/product/order/index?ProductModel= ${JSON.stringify(ProductModel)} & pagePath=productDetail`,
      })
    }

    this.setData({
      showRealm: false
    })

  },
  mainPrice(price, discountPrice) {
    if (!discountPrice) {
      return {
        price: price,
        display: true
      };
    } else {
      return {
        price: discountPrice,
        display: true
      }
    }
  }
})