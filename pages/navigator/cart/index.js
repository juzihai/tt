const app=getApp()
import { ShoppingCart } from "../../../models/shoppingCart.js";
import { OrderAndPayLogic } from "../../../models/orderAndPayLogic.js";
import {
  getWindowHeightRpx
} from "../../../utils/system";

Page({
  data: {
    total: '0.00',
    count:0,
    selectAllStatus: false,
    usableCartListModel:[],//可用购物车数据源
    loseCartListModel:[],//失效购物车数据源
  },
  onPullDownRefresh() {
    this.initAllData();
  },
  onLoad: async function (options) {

  
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100; // 100 是底部tabbar的高度  自定义的tabbar高度是不包含在 windowHeight里的
    this.setData({
      h
    })

  },
  onShow(){
    this.initAllData()
  },
  async initAllData(){
    let obj = {
      EnterpriseId: app.config.EnterpriseID,
      OpenId: wx.getStorageSync('OpenID')
    }
    const payState = await OrderAndPayLogic.GetPayAndLogisticsState({ EnterpriseID: app.config.EnterpriseID,})
    const shoppingCartModel = await ShoppingCart.Query(obj)
    this.data.shoppingCartModel = shoppingCartModel;
    const shoppingCart = await shoppingCartModel.getMoreData()

    this.group(shoppingCart.accumulator)
    this.setData({
      payState: payState.ResultValue,
      shoppingCart,
      total: '0.00',
      count: 0,
      selectAllStatus: false
    })
  },
  group(array){
    let usableList=[];
    let loseList=[];
    array.forEach(item=>{
      if (item.IsBuy==1){
        usableList.push(item)
      } else if (item.IsBuy == 0){
        loseList.push(item)
      }
    })
    // const sorted = this.groupBy(usableList,function(item){
    //   return [item.ClassID];
    // })
    // console.log(sorted);
    this.setData({
      usableCartListModel: usableList,//可用购物车数据源
      loseCartListModel:loseList,//失效购物车数据源
    })
  },
  groupBy(array, f) {

    const groups={};
    array.forEach(o=>{
      const group =JSON.stringify(f(o));
      groups[group] =groups[group] ||[];
      groups[group].push(o);
    })
    return Object.keys(groups).map(function(group){
      return groups[group];
    })
  },

  onChangeTap(e){
    let items = this.data.usableCartListModel;
    
    items.forEach(item=>{
      if(item.ID == e.detail.key){
        item.checked=e.detail.checked;
      }
    })
    //这里由于checked 本身就是布尔值，可以直接返回isSelect ，所以可以简写成
    let selectAllStatus = items.every(item => item.checked)
    let key = `usableCartListModel`
    this.setData({
      [key]: items,
      selectAllStatus
    })

    this.sum();
     //判断是否全选

  },
  /**处理新增和减少 */
  async onSelectCount(e){
    console.log(e)
    let index=e.currentTarget.dataset.index
    let cell = e.currentTarget.dataset.cell
    let type=e.detail.type

    let usableCartListModel = this.data.usableCartListModel;
    usableCartListModel[index].ProductNum = e.detail.count;
    usableCartListModel[index].ProductCountPrice = e.detail.count * usableCartListModel[index].ProductPrice;
    this.setData({
      usableCartListModel
    })
    this.sum();

    let obj = {
      OpenId: wx.getStorageSync("OpenID"),
      EnterpriseId:app.config.EnterpriseID,
      ProductID: cell.ProductID,
      ProductNum: type === "reduce" ? -1 : 1 ,
      ProductType:1,
    }


    const add=await ShoppingCart.Add(obj)

  },
/**  计算总金额 及商品数量*/
sum: function () {
  let items = this.data.usableCartListModel;
  let total = 0.00;
  let count =0;
  items.forEach(item => {
    if (item.checked) {
      total += item.ProductPrice * item.ProductNum,
        count += item.ProductNum
    }
  })
  // 写回经点击修改后的数据
  this.setData({
    total: total.toFixed(2), //保留小数点后两位
    count
  });
},
//删除
  async onDelete(e){
    let cell = e.currentTarget.dataset.cell
    wx.lin.showToast({
      title: '处理中～',
    })
    let Ids=[]
    Ids.push(cell.ID)
    let obj = {
      Ids
    }
    const add = await ShoppingCart.RemoveProduct(obj)
    this.initAllData()
    wx.lin.hideToast()
  },
//全选
onSelectedAllTap(e){
  let selectAllStatus = !this.data.selectAllStatus
  // let shoppingCart = this.data.shoppingCart
  // if (!shoppingCart) {
  //   return
  // }
  let items = this.data.usableCartListModel;

  items.forEach(item => {
    item.checked = selectAllStatus;
  })
  let key = `usableCartListModel`
  this.setData({
    [key]: items,
    selectAllStatus
  })
  this.sum();
},
onNextTap(){
  let payState = this.data.payState;
  if (!payState.Pay){
    wx.showModal({
      title: '提示',
      content: '暂未开通支付，请联系店铺管理员',
    })
    return
  }
  let usableCartListModel = this.data.usableCartListModel
  let ProductlList=[];
  usableCartListModel.forEach(item=>{
    if (item.checked) {
      ProductlList.push(item)
    }
  })
  // const sorted = this.groupBy(ProductlList,function(item){
  //     return [item.ClassID];
  //   })
  //   console.log(sorted);
  let ProductModel={
    ProductCount:this.data.count,
    ProductPrice:this.data.total,
    ProductlListModel: ProductlList
  }
  wx.navigateTo({
    url: '/pages/subpackages/mall/product/order/index?ProductModel='+JSON.stringify(ProductModel),
  })

}


})