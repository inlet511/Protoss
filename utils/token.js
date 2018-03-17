import { Config } from 'config.js'

class Token {

    constructor(){
        this.verifyUrl = Config.restUrl + 'token/verify';
        this.tokenUrl = Config.restUrl + 'token/user';
    }

    verify() {
        var token = wx.getStorageSync('token');
        if (!token) {
            this.getTokenFromServer();
        }
        else {
            this._verifyFromServer(token);
        }
    }

    //从服务器获取token
    getTokenFromServer(callback) {
        wx.login({
            success: (res) => {
                wx.login({
                    url: this.tokenUrl,
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success: (res) => {
                        wx.setStorageSync('token', res.data.token);
                        callback(res.data.token);
                    }
                })
            }
        })
    }

    //携带token去服务器校验
    _verifyFromServer(token){
        wx.request({
            url:this.verifyUrl,
            method:'POST',
            data:{
                token:token
            },
            success:(res)=>{
                var valid = res.data.isValid;
                if(!valid){
                    this.getTokenFromServer();
                }
            }
        })
    }
}

export {Token}