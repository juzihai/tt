// pages/subpackages/mall/company/staffList/index.js
const app = getApp();
import { Staff } from '../../../../../models/staff.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffModel: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {

    let obj = {
      "EnterpriseID": app.config.EnterpriseID,
    }

    const staffModel=await Staff.PageSearch(obj)
    this.data.staffModel = staffModel 
    const staff = await staffModel.getMoreData();//todo
    this.setData({
      staff
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const staff = await this.data.spuPaging.getMoreData();
    if(!staff){
      return;
    }
    this.setData({
      staff
    })
  },
  onPhone(e) {
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  previewImage(e) {
    var currentImage = e.currentTarget.dataset.image
    var imageList = []
    imageList.push(currentImage)

    wx.previewImage({
      urls: imageList,
      current: currentImage
    })
  },

})