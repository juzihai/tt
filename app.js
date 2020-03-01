//app.js
import {
  Customers
} from "/models/customers";
import {
  Company
} from "/models/company.js";
import {
  AppModel
} from "/models/app.js";
import {
  Location
} from "/models/location.js";
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
    this._addLocation(1)

  },
  _addLocation(Type){
    // 用户授权
    AppModel.getSetting().then(res => {
      // 用户定位
      return AppModel.getUserLocation()
    }).then(res => {
      console.log(res)
      let location = res['result']["location"]
      let Address = res['result']["address"]
      let AdInfo = res['result']["ad_info"]
      let Phone = wx.getStorageSync("phoneNumber")
      const d = new Date();
      const CreatTime = d.toUTCString()
      if(Phone){
        let obj = {
          OpenID: wx.getStorageSync("OpenID"),
          Phone: Phone,
          EnterpriseID: config.EnterpriseID,
          Nation: AdInfo.nation,
          Province: AdInfo.province,
          City: AdInfo.city,
          Area: AdInfo.district,
          Address,
          Lat: location.lat,
          Lng: location.lng,
          CreatTime,
          Type
        }
        Location.AddLocation(obj)
      }

    })

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