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
      if (banner.Data.length === 0) {
        return;
      }
      //根据json的名称进行数据绑定
      // const left = banner.Data.find(i => i.name === 'left'); //js6的语法
      // const rightTop = banner.Data.find(i => i.name === 'right-top');
      // const rightBottom = banner.Data.find(i => i.name === 'right-bottom');
      const left = banner.Data[0]
      const rightTop = banner.Data[1]
      const rightBottom = banner.Data[2]
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

      wx.navigateTo({
        url: `/pages/subpackages/mall/activity/activityDetail/index?id=${banner_id}&pagePath=hotActivity`
      })

      // var that = this;
      // that.setData({
      //   animation: 'shake'
      // })
      // setTimeout(function () {
      //   that.setData({
      //     animation: ''
      //   })
      // }, 1000)

    }

  },

})