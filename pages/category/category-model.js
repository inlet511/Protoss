import {Base} from '../../utils/base.js';

class Category extends Base{
  getCategoryType(callback){
    var param={
      url:'category/all',
      sCallBack:callback
    };
    this.request(param);
  }

  getProductsByCategory(id,callback){
    var param={
      url:'product/by_category?id='+id,
      sCallBack:callback
    };
    this.request(param);
  }
}

export {Category}