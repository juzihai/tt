import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";
/**图片分类 */
class HotelMaterialType extends Http {

   //1.查询所有在售房屋图片类型数据
   static PageSearchWX({EnterpriseID,Limit=99,Page=1}) {
    return Http.request({
      url: "api/V1/HotelMaterialType/PageSearchWX",
      data: {
        EnterpriseID,
        Limit,
        Page
      }
    })
  }

// 微信通过图片类型ID获取一批图片
  static SearchHotelMaterialWX({ TypeID, Page=1, Limit=10 }) {
    return new Paging({
      url: "api/V1/HotelMaterialType/SearchHotelMaterialWX",
      data: {
        TypeID
      }
    }, Page, Limit)
  }


 

}
export {
  HotelMaterialType
}