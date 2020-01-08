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


  /**
   *
   * @param req 请求 url?data=data等
   * @param start 从第几条开始
   * @param count 每页条数
   */
  constructor(req, limit = 10, page = 1) {
    this.page = page;
    this.limit = limit;
    this.req = req;
    this.url = req.url; 
  }

  /**
   * 获取数据
   */
  async getMoreData() {
    if (!this.moreData) {//判断是否有更多数据
      return
    }
    if (!this._getLocker()) { //网络请求锁，正在加载时不在加载
      return;
    }
    const data = await this._actualGetData();
    this._releaseLocker(); //请求成功后解除锁
    return data;
  }

  /**
   * 发送请求
   * @returns {Promise<*>}
   * @private
   */
  async _actualGetData() {
    const req =  this._getCurrentReq();
    console.log(req)
    let paging = await Http.request(req);//数据请求
    
    if (!paging) { //获取失败
      return null;
    }
    if (paging.TotalCount === 0) { //数据为空
      return {
        empty: true, //是否是空数据
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    //如果请求的有数据
    this.moreData = this._isMoreData(paging.TotalPage, paging.Page); //判断后续是否还有数据
    if (this.moreData) {
      // this.start += this.count; //更改下次的start
      this.page += 1;//记录page
    }
    let items = paging.Data;
    let ShowResourcesUrl = paging.ShowResourcesUrl;
    if (ShowResourcesUrl){
      for(let index in items){
        items[index].baseUrl=ShowResourcesUrl;
      }
    }
    this._accumulate(items);//累加
    return {
      empty: false,
      items: items, //当前request返回的数据
      moreData: this.moreData, //后续是否有数据
      accumulator: this.accumulator,//总数据
      baseUrl:ShowResourcesUrl
    }


  }

  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items); 
  }

  _getCurrentReq() {
    this.req.data.Page = this.page;
    this.req.data.Limit = this.limit;

    return this.req;
  }

  /**
   * 判断是否有更多数据
   * @param totalPage 总页数
   * @param pageNum 当前页数 从1开始
   * @returns {boolean}
   * @private
   */
  _isMoreData(totalPage, pageNum) {
    return pageNum < totalPage ;
  }

  /**
   * 获取锁, 加锁
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
  _releaseLocker() { 
    this.locker = false;
  }

}

export {
  Paging
}