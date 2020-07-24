import {HotelMaterialType} from "../../../../../models/hotelMaterialType";
const app = getApp()
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

    this.initData()
  },
  async initData() {
    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
    }
    const materialType = await HotelMaterialType.PageSearchWX(obj)
    this.setData({
      materialType
    })
    if(materialType){
      let TypeID =materialType[0].ID
      console.log(TypeID)
      this.initAllData(TypeID)
    }
  },
  initAllData: async function (TypeID) {
    let obj = {
      TypeID
    }
    this._itemselcet(TypeID)
    const productModel = HotelMaterialType.SearchHotelMaterialWX(obj)
    this.data.productModel = productModel //类属性
    const product = await productModel.getMoreData();//todo
    setTimeout(function () {
      wx.hideToast()
    }, 100)
    wx.stopPullDownRefresh();
    this.setData({
      product
    })
    if (!product) {
      return;
    }
    // data 数组, refresh 清空元素, success 返回成功
    wx.lin.renderWaterFlow(product.items, true);
  },

  onSearch(e){
    console.log(e)
    let TypeID=e.detail.name
    this.initAllData(TypeID)
  },
  _itemselcet(ID){

    let materialType=this.data.materialType
    for (let index in materialType){
      console.log(index)
      if (materialType[index].ID=ID){
        materialType[index].selcet=true
      }else {
        materialType[index].selcet=false
      }
    }

    this.setData({
      materialType
    })
  },
  onImg(e){
    console.log('111',e)
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