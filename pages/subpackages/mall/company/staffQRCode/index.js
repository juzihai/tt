const app = getApp();
import {
  File
} from "../../../../../models/file.js";
Page({
  data: {

  },
  onLoad: async function (options) {
    let pid = this.data.pid;
    let pcode = this.data.pcode;
    let OpenID = wx.getStorageSync('OpenID')
    let url = encodeURIComponent('/pages/navigator/index/index');

    let dic={
      SharOpenID:OpenID
    }
    
    let obj={
      "EnterpriseID": app.config.EnterpriseID,
      ChannelCode: app.util.random(32),
      ChannelName:JSON.stringify(dic),
      type:0//员工二维码为0
    }
    wx.showLoading({
      title: '加载中～',
    })
    const file= await File.getQRcode(obj)
    this.setData({
      file
    })

  },

})