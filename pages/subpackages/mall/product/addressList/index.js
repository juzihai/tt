const app = getApp();
import { Customers } from "../../../../../models/customers.js";
import { DeliveryAddress } from "../../../../../models/deliveryAddress.js";

Page({
  data: {

  },
  onLoad: async function (options) {

  },

  onShow: function () {
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID")
    }
    const customers = await Customers.GetCustomersInfo(obj)
    const addressModel = await DeliveryAddress.PageSearch({ CustomerId: customers.ID })
    this.data.addressModel = addressModel //类属性
    const address = await addressModel.getMoreData();//todo
    this.setData({
      address,
      customers
    })
  },
  /**
*
* 页面上拉触底事件的处理函数
*/
  onReachBottom: async function () {

    const data = await this.data.addressModel.getMoreData();
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
    this.setData({
      address: data
    })
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },
  onAddAddress: function () {
    wx.navigateTo({
      url: '/pages/subpackages/mall/product/addressAdd/index',
    })
  },

  onSelectAddress(e){
    console.log(e)
    let address=e.currentTarget.dataset.cell;
    wx.setStorageSync("ShippingAddress", address)
    wx.navigateBack()
  },
  async onDefault (e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    const address = await DeliveryAddress.UpdateStatus({ ID: id})
    this.initAllData()

  },
    async onDelete(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    const address = await DeliveryAddress.Delete({ ID: id })
    this.initAllData()

  }


})