// pages/navigator/mine/index.js
const app = getApp();
import { Customers } from "../../../models/customers.js";
import { IntegralRule } from "../../../models/integralRule.js";
import { Company } from "../../../models/company.js";
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modulecArr: [
      { img: '/imgs/mine/bar1.png', name: '全部订单', url: '/pages/subpackages/mall/product/orderList/index' },
      { img: '/imgs/mine/bar2.png', name: '我的优惠券', url: '/pages/subpackages/mall/cards/couponList/index' },
      { img: '/imgs/mine/bar3.png', name: '联系我们', url: '/pages/subpackages/mall/company/staffList/index?pagePath=mine' },
      { img: '/imgs/mine/bar4.png', name: '我的积分', url: '' },
    ],
    listArr: [
      { name: '我的历史', url: '' }, //
      { name: '我的活动', url: '' },

      { name: '我的收藏', url: '' },//
      { name: '我的浏览', url: '' },
    ],
    phoneNumber: null,
    signIn: '点击签到',
    login:true, 
    integralRuleDetail: '暂无',
    flag: false,
    checkedUserIsStaff:false
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
  async onShow(){
    //自动登陆设置
    app.util.promisic(wx.checkSession)().then(res => {
      console.log('session 生效', res)
    }, err => {
      console.log('session 失效', err)
      app._login();
    })

  this.initAllData()
    
  },

  async initAllData(){
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      OpenID: wx.getStorageSync("OpenID"),
    }
    const integralRuleModel = await IntegralRule.SearchModelDetails(obj)

    const customersModel = await Customers.GetCustomersInfo(obj)
    if (integralRuleModel) {
      let integralRuleDetail = `每消费${integralRuleModel.GeneratedPrice}元生成${integralRuleModel.GeneratingIntegral}积分,每花费${integralRuleModel.consumptionIntegral}点积分减免${integralRuleModel.consumptionPrice}元`
      this.setData({
        integralRuleDetail
      })
    }
    this.setData({
      customersModel,
    })
    let Phone= wx.getStorageSync('phoneNumber')
    if (Phone){
      let obj = {
        EnterpriseID: app.config.EnterpriseID,
        OpenID: wx.getStorageSync("OpenID"),
        Phone
      }
      const checkedUserIsStaff = await Customers.CheckedUserIsStaff(obj)
      this.setData({
        checkedUserIsStaff: checkedUserIsStaff.ResultBool,
      })
    }

  },

  async onGetPhoneNumber(res){
    console.log('点击按钮获取个人信息', res)
    let detail = res.detail;
    let EncryptedData = detail.encryptedData;
    let IV = detail.iv;
    if (detail.errMsg == 'getPhoneNumber:ok') { //获取到用户信息成功
      // try{
        wx.showLoading({
          title: '加载中请稍后',
        })
        const SessionKey = wx.getStorageSync('SessionKey');
        const OpenID = wx.getStorageSync('OpenID');
        const loginInfo = await Customers.GetWeChatUserInfo({ SessionKey, EncryptedData, IV })
        let launch = wx.getStorageSync('launch')
        const register = await Customers.AuthorizationCustomers({
          Phone: loginInfo.phoneNumber, OpenID, EnterpriseID:app.config.EnterpriseID,
          })
        wx.setStorageSync("phoneNumber", loginInfo.phoneNumber);
        let SharOpenID = wx.getStorageSync('SharOpenID')
        if (SharOpenID) {
          let obj = {
            EnterpriseID: app.config.EnterpriseID,
            OpenIDOne: SharOpenID,
            OpenIDTwo: OpenID
          }
          Customers.MyCustomersSave(obj)
        }
        wx.hideLoading()
        this.setData({
          login: true,
          phoneNumber: loginInfo.phoneNumber
        })
        this.initAllData()
        app._addLocation(2)
      // }catch(e){
      //   wx.hideLoading()
      // }

    }
  },
    // 点击列表
  click_list(e) {

    var bean = e.currentTarget.dataset.bean;
    var index = e.currentTarget.dataset.index;
    console.log(bean)
    console.log(index)
    if (bean.url == '') {
      wx.showModal({
        title: '提示',
        content: '功能暂未开放，尽情期待',
      })
    } else {
      // if (index == 0) {
        // var phone = wx.getStorageSync('loginInfo').phone;
        //   if (phone) {
        //     wx.showModal({
        //       title: '提示',
        //       content: '您已身份验证',
        //     })
        //     return;
        //   }
      //   this._manageLogin()
      // } else {
        wx.navigateTo({
          url: bean.url,
        })
      // }

    }

  },
  onMyQRCode(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/company/staffQRCode/index',
    })
  },
  onToMini(){
    console.log(111)
    wx.navigateToMiniProgram({
      appId: 'wxa93d39f1484ac31a',
      success: function (res) {

      },
      fail: function (err) {

      }
    })
  },
  checkAgreement(e) {
    var flag = e.detail.value[0];

    if (flag === undefined) {
      flag = false;

    } else {
      flag = true;
    }
    this.setData({
      flag: flag
    })
  },
  // 跳转协议
  terms() {
    // var modalName = this.data.modalName
    this.setData({
      modalName: agree
    })
  },
  async showModal(e) {
    const company = await Company.SearchModelAgreement({ EnterpriseID: app.config.EnterpriseID})

    var key = e.currentTarget.dataset.target;
    console.log(key)

    const article = company[key];

    // article = article.replace('?',' ')
    console.log(article)
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var that = this;
    WxParse.wxParse('article', 'html', article, this, 5);

    this.setData({
      scrolltop: 0,
      modalName: "agree"
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  noagree() {
    var flag = this.data.flag
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: '请先同意协议',
      })

    }
  },

})