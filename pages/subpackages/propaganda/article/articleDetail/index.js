// pages/subpackages/propaganda/article/articleDetail/index.js
const app = getApp();
import {
  Article
} from '../../../../../models/article.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true, // 判断是否尚在加载中
    article: {} // 内容数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let scene = options.scene;
    let id = 0;
    let GUID = null;
    if (scene) {
      scene = decodeURIComponent(scene);
      id = scene.id
      GUID = scene.GUID
    } else {
      id = options.id
    }
    const OpenID = wx.getStorageSync('OpenID');

    const FromPerson = app.globalData.SharOpenID
    let obj = {
      "ID": id,
      FromPerson,
      ReadPerson: OpenID,
      EnterpriseID: app.config.EnterpriseID,
      GUID
    }
    Article.UpdateReadAmount(obj)
    const articleModel = await Article.SearchModelDetails(id)
    this.setData({
      articleModel: articleModel,
      id
    })
    let result = app.towxml(articleModel.Content, 'markdown', {
      // base: 'https://xxx.com',             // 相对资源的base路径
      // theme: 'dark',                   // 主题，默认`light`
      events: { // 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap1', e);
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
  onShareAppMessage: function () {
    let id = this.data.id;
    let OpenID = wx.getStorageSync('OpenID')
    let GUID = app.util.random(32)
    let url = encodeURIComponent(`/pages/subpackages/propaganda/article/articleDetail/index?id=${id}&GUID=${GUID}`);
    console.log(url)
    let obj = {
      ArticleID: id,
      OpenID: OpenID,
      EnterpriseID: app.config.EnterpriseID,
      GUID
    }
    Article.ArticleShareRecord(obj)

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}`
    }
  },

  onAddToCart(e) {

  },
  onGotoHome() {
    wx.switchTab({
      url: '/pages/navigator/index/index',
    })
  },
  onBuy(e) {
    wx.navigateTo({
      url: `/pages/subpackages/mall/company/staffList/index?pagePath=article&ClassID=${this.data.articleModel.ArticleType}`,
    })
  }

})