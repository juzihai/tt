import { Http } from "../utils/http-a";
import { Paging } from "../utils/paging";

/**收货地址相关接口 */
class DeliveryAddress extends Http {

  // 1. 单条新增收货地址
  static Add({ EnterpriseID, CustomerId, RealName, TelPhone, TelPhone2, Country, Province, City, Area, Street, Code, Zip, IsDefaultAddress, CreationPerson}) {
    return Http.request({
      url: "api/V1/DeliveryAddress/Add",
      data: {
        EnterpriseID,
        CustomerId,
        RealName,
        TelPhone,
        TelPhone2,
        Country,
        Province,
        City,
        Area,
        Street,
        Code,
        Zip,
        IsDefaultAddress,
        CreationPerson
      }
    })
  }
  // 2.修改数据
  static Update({ ID, CustomerId, RealName, TelPhone, TelPhone2, Country, Province, City, Area, Street, Code, Zip, IsDefaultAddress, CreationPerson }) {
    return Http.request({
      url: "api/V1/DeliveryAddress/Update",
      data: {
        ID,
        CustomerId,
        RealName,
        TelPhone,
        TelPhone2,
        Country,
        Province,
        City,
        Area,
        Street,
        Code,
        Zip,
        IsDefaultAddress,
        CreationPerson
      }
    })
  }

  //3. 根据id查询
  static SearchModelDetails({ ID }) {
    return Http.request({
      url: "api/V1/DeliveryAddress/SearchModelDetails",
      data: {
        ID
      }
    })
  }
  //4. 查询所有收货地址
  static PageSearch({ CustomerId, Page, Limit }) {
    return new Paging({
      url: "api/V1/DeliveryAddress/PageSearch",
      data: {
        CustomerId
      }
    }, Page, Limit)
  }

  // 5.设为默认收货地址
  static UpdateStatus({ ID }) {
    return Http.request({
      url: "api/V1/DeliveryAddress/UpdateStatus",
      data: {
        ID
      }
    })
  }
  // 6.删除收货地址
  static Delete({ ID }) {
    return Http.request({
      url: "api/V1/DeliveryAddress/Delete",
      data: {
        ID
      }
    })
  }
}

export {
  DeliveryAddress
}