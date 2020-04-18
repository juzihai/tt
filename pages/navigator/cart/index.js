const app=getApp()
import { Area } from "../../../models/area.js";
import { ShoppingCart } from "../../../models/shoppingCart.js";
import {
  getWindowHeightRpx
} from "../../../utils/system";

Page({
  data: {

  },

  onLoad: async function (options) {

  
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h
    })
    this.initAllData()
  },
  async initAllData(){
    let obj = {
      EnterpriseId: app.config.EnterpriseID,
      OpenId: wx.getStorageSync('OpenID')
    }
    const shoppingCartModel = await ShoppingCart.Query(obj)
    this.data.shoppingCartModel = shoppingCartModel;
    const shoppingCart = await shoppingCartModel.getMoreData()

    this.setData({
      shoppingCart
    })
  },

  onChangeTap(e){
    let items = this.data.shoppingCart.accumulator;
    items.forEach(item=>{
      if(item.ID == e.detail.key){
        item.checked=e.detail.checked;
      }
    })
    let key = `shoppingCart.accumulator`
    this.setData({
      [key]: items
    })

  },
  onSelectCount(e){
    console.log(e)
  }
})