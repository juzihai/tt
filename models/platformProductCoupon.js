import {Paging} from "../utils/paging";
import {Http} from "../utils/http-a";

class PlatformProductCoupon {
    //1.查询所有优惠券
    static PageSearchWX({ EnterpriseID, Page, Limit }) {
        return new Paging({
            url: "api/V1/PlatformProductCoupon/MainPageSearchWX",
            data: {
                EnterpriseID,
            }
        }, Page, Limit)
    }

    //2. 根据ID查询优惠券详细信息
    static SearchModelDetailsWX({ID}) {
        return Http.request({
            url: "api/V1/PlatformProductCoupon/SearchModelDetails",
            data: {
                ID
            }
        })
    }
    //3. 领取优惠券
    static PlatformProductReceiveCoupon({MainEnterpriseID,EnterpriseID, OpenID,Phone,CustomerID,ID}) {
        return Http.request({
            url: "api/V1/CustomerCoupon/PlatformProductReceiveCoupon",
            data: {
                MainEnterpriseID,
                EnterpriseID,
                OpenID,
                Phone,
                CustomerID,
                ID
            }
        })
    }
    //4.查询我的所有领取的优惠券
    static PlatformProductPageSearchWX({MainEnterpriseID, EnterpriseID,OpenID,Phone,IsUse,IsValidity, Page, Limit }) {
        return new Paging({
            url: "api/V1/CustomerCoupon/PlatformProductPageSearchWX",
            data: {
                MainEnterpriseID,
                EnterpriseID,
                OpenID,
                Phone,
                IsUse,
                IsValidity
            }
        }, Page, Limit)
    }
        

}

export {
    PlatformProductCoupon
}