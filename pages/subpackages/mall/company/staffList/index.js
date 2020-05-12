// pages/subpackages/mall/company/staffList/index.js
const app = getApp();
import { Staff } from '../../../../../models/staff.js'
const MAX_LINE_COUNT = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffModel: null,
    extend: false,
    isOverHeight: false,

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
    } else if (pagePath === "article") {
      obj = {
        "EnterpriseID": app.config.EnterpriseID,
        ClassID: options.ClassID
        // IsService: 1
      }
      staffModel = await Staff.PageSearchStaff(obj)
    }else{
      obj = {
        "EnterpriseID": app.config.EnterpriseID,
        // IsModule: 1
      }
       staffModel = await Staff.StaffModulePageSearch(obj)
    }



    this.data.staffModel = staffModel 
    const staff = await staffModel.getMoreData();//todo

    const companyModel = wx.getStorageSync('shopInfo')
    this.setData({
      staff,
      pagePath,
      companyModel
    })

    this.queryMultipleNodes();

  },
  extend() {
    this.setData({
      extend: !this.data.extend,
    }, () => {
      this.triggerEvent('extendText', {
        extend: this.data.extend
      })
    });

  },
  queryMultipleNodes() {
    let $this = this;
    const query = wx.createSelectorQuery().in($this)
    console.log(query)
    query.select('.content').fields({
      computedStyle: ['lineHeight'],
      size: true,
    }, function (res) {
      if (res) {
        console.log(res)
        const lineHeight = parseInt(res.lineHeight);
        console.log(lineHeight)
        if (lineHeight && res.height) {
          $this.setData({
            isOverHeight: (res.height / lineHeight) > MAX_LINE_COUNT,
          })
        }

      }
    }).exec();
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