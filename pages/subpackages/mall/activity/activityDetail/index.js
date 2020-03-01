// pages/subpackages/mall/activity/activityDetail/index.js
import { HotActivity } from '../../../../../models/hotActivity.js'
import { CompanyRotationchart } from '../../../../../models/companyRotationchart.js'
import { ProductRotationchart } from '../../../../../models/productRotationchart.js'

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
    let pagePath=options.pagePath
    let id = options.id
    if (pagePath =="CompanyRotationchart"){//首页轮播图
      var Model = await CompanyRotationchart.SearchModelDetails(id)
    } else if (pagePath == "ProductRotationchart"){//产品首页轮播图
      var Model = await ProductRotationchart.SearchModelDetails(id)
    }else{//热门详情
      var Model = await HotActivity.SearchModelDetails(id)
    }
    this.setData({
      ModelData:Model,
      Model
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
    WxParse.wxParse('Model', 'html', Model.Content, this, 5);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})