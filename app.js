//app.js
import {
  Customers
} from "/models/customers";
import {
  Company
} from "/models/company.js";
import {
  config
} from "./config/config";
const util = require('utils/util.js');

App({
  config: config,
  util: util,
  onLaunch: function() {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      },
    })
    Company.SearchModelDetails(config.EnterpriseID).then(res => {
      console.log(res)
      let shopInfo = res

      if (this.shopInfoReadyCallback) {
        this.shopInfoReadyCallback(res)
      }
      wx.setStorageSync('shopInfo', shopInfo)

    })


    this._login()

  },
  async _login() {
    try {
      const code = await Customers.Login()
      const openIDAndKey = await Customers.GetWeChatOpenIDAndKey(config.EnterpriseID, code)
      let OpenID = openIDAndKey.OpenID
      // this.globalData.OpenID = OpenID;
      // this.globalData.SessionKey = openIDAndKey.Session_key;
      wx.setStorageSync("OpenID", OpenID);
      wx.setStorageSync("SessionKey", openIDAndKey.Session_key);
      const register = await Customers.RegisterCustomers({
        OpenID
      })
      if (this.globalData.SharOpenID) {
        let obj = {
          EnterpriseID: config.EnterpriseID,
          OpenIDOne: this.globalData.SharOpenID,
          OpenIDTwo: OpenID
        }
        Customers.MyCustomersSave(obj)
      }
    } catch (e) {

    }
  },
  globalData: {
    // OpenID: null,
    // SessionKey: null,
    SharOpenID: null,
  }
})