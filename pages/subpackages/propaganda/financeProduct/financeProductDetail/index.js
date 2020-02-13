// pages/subpackages/propaganda/article/articleDetail/index.js
const app = getApp();
import { FinanceProduct } from "../../../../../models/financeProduct.js";
import { Staff } from "../../../../../models/staff.js";

var WxParse = require('../../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareList: [{
      name: '保存海报分享',
      image: '/images/response/picture.png',
      imageStyle: 'width:40rpx;height:40rpx;',
      color: '#3683D6'
    },
    {
      name: '转发给好友',
      icon: 'share',
      color: '#F4516C'
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let scene = options.scene;
    let id = 0
    if (scene) {
      scene = decodeURIComponent(scene);
      id = scene.id
    } else {
      id = options.id
    }
    let SharOpenID = wx.getStorageSync('SharOpenID')
    // let SharOpenID ='oCqZa5N9cTTH_rbUPt4NkIkQMC7E'
    let staffModel=null
    if (SharOpenID){
      let staffObj = {
        "ID": id,
        "EnterpriseID": app.config.EnterpriseID,
        OpenID: SharOpenID,
        Type: "FinanceProduct"
      }
      staffModel = await Staff.GetStaffRelation(staffObj)
    }



    const OpenID = wx.getStorageSync('OpenID');
    const d = new Date();
    const ReadTime = d.toUTCString()
    let obj = {
      "ID": id,
      ReadPerson: OpenID,
      ReadTime
    }
    FinanceProduct.UpdateReadAmount(obj)
    const articleModel = await FinanceProduct.SearchModelDetails(id)
    this.setData({
      articleModel: articleModel,
      article: articleModel,
      id,
      staffModel
    })

    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var that = this;
    WxParse.wxParse('articleModel', 'html', articleModel.Content, this, 5);


  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    let id = this.data.id;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent(`/pages/subpackages/propaganda/financeProduct/financeProductDetail/index?id=${id}`);

    return {
      title: "详情",
      path: `/pages/navigator/index/index?url=${url}&SharOpenID=${OpenID}`
    }
  },

  onAddToCart(e) {

  },
  onCardItem(e){
    let phoneNumber = this.data.staffModel.Phone
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  //联系我们
  onBuy(e) {

    let staffModel = this.data.staffModel
    if (staffModel){
      let itemList=[{
        name: staffModel.StaffName,
        image: staffModel.StaffName.HeadImage,
        phone: staffModel.Phone,
        icon: 'phone',
        imageStyle: 'width:40rpx;height:40rpx;',
        color: '#3683D6'
      },]

      this._showActionSheet({ itemList, showCancel: true })
    }else{
    wx.navigateTo({
      url: `/pages/subpackages/mall/company/staffList/index`,
    })
    }

  },
  _showActionSheet({ itemList, showCancel = false, title = '', locked = false }) {
    wx.lin.showActionSheet({
      itemList: itemList,
      showCancel: showCancel,
      title: title,
      locked,
      success: (res) => {
        console.log(res);
        wx.makePhoneCall({
          phoneNumber: res.item.phone,
        })

      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

  

})