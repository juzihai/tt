// pages/navigator/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modulecArr: [
      { img: '/imgs/mine/bar1.png', name: '我的积分', url: '' },//pages/subpackages/integral/pages/integral/index
      { img: '/imgs/mine/bar2.png', name: '我的浏览', url: '' },
      { img: '/imgs/mine/bar3.png', name: '我的历史', url: '/pages/subpackages/integral/pages/mytextdrive/index' },//
      { img: '/imgs/mine/bar4.png', name: '我的活动', url: '' },//pages/subpackages/activity/pages/luckyDraw/index
    ],
    listArr: [
      { name: '完善信息', url: '/pages/subpackages/integral/pages/addInfo/index' },
      { name: '积分排行', url: '' }, ///pages/subpackages/integral/pages/integral-ranking/index
      { name: '我的收藏', url: '/pages/subpackages/cars/pages/cars-make/index' },//
      { name: '我的订单', url: '' },
      { name: '优惠券', url: '' },
      // { name: '收藏', url: '' },
    ],
    phone: null,
    signIn: '点击签到',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})