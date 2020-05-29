// pages/subpackages/propaganda/article/articleDetail/index.js
const app = getApp();
import { FinanceProduct } from "../../../../../models/financeProduct.js";
import { Staff } from "../../../../../models/staff.js";

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
      id,
      staffModel
    })
    let result = app.towxml(articleModel.Content, 'markdown', {
      // base: 'https://xxx.com',             // 相对资源的base路径
      // theme: 'dark',                   // 主题，默认`light`
      events: {                    // 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
        }
      }
    })
    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
    });


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
  onGotoHome() {
    wx.switchTab({
      url: '/pages/navigator/index/index',
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
      let id = this.data.id;
    wx.navigateTo({
      url: `/pages/subpackages/mall/company/staffRelationList/index?id=${id}`,
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