const app = getApp();
import { Area } from "../../../../../models/area.js";
import { DeliveryAddress } from "../../../../../models/deliveryAddress.js";
import { Customers } from "../../../../../models/customers.js";

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
    this.WxValidate = app.WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true
      },
      address: {
        required: true,
      },
    }, {
        name: {
          required: '请输入姓名',
        },
        phone: {
          required: '请输入手机号',
        },
        address: {
          required: '请输入所在地址',
        }
      })
    let obj={
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID")
    }
    const customers = await Customers.GetCustomersInfo(obj)
    const data = await Area.Search({})
    this.setData({
      data,
      customers
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
  async formSubmit (e){
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      console.log(this.WxValidate.errorList)
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      });
      return false
    }
    let regionValue = this.data.regionValue
    if (regionValue.length<1){
      wx.showToast({
        title: "请选择所在地区",
        icon: 'none',
        duration: 2000
      });
      return false
    }
    let obj={
      CustomerId: this.data.customers.ID,
      EnterpriseID: app.config.EnterpriseID,
      RealName: params.name,
      TelPhone:params.phone,
      Country:'中国',
      Province: regionValue[0].name,
      City: regionValue[1].name,
      Area: regionValue[2].name,
      Street: params.address,
      Code: `${regionValue[0].id},${regionValue[1].id},${regionValue[2].id}`,
      IsDefaultAddress: params.IsDefaultAddress ? 1:0,
      CreationPerson: wx.getStorageSync('OpenID')


    }
    const address = await DeliveryAddress.Add(obj)
    if (address.ResultBool){
        wx.showModal({
          title: '提示',
          content: '添加成功',
          showCancel:false,
          success:res=>{
            wx.navigateBack()
          }
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '添加失败，请检查网络稍后再试',
        showCancel: false,
        success: res => {
        }
      })
    }
  }
})