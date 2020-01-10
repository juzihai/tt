// pages/navigator/home/home.js
import {

  Article
} from '../../../models/article.js'
//使用类下的实例化方法 不能直接Http.request. 需先实例化类的对象
let activeModel = new Article()
// pages/navigator/active-home/active-home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //热门种类
    hotKind: [{ 

      icon: 'location',

      title: '名称',

      url: '/pages/subpackages/activity/hotKind/location/index'

    },

    {

      icon: 'phone',

      title: '名称',

    },

    {

      icon: 'list',

      title: '名称',

    },

    {

      icon: 'add',

      title: '更多',

    }

    ]
 ,
    hotProduct:[],
    cardCur: 0,
    hotActivity:[],
    swiperList:[],
    ShowProductUrl:''
  },

  onHotKind(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url,
    })
  },

  onCheckMore(e){
    wx.navigateTo({
      url: '',
    })
  },

  onHotRec(e){
    wx.navigateTo({
      url: this.data.hotRec.ShowResourcesUrl,
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  onLoad() {
    this.towerSwiper('swiperList')
    this._loadData()
   
    // 初始化towerSwiper 传已有的数组名即可
  },
  // DotStyle(e) {
  //   this.setData({
  //     DotStyle: e.detail.value
  //   })
  // },
  // cardSwiper
  
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },

  _loadData() {
    // let hotactivity = {
    //   "EnterpriseID": "242415",
    //   "ActivityName": "",
    //   "Page": 1,
    //   "Limit": 10
    // }
    // //热门活动查询

    // HotActivity.PageSearch(hotactivity.EnterpriseID, hotactivity.ActivityName, hotactivity.Page, hotactivity.Limit).then(res => {
    //   console.log('在页面中接受的res=', res)
    //   this.setData({
    //     hotActivity: res.ResultValue.Data
    //   })
    //   console.log(this.data.hotActivity)
    // });

    // let hotproduct = {
    //   "EnterpriseID": "242415",
    //   "ProductCode": "",
    //   "ProductName":"",
    //   "Page": 1,
    //   "Limit": 10
    // }
    // //热门产品查询
    // HotActivity.search(hotproduct.EnterpriseID, hotproduct.ProductCode, hotproduct.ProductName,hotproduct.Page, hotproduct.Limit).then(res => {
    //   console.log('在页面中接受的res=', res)
    //   this.setData({
    //     hotProduct: res.ResultValue.Data,
    //     ShowProductUrl: res.ResultValue.ShowResourcesUrl
    //   })
    //   console.log(this.data.hotProduct)
    // });
  },
})