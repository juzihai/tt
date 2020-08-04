const myPage = Page
Page = function (e) {
  let {
    onLoad,
    onReady
  } = e
  e.onLoad = (() => { 
    return function (res) {
      // 收集页面信息
      this.runTimeInfo = {
              path: this.route,
              starTime: new Date().valueOf(),
                //...﻿其他信息
            }
            onLoad && onLoad.call(this, res)
    }
  })()
  e.onReady = (() => {
    return function (res) {
      // 继续收集页面信息
      this.runTimeInfo.readyTime = new Date().valueOf();
      this.runTimeInfo.runTime = this.runTimeInfo.readyTime - this.runTimeInfo.starTime;
      console.log('wwwwww',this.runTimeInfo);
      // 在此处上报收集的页面﻿信息this.runTimeInfo即可
      // your code here

      onReady && onReady.call(this, res)
    }
  })()
  return myPage.call(this, e)
}