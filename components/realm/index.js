// components/realm/index.js
import { Spu } from "../../models/spu";
import { Cart } from "../../models/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    orderWay: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,// TODO 预留
    previewImg: String,
    currentSkuCount: Cart.SKU_MIN_COUNT,//当前选择的商品数量
    stock:0
  },
  observers: {
    'spu':function(spu){
      if(!spu){
        return
      }
      // TODO 判断是否是有规格的产品，后续根据数据结构改变spu内的判断
      // if (Spu.isNoSpec(spu)){
        this.processNoSpec(spu)
      // }else{
      //   // TODO 有规格的处理
      //   this.processHasSpec(spu)
      // }

      this.triggerSpecEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 没有规格的情况
    processNoSpec(spu) {
      this.setData({
        noSpec:true
      })
      this.bindSkuData(spu);
      // TODO 可购买总数 当前选择数量
      this.setStockStatus(spu.SalesStock,this.datacurrentSkuCount)
    },
     // TODO 有规格的情况
    processHasSpec(spu) {
      //处理商品数据
      this.bindSpuData();
    },
    onSpecAdd(){
      this.triggerEvent('specadd', {
        orderWay: this.properties.orderWay,
        spu: this.properties.spu,
        currentSkuCount: this.data.currentSkuCount
      })
    },
    triggerSpecEvent() {
      // TODO 判断是否是有规格的产品
      const noSpec = Spu.isNoSpec(this.properties.spu)
      console.log("点击事件")
      if(noSpec){
        this.triggerEvent('specchange', {
          noSpec
        })
      }else{
        this.triggerEvent('specchange', {
          noSpec: Spu.isNoSpec(this.properties.spu),
          // skuIntact: this.data.judger.isSkuIntact(),
          // currentValues: this.data.judger.getCurrentValues(),
          // missingKeys: this.data.judger.getMissingKeys()
        })
      }
    },
    setStockStatus(stock, currentCount){
      this.setData({
        outStock: this.isOutOfStock(stock,currentCount)
      })
    },
    //当前数量大于可购买数量时返回true 即暂时缺货
    isOutOfStock(stock, currentCount) {
      return stock < currentCount
    },
    // 处理商品数据
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: sku.ShowResourcesUrl +spu.ProductImage,
        title: spu.ProductName,
        price: spu.Price,
        discountPrice: spu.DiscountPrice,
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.ShowResourcesUrl+ sku.ProductImage,
        title: sku.ProductName,
        price: sku.Price,
        discountPrice: sku.DiscountPrice,
        stock: sku.SalesStock,
      })
    },
    // 组件数量选择器更改触发函数
    onSelectCount(event) {
      console.log(event)
      const currentCount = event.detail.count
      this.data.currentSkuCount = currentCount

      // TODO 如含有规格用规格下的数据判断
      // if (this.data.judger.isSkuIntact()) {
      //   const sku = this.data.judger.getDeterminateSku();
      this.setStockStatus(this.properties.stock, currentCount);
      // }
    },

   // TODO 规格选择 
    onCellTab(event) {

    }
  }

})
