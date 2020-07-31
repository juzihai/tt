// pages/subpackages/mall/product/orderDetailTypeOne/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order=JSON.parse(options.item) 
    this.setData({
      order
    })

  },
  onShopPhone(e) {
    let itemList = [{
      name: '拨打电话',
      icon: 'phone'
    }, {
      name: '地图导航',
      icon: 'address'
    }]
    wx.lin.showActionSheet({
      itemList,
      showCancel: true,
      success: (res) => {
        let name = res.item.name
        let shopInfo = wx.getStorageSync('shopInfo')
        switch (name) {
          case '拨打电话':
            let phoneNumber = shopInfo.Phone
            wx.makePhoneCall({
              phoneNumber,
            })
            break;
          case '地图导航':
            wx.openLocation({
              latitude: shopInfo.Latitude,
              longitude: shopInfo.Longitude,
              scale: '16',
              name: shopInfo.CompanyName,
              address: shopInfo.Address,
            })
            break;
        }
      }
    })
  },
})        