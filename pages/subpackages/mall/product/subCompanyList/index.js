const app = getApp();
import {
  SubCompany
} from "../../../../../models/subCompany.js";
import {
  getWindowHeightRpx
} from "../../../../../utils/system";

Page({
  data: {
    ContactName:null,
    ContactNumbr:null,
  },
  onLoad: async function(options) {
    this.WxValidate = app.WxValidate({
      name: {
        required: true,
      },
      phone: {
        required: true,
        tel: true
      }
    }, {
      name: {
        required: '请输入姓名',
      },
      phone: {
        required: '请输入手机号',
      }
    })
    let ContactName = options.ContactName;
    let ContactNumbr = options.ContactNumbr;
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h,
      ContactName,
      ContactNumbr
    })
  },

  onShow: function() {
    this.initAllData()
  },
  async initAllData() {
    let obj = {
      EnterpriseID: app.config.EnterpriseID,
    }
    const subCompanyModel = await SubCompany.PageSearch(obj)
    this.data.subCompanyModel = subCompanyModel //类属性
    const subCompany = await subCompanyModel.getMoreData(); //todo
    this.setData({
      subCompany
    })
  },
  onChangeTap(e) {
    let items = this.data.subCompany.accumulator;

    items.forEach(item => {
      if (item.ID == e.detail.key) {
        item.checked = true;
      }else{
        item.checked = false
      }
    })

    let key = `subCompany.accumulator`
    this.setData({
      [key]: items,
    })

  },
  /**
   *
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {

    const data = await this.data.subCompanyModel.getMoreData();
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
      subCompany: data
    })
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })

    }

  },

  async formSubmit(e) {
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
    wx.lin.showToast({
      title: '处理中～',
      mask: true
    })
    let subCompanyModel = this.data.subCompany.accumulator
    let subCompanyItem ;
    subCompanyModel.forEach(item => {
      if (item.checked) {
        subCompanyItem=item
      }
    })
    let name=params.name;
    let phone=params.phone;

    let pages = getCurrentPages();  // 获取当前页面栈
    let prevPage = pages[pages.length - 2]; // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
    // 直接操作上一个页面的 index数据 之后返回 
    prevPage.setData({
      subCompanyItem: subCompanyItem
    }, function () {
      wx.navigateBack()
    })

   
  }



})