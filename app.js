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
      this.globalData.openIDAndKey = openIDAndKey;
      wx.setStorageSync("OpenID", openIDAndKey.OpenID);
      if (this.sharOpenID) {
        let obj = {
          EnterpriseID: config.EnterpriseID,
          OpenIDOne: this.sharOpenID,
          OpenIDTwo: openIDAndKey.OpenID
        }
        Customers.MyCustomersSave(obj)
      }
    } catch (e) {

    }
  },
  globalData: {
    userInfo: null,
    openIDAndKey: null,
    sharOpenID: null,
  }
})