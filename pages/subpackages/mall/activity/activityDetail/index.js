// pages/subpackages/mall/activity/activityDetail/index.js
const app = getApp()
import { HotActivity } from '../../../../../models/hotActivity.js'
import { CompanyRotationchart } from '../../../../../models/companyRotationchart.js'
import { ProductRotationchart } from '../../../../../models/productRotationchart.js'

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
    })
    let result = app.towxml(Model.Content, 'markdown', {
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


})