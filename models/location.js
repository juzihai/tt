import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**用户定位记录 */
class Location extends Http {


  //7. 
  static AddLocation({ OpenID, Phone, EnterpriseID, Nation, Province, City, Area, Address, Lat, Lng, CreatTime, Type}) {
    return Http.request({
      url: "api/V1/Location/AddLocation",
      data: {
        OpenID,
        Phone,
        EnterpriseID,
        Nation,
        Province,
        City,
        Area,
        Address,
        Lat,
        Lng,
        CreatTime,
        Type
      }
    })
  }


}

export {
  Location
}