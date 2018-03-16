import { Base } from "../../utils/base.js"
class Home extends Base {
  constructor() {
    super();
  }

  getBannerData(id, callback) {
    var params = {
      url: 'banner/' + id,
      sCallBack: callback,
    };

    this.request(params);
  }

  getThemeData(idsArray, callback) {
    var params = {
      url: 'theme?ids=' + idsArray.join(","),
      sCallBack: callback
    };
    this.request(params);
  }

  getProductsData(callback) {
    var params = {
      url: 'product/recent',
      sCallBack: callback
    };
    this.request(params);
  }
}

export { Home };