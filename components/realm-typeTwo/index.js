// components/realm/index.js
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
    previewImg: String,
    currentSkuCount: Cart.SKU_MIN_COUNT,//当前选择的商品数量
    stock:0
  },
  observers: {
    'spu':function(spu) {
      if (!spu) {
        return
      }
      this.processNoSpec(spu)
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
      this.setStockStatus(spu.Stock, this.data.currentSkuCount)
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
    onSpecAdd(){
      this.triggerEvent('specadd', {
        orderWay: this.properties.orderWay,
        spu: this.properties.spu,
        currentSkuCount: this.data.currentSkuCount
      })
    },
    // 处理商品数据
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.ShowResourcesUrl+ sku.CoverImage,
        title: sku.ProductName,
        price: sku.Price,
        discountPrice: sku.GroupPrice,
        stock: sku.Stock,
      })
    },
    // 组件数量选择器更改触发函数
    onSelectCount(event) {
      const currentCount = event.detail.count
      this.data.currentSkuCount = currentCount

      this.setStockStatus(this.properties.stock, currentCount);
    }
  }




})
