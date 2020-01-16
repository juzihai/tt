//app.js
import {Customers} from "/models/customers";
import {config} from "./config/config";
const util = require('utils/util.js');

App({
  config: config,
  util: util,
  onLaunch: function() {

    this._login()

  },
  async _login() {
    try {
      const code = await Customers.Login()
      const openIDAndKey = await Customers.GetWeChatOpenIDAndKey(config.EnterpriseID, code)
      this.globalData.OpenID = openIDAndKey.OpenID;
      this.globalData.SessionKey = openIDAndKey.Session_key;
      wx.setStorageSync("OpenID", openIDAndKey.OpenID);
      wx.setStorageSync("SessionKey", openIDAndKey.Session_key);
      if (this.globalData.SharOpenID) {
        let obj = {
          EnterpriseID: config.EnterpriseID,
          OpenIDOne: this.globalData.SharOpenID,
          OpenIDTwo: openIDAndKey.OpenID
        }
        Customers.MyCustomersSave(obj)
      }
    } catch (e) {

    }
  },
  globalData: {
    OpenID: null,
    SessionKey: null,
    SharOpenID: null,
  }
})