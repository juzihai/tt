import {Http} from "../utils/http-a";
import {Paging} from "../utils/paging";

class HotelRoomType extends Http {

    /*
    * 查询所有在售房屋数据
    * */
    static PageSearch({EnterpriseID, StartValidityTime, EndValidityTime, Total, Page, Limit}) {
        return new Paging({
            url: "api/V1/HotelRoomType/PageSearchWX",
            data: {
                EnterpriseID,
                StartValidityTime,
                EndValidityTime,
                Total
            }
        }, Page, Limit)
    }

    //查询房屋基础属性数据
    static PageSearchProperty(ID) {
        return Http.request({
            url: "api/V1/HotelRoomType/PageSearchPropertyWX",
            data: {
                ID
            }
        })
    }

    //查询房屋基础属性数据
    static PageSearchOrderWX({
                                 ID,
                                 StartValidityTime,
                                 EndValidityTime,
                                 TotalDay,
                                 TotalRoom
                             }) {
        return Http.request({
            url: "api/V1/HotelRoomType/PageSearchOrderWX",
            data: {
                ID,
                StartValidityTime,
                EndValidityTime,
                TotalDay,
                TotalRoom
            }
        })
    }


    //直接下单接口
    static HotelPayOrder({
                                  EnterpriseID,
                                  OpenID,
                                  Name,
                                  Phone,
                                  HotelRoomTypeId,
                                  TotalRoom,
                                  TotalDay,
                                  StartValidityTime,
                                  EndValidityTime,
                                  OrderMoney,
                                  PayMoney
                              }) {
        return Http.request({
            url: "api/V1/HotelRoomType/HotelPayOrder",
            data: {
                EnterpriseID,
                OpenID,
                Name,
                Phone,
                HotelRoomTypeId,
                TotalRoom,
                TotalDay,
                StartValidityTime,
                EndValidityTime,
                OrderMoney,
                PayMoney
            }
        })
    }

    //小程序退款接口
    static HotelRefundOrder({EnterpriseID,OpenID,OrderNo,RefundReason}) {
        return Http.request({
            url: "api/V1/HotelRoomType/HotelRefundOrder",
            data: {
                EnterpriseID,
                OpenID,
                OrderNo,
                RefundReason
            }
        })
    }
    /*
    * 小程序查询我的订单
    * */
    static OrderListPageSearch({EnterpriseID, OpenID, Status, Page, Limit}) {
        return new Paging({
            url: "api/V1/HotelRoomType/HotelOrderPageSearchWX",
            data: {
                EnterpriseID,
                OpenID,
                Status
            }
        }, Page, Limit)
    }
    
}

export {
    HotelRoomType
}