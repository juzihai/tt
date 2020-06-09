import {Http} from "../utils/http-a";
import {Paging} from "../utils/paging";

class Poster {

    // 1.查询海报类型数据
    static PosterTypePageSearchWX({EnterpriseID, TypeName, Limit=10, Page=1}) {
        return Http.request({
            url: `api/V1/PosterType/PageSearchWX`,
            data: {
                EnterpriseID,
                TypeName,
                Limit,
                Page
            }
        })
    }
    // 7.查询海报所有数据
    static PosterPageSearchWX({EnterpriseID, PosterTypeID, PosterName, Page, Limit}) {
        return new Paging({
            url: `api/V1/Poster/PageSearchWX`,
            data: {
                EnterpriseID,
                PosterTypeID,
                PosterName,
            }
        }, Page, Limit)
    }

}




export {
    Poster
}