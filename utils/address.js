
import { Base } from 'base.js'
import { Config } from 'config.js'

class Address extends Base {

    setAddressInfo(res) {
        var province = res.provinceName || res.province;
        var city = res.cityName || res.city;
        var country = res.countryName || res.country;
        var detail = res.detailInfo || res.detail;


        var totalDetail = city + country + detail;
        if(!this.isCenterCity(province))
        {
            totalDetail = province + totalDetail;
        }
        return totalDetail;
    }

    getAddress(callback){
        var param = {
            url:'address',
            sCallBack:(res)=>{
                if(res){
                    res.totalDetail = this.setAddressInfo(res);
                    callback(res);
                }
            }
        };
        this.request(param);
    }

    //判断直辖市
    isCenterCity(name) {
        var centerCitys = ['北京市', '天津市', '上海市', '重庆市'];
        var flag = centerCitys.indexOf(name) >= 0;
        return flag;
    }

    submitAddress(data,callback){
        data = this._setUpAddress(data);
        var param={
            url:'address',
            type:'post',
            data:data,
            sCallBack:callback,            
        }
        this.request(param);
    }

    _setUpAddress(res){
        var formData = {
            name:res.userName,
            province:res.provinceName,
            city:res.cityName,
            country:res.countryName,
            mobile:res.telNumber,
            detail:res.detailInfo
        };
        return formData;
    }
}
export { Address }