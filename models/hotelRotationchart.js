import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";
/**自提店铺列表 */
class HotelRotationchart extends Http {

  //查询轮播图数据
  static PageSearch({EnterpriseID,Limit=1,Page=99}) {
    return Http.request({
      url: "api/V1/HotelRotationchart/PageSearchWX",
      data: {
        EnterpriseID,
        Limit,
        Page
      }
    })
  }

}
export {
  HotelRotationchart
}