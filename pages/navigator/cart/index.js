const app=getApp()
import { Area } from "../../../models/area.js";
import { ShoppingCart } from "../../../models/shoppingCart.js";
import {
  getWindowHeightRpx
} from "../../../utils/system";

Page({
  data: {
    total: '0.00',
    count:0,
    selectAllStatus: false,
    
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
    this.change(shoppingCart.accumulator)
    this.setData({
      shoppingCart,
      total: '0.00',
      count: 0,
      selectAllStatus: false
    })
  },
  change(items){
    console.log(items)
    let array=[]
    items.forEach(item=>{

    })
  },
  onChangeTap(e){
    let items = this.data.shoppingCart.accumulator;
    
    items.forEach(item=>{
      if(item.ID == e.detail.key){
        item.checked=e.detail.checked;
      }
    })
    //这里由于checked 本身就是布尔值，可以直接返回isSelect ，所以可以简写成
    let selectAllStatus = items.every(item => item.checked)
    let key = `shoppingCart.accumulator`
    this.setData({
      [key]: items,
      selectAllStatus
    })

    this.sum();
     //判断是否全选

  },
  /**处理新增和减少 */
  async onSelectCount(e){

    let cell = e.currentTarget.dataset.cell
    let type=e.detail.type
    wx.lin.showToast({
      title: '处理中～',
    })
    let obj = {
      OpenId: wx.getStorageSync("OpenID"),
      EnterpriseId:app.config.EnterpriseID,
      ProductId: cell.ProductId,
      ProductNum: type === "reduce" ? -1 : 1 ,
      ProductType:1,
    }
    const add=await ShoppingCart.Add(obj)
    this.initAllData()
    console.log(add)
    wx.lin.hideToast()
  },
/**  计算总金额 及商品数量*/
sum: function () {
  let items = this.data.shoppingCart.accumulator;
  let total = 0.00;
  let count =0;
  items.forEach(item => {
    if (item.checked) {
      total += item.ProductPrice * item.StockAmount,
        count += item.StockAmount
    }
  })
  // 写回经点击修改后的数据
  this.setData({
    total: total.toFixed(2), //保留小数点后两位
    count
  });
},
//全选
onSelectedAllTap(e){
  let selectAllStatus = !this.data.selectAllStatus
  let shoppingCart = this.data.shoppingCart
  if (!shoppingCart) {
    return
  }
  let items = shoppingCart.accumulator;

  items.forEach(item => {
    item.checked = selectAllStatus;
  })
  let key = `shoppingCart.accumulator`
  this.setData({
    [key]: items,
    selectAllStatus
  })
  this.sum();
},
onNextTap(){
  let ProductModel={
    ProductCount:this.data.count,
    ProductPrice:this.data.total,
    ProductlListModel: this.data.shoppingCart.accumulator
  }
  wx.navigateTo({
    url: '/pages/subpackages/mall/product/order/index?ProductModel='+JSON.stringify(ProductModel),
  })

}


})