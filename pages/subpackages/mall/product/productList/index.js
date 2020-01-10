
import { ProductModel } from '../../../../../models/product.js'

//使用类下的实例化方法 不能直接Http.request. 需先实例化类的对象
// let productModel = new ProductModel()
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
    _that = this;//如果使用次数较多使用全局this

    this._loadData();//加载页面数据
  },
  _loadData() {
    let obj = {
      "EnterpriseID": "242415",
      "ProductCode": "",
      "ProductName": "",
      "Page": 1,
      "Limit": 10
    }
    //产品查询
    // productModel.PageSearch(obj.EnterpriseID, obj.ProductCode, obj.ProductName, obj.Page, obj.Limit).then(res => {

    //   console.log('在页面中接受的res=', res)
    // });
  },

})