// pages/subpackages/propaganda/article/articleDetail/index.js
const app = getApp();
import { Article } from '../../../../../models/article.js'

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
  onLoad: async function (options) {
    let scene = options.scene;
    let id =0;
    let GUID=null;
    if (scene){
      scene = decodeURIComponent(scene);
      id = scene.id
      GUID = scene.GUID
    }else{
      id = options.id
    }
    const OpenID = wx.getStorageSync('OpenID');

    const FromPerson = app.globalData.SharOpenID
    let obj = {
      "ID": id,
      FromPerson,
      ReadPerson: OpenID,
      EnterpriseID:app.config.EnterpriseID,
      GUID
    }
    Article.UpdateReadAmount(obj)
    const articleModel = await Article.SearchModelDetails(id)
    this.setData({
      articleModel: articleModel,
      article: articleModel,
      id
    })

    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var that = this;
    WxParse.wxParse('articleModel', 'html', articleModel.Content, this, 5);

    
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

  onAddToCart(e){

  },
  onGotoHome(){
    wx.switchTab({
      url: '/pages/navigator/index/index',
    })
  },
  onBuy(e){
    wx.navigateTo({
      url: `/pages/subpackages/mall/company/staffList/index`,
    })
  }

})