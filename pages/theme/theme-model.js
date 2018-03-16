import {Base} from '../../utils/base.js'

class Theme extends Base{
  getProductsData(id,callback){
    var param={
      url:'theme/'+id,
      sCallBack:callback
    };
    this.request(param);
  }
}
export {Theme}