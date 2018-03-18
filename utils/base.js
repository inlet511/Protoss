import { Config } from '../utils/config.js'
import { Token } from 'token.js'
class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl;
    }

    request(params, noRefetch=false) {
        var url = this.baseRequestUrl + params.url;
        if (!params.type) {
            params.type = 'get';
        }
        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            success: (res) => {
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                if (startChar == '2') {
                    params.sCallBack && params.sCallBack(res.data);
                } else {
                    //token失效的情况
                    if (code == '401' && !noRefetch) {
                        var token = new Token();
                        token.getTokenFromServer((params) => {
                            //递归调用
                            this.request(params,true);
                        });
                    } else {
                        params.eCallBack(res.data);
                    }
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
    }
}
export { Base };