import {getWindowHeightRpx} from "../../../../../utils/system";

const app = getApp()
import {HotelRoomType} from "../../../../../models/hotelRoomType";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StartValidityTime:null,
    EndValidityTime:null,
    selectDay:null,//选中的日期天数
    TotalRoom:1,
    OrderMoney:0,
    PayMoney:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    let obj = JSON.parse(options.obj)
    this.setData({
      h,
      id: obj.ID,
      StartValidityTime: obj.StartValidityTime,
      EndValidityTime: obj.EndValidityTime,
      selectDay: obj.selectDay
    })
    this.WxValidate = app.WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true
      },
      number: {
        required: true,
      },
    }, {
      name: {
        required: '请输入姓名',
      },
      phone: {
        required: '请输入手机号',
      },
      number: {
        required: '请输入房间数',
      }
    })


    this.initData()
    this.initDataAll()
  },
  async initData() {
    let StartValidityTime= app.util.tsFormatTime(this.data.StartValidityTime,'YMD')
    let EndValidityTime= app.util.tsFormatTime(this.data.EndValidityTime,'YMD')
    let obj = {
      ID: this.data.id,
      StartValidityTime,
      EndValidityTime,
      TotalDay: this.data.selectDay,
      TotalRoom: this.data.TotalRoom
    }
    const order = await HotelRoomType.PageSearchOrderWX(obj)
    this.setData({
      order,
      OrderMoney:order.TotalMoney.toFixed(2),
      PayMoney:order.TotalMoney.toFixed(2),
    })
   
  },
  async initDataAll() {
    const roomData = await HotelRoomType.PageSearchProperty(this.data.id)
    this.setData({
      roomData,
    })

  },
  onRoomNumber(e){
    console.log(e)
    let value=e.detail.value
    if(value){
      this.data.TotalRoom=value
      this.initData()
    }

  },




  formSubmit: app.util.throttle(async function (e) {
    const params = e.detail.value

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      });
      return false
    }
    let {
      name,
      phone
    } = e.detail.value
    let OpenID = wx.getStorageSync('OpenID')

    let StartValidityTime= app.util.tsFormatTime(this.data.StartValidityTime,'YMD')
    let EndValidityTime= app.util.tsFormatTime(this.data.EndValidityTime,'YMD')
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
      HotelRoomTypeId: this.data.id,
      OpenID: OpenID,
      Name: name,
      Phone: phone,
      TotalRoom: this.data.TotalRoom,
      TotalDay: this.data.selectDay,
      StartValidityTime,
      EndValidityTime,
      OrderMoney: this.data.OrderMoney,
      PayMoney: this.data.PayMoney
    }
    const order = await HotelRoomType.HotelPayOrder(obj)
    if (order){
      // wx.navigateTo({
      //   url: '/pages/subpackages/mall/product/orderListTypeOne/index', 
      // })
      this.wxPay(order)
    }

  }, 1000),

    //支付
    wxPay: function (obj) {
      let that =this;
  
        wx.requestPayment({
          'timeStamp': obj.wcPayDataTimeStamp,
          'nonceStr': obj.wcPayDataNonceStr,
          'package': obj.wcPayDataPackage,
          'signType': obj.wcPayDataSignType,
          'paySign': obj.wcPayDataPaySign,
          'success': function (res) {
            console.log('请求出数据啦1', res)
            // payModel.OrderNotice(that.data.orderNumber).then(res=>{
              wx.showModal({
                title: '提示',
                content: '您已支付成功,即将跳转到订单列表',
                showCancel:false,
                success(res){
                  wx.navigateTo({
                    url: '/pages/subpackages/mall/product/orderListTypeOne/index',
                  })
                }
              })
            // })

          },
          'fail': function (res) {
            console.log('请求出数据啦2', res)
            var errMsg = res.errMsg;
            if (errMsg == "requestPayment:fail cancel")
              wx.showToast({
                title: '已取消支付',
                icon: 'none',
                duration: 2000
              })
          } 
        });
  
    },
    
})