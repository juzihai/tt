// pages/subpackages/mall/product/productDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[{
      id: 0,
      type: 'image',
      url: 'images/timg8.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'images/timg8.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'images/timg8.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'images/timg8.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'images/timg8.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'images/timg8.jpg'
    }
    ],
    
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
  onCheck(){
    wx.navigateTo({
      url: '/pages/subpackages/mall/cards/coupon/index',
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },
  
})