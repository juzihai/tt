import {Http} from "../utils/http-a";
import {Paging} from "../utils/paging";

class ActivityCouponCustomerReceive {

    static WXTips({EnterpriseID,OpenID,Phone,Address}){
        return Http.request({
            url:"api/V1/ActivityCoupon_CustomerReceive/WXTips",
            data:{
                EnterpriseID,
                OpenID,
                Phone,
                Address
            }
        })
    }

    static PageSearch({ EnterpriseID, OpenID,Phone, Page,Status, Limit }) {
        return new Paging({
            url: "api/V1/ActivityCoupon_CustomerReceive/PageSearch",
            data: {
                EnterpriseID,
                OpenID,
                Phone,
                Status
            }
        }, Page, Limit)
    }

// 根据ID查询优惠卷详细信息
    static SearchModelDetails({GUID}){
        return Http.request({
            url:"api/V1/ActivityCoupon_Coupon/SearchModelDetails",
            data:{
                GUID
            }
        })
    }


}

export {
    ActivityCouponCustomerReceive
}