// pages/navigator/home.js
import {
  product
} from '../../../models/product.js'
//使用类下的实例化方法 不能直接Http.request. 需先实例化类的对象


Page({

  /**
   * 页面的初始数据
   */
  data: {
    "HuoDong": [{
        img: "images/1.jpg",
        name: "名1"
      },
      {
        img: "images/2.jpg",
        name: "名2"
      },
      {
        img: "images/1.jpg",
        name: "名3"
      },
      {
        img: "images/2.jpg",
        name: "名4"
      },
      {
        img: "images/1.jpg",
        name: "名5"
      },
      {
        img: "images/2.jpg",
        name: "名6"
      },
      {
        img: "images/1.jpg",
        name: "名7"
      },
      {
        img: "images/8.jpg",
        name: "more"
      }
    ],
    "SwiperImg": [{
        img: "images/y1.png"
      },
      {
        img: "images/y2.png"
      },
      {
        img: "images/y3.png"
      }
    ],
    "HaoPin": [{
        img: "images/h1.jpg",
        name: "上衣",
        price: "100",
        tag: "1"
      },
      {
        img: "images/h2.jpg",
        name: "长裙",
        price: "200",
        tag: "0"
      },
      {
        img: "images/h3.jpg",
        name: "卫衣",
        price: "250",
        tag: "0"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this._loadData() //加载页面数据
  },
  _loadData() {
    let obj = {
      "EnterpriseID": "242415",
      "ProductCode": "",
      "ProductName": "",
      "Page": 1,
      "Limit": 10
    }
    //产品查询
    product.PageSearch(obj.EnterpriseID, obj.ProductCode, obj.ProductName, obj.Page, obj.Limit).then(res => {

      console.log('在页面中接受的res=', res)
    });
  },

})