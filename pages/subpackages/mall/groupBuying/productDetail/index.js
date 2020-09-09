// pages/subpackages/mall/groupBuying/productDetail/index.js
import {GroupBuying} from "../../../../../models/groupBuying";

const app = getApp()
import {
  getWindowHeightRpx
} from "../../../../../utils/system";
import {
  ShoppingWay
} from "../../../../../core/enum";
import {
  OrderAndPayLogic
} from "../../../../../models/orderAndPayLogic.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: false,
    BillId:0,//拼团团购单标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let scene = options.scene;
    let pid, ActivityId, pcode;

    if (scene) {
      scene = decodeURIComponent(scene);
      pid = scene.pid;
      pcode = scene.pcode;
      ActivityId = scene.ActivityId;
    } else {
      pid = options.pid;
      pcode = options.pcode;
      ActivityId = options.ActivityId;
    }
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      pid,
      pcode,
      ActivityId,
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
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState({EnterpriseID: app.config.EnterpriseID})
    const spu =await GroupBuying.QueryEGroupProductDetailForWx({ID:pid})
    let obj={
      EnterpriseId: app.config.EnterpriseID,
      ProductCode:this.data.pcode
    }
    const groupList =await GroupBuying.QueryProductEGroupListForWx(obj)
    this.setData({
      spu,
      groupList,
      payState: payState.ResultValue
    })
    let result = app.towxml(spu.Info, 'markdown', {
      // base: 'https://xxx.com',             // 相对资源的base路径
      // theme: 'dark',                   // 主题，默认`light`
      events: {                    // 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
          let data = e.currentTarget.dataset.data
          if (data.tag == 'img') {
            var currentImage = data.attr.src
            var imageList = []
            imageList.push(currentImage)

            wx.previewImage({
              urls: imageList,
              current: currentImage
            })
          }
        }
      }
    })
    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
    });
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

  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },

  onGroupBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CREATE_GROUP
    })
  },
  onMakeGroupBuy(event){
    console.log(event)
    let item =event.currentTarget.dataset.cell
    console.log(item)
    let BillId=item.ID
    this.setData({
      BillId,
      showRealm: true,
      orderWay: ShoppingWay.MAKE_GROUP
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
    if (spu.Stock == 0) {
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

    let ProductPrice;
    if(event.detail.orderWay === ShoppingWay.BUY){
      ProductPrice=spu.Price
    }else if (event.detail.orderWay === ShoppingWay.CREATE_GROUP){
      ProductPrice=spu.GroupPrice
    }else if (event.detail.orderWay === ShoppingWay.MAKE_GROUP){
      ProductPrice=spu.GroupPrice
    }
    let ProductNum = event.detail.currentSkuCount;
    let ProductCountPrice = ProductPrice * ProductNum
    let ProductlList = [];
    if (!ProductPrice || ProductPrice==0){
      wx.showModal({
        title: '提示',
        content: '暂不能购买',
        showCancel:false
      })
      return
    }
    let item = {
      ID: spu.ID,
      ProductCode:spu.ProductCode,
      ProductName: spu.ProductName,
      ProductImage: spu.CoverImage,
      ProductNum,
      ProductPrice: ProductPrice.toFixed(2),
      Stock: spu.Stock,
      baseUrl: spu.ShowResourcesUrl,
      ProductCountPrice: ProductCountPrice.toFixed(2),
    }
    ProductlList.push(item)
    let ProductModel = {
      BillId:this.data.BillId,
      orderWay:event.detail.orderWay,
      ProductCount: ProductNum,
      ProductPrice: ProductCountPrice,
      ProductlListModel: ProductlList
    }
    wx.navigateTo({
      url: `/pages/subpackages/mall/groupBuying/orderPay/index?ProductModel= ${JSON.stringify(ProductModel)}`,
    })
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