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
    judger: Object,
    previewImg: String,
    currentSkuCount: Cart.SKU_MIN_COUNT
  },
  observers: {
    'spu':function(spu){
      if(!spu){
        return
      }
      // TODO 无规格判断
      // if (Spu.isNoSpec(spu)){
        this.processNoSpec(spu)
      // }else{
      //   this.processHasSpec(spu)
      // }
      // TODO 点击事件
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
      this.setStockStatus(10,this.datacurrentSkuCount)
    },
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
        previewImg: spu.ProductImage,
        title: spu.ProductName,
        price: spu.Price,
        discountPrice: spu.DiscountPrice,
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.ProductImage,
        title: sku.ProductName,
        price: sku.Price,
        discountPrice: sku.DiscountPrice,
        stock: 10,
      })
    },
    // TODO 数量选择 
    onSelectCount(event) {
      console.log(event)
      const currentCount = event.detail.count
      // this.data.currentSkuCount = currentCount

      // if (this.data.judger.isSkuIntact()) {
      //   const sku = this.data.judger.getDeterminateSku();
      this.setStockStatus(10, currentCount);
      // }
    },

   // TODO 规格选择 
    onCellTab(event) {

    }
  }

})
