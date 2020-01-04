// pages/navigator/home/home.js
import {
  ProductModel
} from '../../../models/product.js'
import { icon, List, swiperList} from 'parameter.js'
//使用类下的实例化方法 不能直接Http.request. 需先实例化类的对象
let productModel = new ProductModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon,
    TabCur: 0,
    scrollLeft: 0,
    List,
    swiperList,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    })
    if (e.currentTarget.dataset.id == 0){
      this.setData({
        hiddenName1: false,
        hiddenName2:true,
        hiddenName3: true,
      })
    }
      if (e.currentTarget.dataset.id == 1) {
        this.setData({
          hiddenName1: true,
          hiddenName2: false,
          hiddenName3: true,
        })
      }
        if (e.currentTarget.dataset.id == 2) {
          this.setData({
            hiddenName1: true,
            hiddenName2: true,
            hiddenName3: false,
          })
        }
  },

  onLoad() {
    this.towerSwiper('swiperList');
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this._loadData() //加载页面数据
    if (this.data.TabCur == 0) {
      this.setData({
        hiddenName1: false,
        hiddenName2: true,
        hiddenName3: true,
      })
    }
    if (this.data.TabCur== 1) {
      this.setData({
        hiddenName1: true,
        hiddenName2: false,
        hiddenName3: true,
      })
    }
    if (this.data.TabCur== 2) {
      this.setData({
        hiddenName1: true,
        hiddenName2: true,
        hiddenName3: false,
      })
    }
  },

  _loadData() {
    let obj={
      "EnterpriseID": "242415",
      "ProductCode": "",
      "ProductName": "",
      "Page": 1,
      "Limit": 10
    }
    //产品查询
    productModel.search(obj.EnterpriseID, obj.ProductCode, obj.ProductName, obj.Page,obj.Limit).then(res => {

      console.log('在页面中接受的res=',res)
    });
  },
  

})
