// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object
  },
  /**数据监听器 */
  observers: {
    'banner': function(banner) {
      if (!banner) {
        return;
      }
      if (banner.items.length === 0) {
        return;
      }
      //根据json的名称进行数据绑定
      const left = banner.items.find(i => i.name === 'left'); //js6的语法
      const rightTop = banner.items.find(i => i.name === 'right-top');
      const rightBottom = banner.items.find(i => i.name === 'right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      })

    }

  },
  /**
   * 组件的初始数据
   */
  data: {
    left: null,
    rightTop: null,
    rightBottom: null
  },
  //组件进入页面时执行
  attached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap(event){
      console.log('点击了更多')

    },
    onItemTap(event){
      const banner_id = event.currentTarget.dataset.banner_id
      console.log('点击了商品：banner_id为', banner_id)
    }

  },

})