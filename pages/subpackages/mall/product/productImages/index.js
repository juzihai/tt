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
    let TypeID=e.detail.name
    this.initAllData(TypeID)
  },
  _itemselcet(ID){

    let materialType=this.data.materialType
    for (let index in materialType){
      if (materialType[index].ID==ID){
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
    let product=this.data.product
    let item = e.detail.item
    let url=item.baseUrl+item.OriginalImage
    let urls =[];
    product.accumulator.forEach(i=>{
      let url=i.baseUrl+i.OriginalImage
      urls.push(url)
    })

    wx.previewImage({
      current:url,
      urls
    })
  },

  /**
   *
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.productModel.getMoreData();
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