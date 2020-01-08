
import { Paging } from "../utils/paging";

class SpuPaging {
  
  static getLatestPaging({EnterpriseID, ProductCode, ProductName, Page, Limit}){
    return new Paging({
      url: `api/V1/Product/PageSearch`,
      data: {
        EnterpriseID,
        ProductCode,
        ProductName,

      }
    }, Limit, Page)
  }
}

export {
  SpuPaging
}