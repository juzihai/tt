
import { Product } from '../../../../../models/product.js'

let _that

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
    this.initAllData();
  },
  async initAllData() {
    let obj = {
      "EnterpriseID": "242415",
      "ProductCode": "",
      "ProductName": ""
    }
    const paging = Product.PageSearch(obj);
    this.data.spuPaging = paging //类属性
    const data = await paging.getMoreData();//todo
    if (!data) {
      return;
    }
    // data 数组, refresh 清空元素, success 返回成功
    wx.lin.renderWaterFlow(data.items);
  },
  /**
  *
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: async function () {

    const data = await this.data.spuPaging.getMoreData();
    console.log(data)
    if (!data) {
      this.setData({
        loadingType: 'end'
      })
      return
    } else {
      this.setData({
        loadingType: 'loading'
      })
    }

    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },

})