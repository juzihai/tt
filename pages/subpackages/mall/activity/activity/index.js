// pages/subpackages/mall/activity/activity/index.js
import { HotActivity } from '../../../../../models/hotActivity.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagelist: [],
    //所有图片的高度  
    imgheights: [],
    cardCur: 0,//记录点击图片下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let pagePath = options.pagePath
    let id = options.id
    if (pagePath == "CompanyRotationchart") {
      var Model = await CompanyRotationchart.SearchModelDetails(id)
    } else {
      var Model = await HotActivity.SearchModelDetails(id)
    }
    let imagelist=[];
    imagelist.push(Model.ImageUrl)
    this.setData({
      ModelData: Model,
      Model,
      imagelist: imagelist,
    })

  },
  bindchange: function (e) {
    this.setData({ cardCur: e.detail.current })
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },

})