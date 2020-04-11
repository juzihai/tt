// pages/subpackages/mall/product/addressAdd/index.js
import { Area } from "../../../../../models/area.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    showRegion: false,
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let obj = {

    }
    const data = await Area.Search(obj)
    this.setData({
      data
    })
  },
  chooseRegion: function () {
    this.setData({
      showRegion: true,
    });
  },
  emitHideRegion: function (e) {
    console.log(e)
    this.setData({
      showRegion: e.detail.showRegion,
      regionValue: e.detail.regionValue,
    });
  },
})