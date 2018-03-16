import {Base} from '../../utils/base.js';

class Product extends Base {
  getDetailInfo(id, callback) {
    var param = {
      url: 'product/' + id,
      sCallBack: callback
    };
    this.request(param);
  }
}
export { Product }