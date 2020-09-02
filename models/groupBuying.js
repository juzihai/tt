import {Paging} from "../utils/paging";
import {Http} from "../utils/http-a";

class GroupBuying {

    //拼团活动查询-小程序
    static QueryEGroupForWx({ EnterpriseId}) {
        return Http.request({
            url: "api/V1/GroupBuying/QueryEGroupForWx",
            data: {
                EnterpriseId,

            }
        })
    }

    //拼团活动产品列表-小程序
    static QueryEGroupProductListForWx({ ActivityId, Page, Limit }) {
        return new Paging({
            url: "api/V1/GroupBuying/QueryEGroupProductListForWx",
            data: {
                ActivityId
            }
        }, Page, Limit)
    }

    //拼团活动产品明细-小程序
    static QueryEGroupProductDetailForWx({ID}) {
        return Http.request({
            url: "api/V1/GroupBuying/QueryEGroupProductDetailForWx",
            data: {
                ID
            }
        })
    }

    //产品相关拼团活动列表查询-小程序
    static QueryProductEGroupListForWx({EnterpriseId, ProductCode}) {
        return Http.request({
            url: "api/V1/GroupBuying/QueryProductEGroupListForWx",
            data: {
                EnterpriseId,
                ProductCode
            }
        })
    }

    //开团-小程序
    static BillCreate({ProductCode, OpenId,Phone,PayMoney,Carriage,Address,Consignee,ConsigneePhone,PayNumber}) {
        return Http.request({
            url: "api/V1/GroupBuying/BillCreate",
            data: {
                ProductCode,
                OpenId,
                Phone,
                PayMoney,
                Carriage,
                Address,
                Consignee,
                ConsigneePhone,
                PayNumber

            }
        })
    }

    //拼团-小程序
    static BillMakeGroup({BillId, OpenId,Phone,PayMoney,Carriage,Address, Consignee,ConsigneePhone, PayNumber }) {
        return Http.request({
            url: "api/V1/GroupBuying/BillMakeGroup",
            data: {
                BillId,
                OpenId,
                Phone,
                PayMoney,
                Carriage,
                Address,
                Consignee,
                ConsigneePhone,
                PayNumber,

            }
        })
    }

    //退团-小程序
    static BillOut({ID}) {
        return Http.request({
            url: "api/V1/GroupBuying/BillOut",
            data: {
                ID
            }
        })
    }

    //单独购买-小程序
    static AloneBuyForWx({ProductCode, OpenId,Phone,PayMoney,Carriage,Address, Consignee,ConsigneePhone, PayNumber}) {
        return Http.request({
            url: "api/V1/GroupBuying/AloneBuyForWx",
            data: {
                ProductCode,
                OpenId,
                Phone,
                PayMoney,
                Carriage,
                Address,
                Consignee,
                ConsigneePhone,
                PayNumber,
            }
        })
    }

    //客户团购订单查询-小程序
    static QueryEGroupBillList({ OpenId, EnterpriseId , Page, Limit }) {
        return new Paging({
            url: "api/V1/GroupBuying/QueryEGroupBillList",
            data: {
                OpenId,
                EnterpriseId
            }
        }, Page, Limit)
    }


}

export {
    GroupBuying
}