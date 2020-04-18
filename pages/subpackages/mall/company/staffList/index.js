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
    let pagePath = options.pagePath;
    console.log(pagePath)
    let obj;
    let staffModel;
    if (pagePath === "mine" ){
      obj = {
        "EnterpriseID": app.config.EnterpriseID,
        // IsService: 1
      }
      staffModel = await Staff.StaffServicePageSearch(obj)
    }else{
      obj = {
        "EnterpriseID": app.config.EnterpriseID,
        // IsModule: 1
      }
       staffModel = await Staff.StaffModulePageSearch(obj)
    }



    this.data.staffModel = staffModel 
    const staff = await staffModel.getMoreData();//todo
    this.setData({
      staff,
      pagePath
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.staffModel.getMoreData();
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
      staff: data
    })

    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
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