import {
  Http
} from "./http-a";

//** 分页类 */
class Paging {
  /** 使用位置拿数据*/
  start;
  count;
  /** 使用页码那数据*/
  page;
  limit;

  req;//请求数据
  locker = false;
  url;
  moreData = true;
  accumulator = []; //存储池，存储的所有数据


  //返回对创建此对象的数组函数的引用
  constructor(req, limit = 10, page = 1) {
    this.page = page;
    this.limit = limit;
    this.req = req;
    this.url = req.url; //保存最原始的url
  }
  //加载数据的判断
  async getMoreData() {
    if (!this.moreData) return; //如果没有更多的数据，直接返回，不再进行http请求
    if (!this._getLocker()) { //网络请求锁，正在加载时不在加载
      return;
    }
    const data = await this._actualGetData();
    this._releaseLocker(); //请求成功后解除锁

    return data;
  }
  //加载数据
  async _actualGetData() {
    const req =  this._getCurrentReq();

    let paging = await Http.request(req);//数据请求
    
    paging = paging.ResultValue

    if (!paging) { //服务端出现问题
      return null;
    }
    if (paging.TotalCount === 0) { //返回的是空数据
      return {
        empty: true, //是否是空数据
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    //如果请求的有数据
    this.moreData = Paging._moreData(paging.TotalPage, paging.Page); //判断后续是否还有数据
    if (this.moreData) {
      // this.start += this.count; //更改下次的start
      this.page += 1;//更改下次的page
    }
    let items = paging.Data;
    let ShowResourcesUrl = paging.ShowResourcesUrl;
    if (ShowResourcesUrl){
      for(let index in items){
        items[index].baseUrl=ShowResourcesUrl;
      }
    }
    this._accumulate(items);
    return {
      empty: false,
      items: items, //当前request返回的数据
      moreData: this.moreData, //后续是否有数据
      accumulator: this.accumulator,//总数据
      baseUrl:ShowResourcesUrl
    }


  }
  /**
   * 获取累加之后的数据
   * @param items
   * @private
   */
  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items); //将原数组与items数组进行合并
  }
  static _moreData(totalPage, pageNum) {
    //如果当前页 < 最后一页，代表还有一页的数据
    return pageNum < totalPage ;

  }
  /**
   * 获取实时的request对象
   * @returns {*}
   * @private
   */
  _getCurrentReq() {
    this.req.data.Page = this.page;
    this.req.data.Limit = this.limit;

    return this.req;
  }
  /**
   * 获取锁
   * @returns {boolean}
   * @private
   */
  _getLocker() {
    if (this.locker) { //获取锁失败
      return false;
    }
    this.locker = true; //获取锁
    return true;
  }

  /**
   * 释放锁
   * @private
   */
  _releaseLocker() { //释放锁
    this.locker = false;
  }

}

export {
  Paging
}