import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";
//第三方
var QQMapWX = require('../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({ // 实例化API核心类
  key: 'L22BZ-JQJ6J-YU3F6-KIUWD-TVUWJ-WJF5W' // 必填
})
/**app相关功能 */
class AppModel extends Http {
  //获取定位授权
  static getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          console.log('get-setting', res.authSetting);
          // 只返回用户请求过的授权
          let auth = res.authSetting;
          if (auth['scope.userLocation']) {
            // 已授权，申请定位地址
            resolve()
          } else if (auth['scope.userLocation'] === undefined) {
            // 用户没有请求过的授权，不需要我们主动弹窗，微信会提供弹窗
            resolve()
          } else if (!auth['scope.userLocation']) {
            // 没有授权过，需要用户重新授权
            // 这个弹窗是为了实现点击，不然openSetting会失败
            wx.showModal({
              title: '是否授权当前位置？',
              content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
              success: res => {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {
                      console.log('open-setting-suc', res.authSetting);
                      let setting = res.authSetting;
                      if (!setting['scope.userLocation']) {
                        wx.showToast({
                          title: '地址授权失败，定位功能无法使用',
                          icon: 'none',
                        });
                        reject()
                      } else {
                        // 地址授权成功，申请定位地址
                        resolve()
                      }
                    },
                    fail(err) {
                      // 需要点击，有时候没有点击，是无法触发openSetting
                      console.log('open-setting-fail', err);
                      reject()
                    }
                  })
                } else {
                  reject()
                }
              }
            })
          }
        }
      })
    })
  }

  //刷新定位
  static getUserLocation(e) {
    return new Promise((resolve, reject) => {
      // type 默认 wgs84 坐标，返回 gps 坐标， type 为 gcj02 返回可用于 wx.openLocation的坐标。
      wx.getLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success: function (res) {
          console.log(res) 
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              console.log('刷新当前位置数据sdk:', res)
              wx.setStorageSync("ad_info", res['result']['ad_info'])
              wx.setStorageSync("location", res['result']['location'])
              wx.setStorageSync("address", res['result']['address'])
              resolve(res)

            },
            fail: function (res) {
              console.log(res);
              reject(res)
            },

          })

        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      })
    });

  }

}
export {
  AppModel
}
