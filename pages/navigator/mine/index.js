// pages/navigator/mine/index.js
const app = getApp();
import { Customers } from "../../../models/customers.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modulecArr: [
      { img: '/imgs/mine/bar1.png', name: '我的积分', url: '' },//pages/subpackages/integral/pages/integral/index
      { img: '/imgs/mine/bar2.png', name: '我的浏览', url: '' },
      { img: '/imgs/mine/bar3.png', name: '我的历史', url: '/pages/subpackages/integral/pages/mytextdrive/index' },//
      { img: '/imgs/mine/bar4.png', name: '我的活动', url: '' },//pages/subpackages/activity/pages/luckyDraw/index
    ],
    listArr: [
      { name: '完善信息', url: '/pages/subpackages/integral/pages/addInfo/index' },
      { name: '积分排行', url: '' }, ///pages/subpackages/integral/pages/integral-ranking/index
      { name: '我的收藏', url: '/pages/subpackages/cars/pages/cars-make/index' },//
      { name: '我的订单', url: '' },
      { name: '优惠券', url: '/pages/subpackages/mall/cards/coupon/index' },
      // { name: '收藏', url: '' },
    ],
    phoneNumber: null,
    signIn: '点击签到',
    login:true, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phoneNumber = wx.getStorageSync('phoneNumber')
    this.setData({
      phoneNumber,
      login: phoneNumber? true:false
    })

  },

  async onGetPhoneNumber(res){
    console.log('点击按钮获取个人信息', res)
    let detail = res.detail;
    let EncryptedData = detail.encryptedData;
    let IV = detail.iv;
    if (detail.errMsg == 'getPhoneNumber:ok') { //获取到用户信息成功

      const SessionKey = app.globalData.openIDAndKey.Session_key
      const OpenID = app.globalData.openIDAndKey.OpenID
      const loginInfo = await Customers.GetWeChatUserInfo({ SessionKey, EncryptedData, IV})
      const register = await Customers.RegisterCustomers({ Phone: loginInfo.phoneNumber, OpenID })
      wx.setStorageSync("phoneNumber", loginInfo.phoneNumber);

      this.setData({
        login:true,
        phoneNumber: loginInfo.phoneNumber
      })
    }
  },

    // 点击列表
  click_list(e) {

    var bean = e.currentTarget.dataset.bean;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    if (bean.url == '') {
      wx.showModal({
        title: '提示',
        content: '功能暂未开放，尽情期待',
      })
    } else {
      if (index == 0) {
        // var phone = wx.getStorageSync('loginInfo').phone;
        //   if (phone) {
        //     wx.showModal({
        //       title: '提示',
        //       content: '您已身份验证',
        //     })
        //     return;
        //   }
        this._manageLogin()
      } else {
        wx.navigateTo({
          url: bean.url,
        })
      }

    }

  },
})