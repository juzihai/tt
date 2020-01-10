// pages/subpackages/propaganda/article/articleDetail/index.js
import { Article } from '../../../../../models/article.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id

    const a = Article.SearchModelDetails(id)
    
  },


})