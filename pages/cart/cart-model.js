import { Base } from '../../utils/base.js';

class Cart extends Base {

    constructor() {
        super();
        this._storageKeyName = 'cart';
    }
    //加入到购物车
    add(item, counts) {
        var cartData = this.getCartDataFromLocal();
        var bHasInfo = this._productInCart(item.id, cartData);
        if (bHasInfo.index == -1) {
            item.counts = counts;
            item.selectedStatus = true;//表示选中状态
            cartData.push(item);
        }
        else {
            cartData[bHasInfo.index].counts += counts;

        }
        wx.setStorageSync(this._storageKeyName, cartData);
    }

    /**
     * 从缓存中读取购物车数据
     */
    getCartDataFromLocal(flag=false) {        
        var res = wx.getStorageSync(this._storageKeyName);
        if (!res) {
            res = [];
        }

        if(flag){
            var newRes=[];
            for(let i = 0 ; i<res.length; i++)
            {
                if(res[i].selectedStatus){
                    newRes.push(res[i]);
                }
            }
            res = newRes;
        }

        return res;
    }

    /**
     * 计算购物车内商品总数
     * flag:true 考虑商品选择状态 false 忽略商品选择状态
     */
    getCartTotalCounts(flag) {
        var data = this.getCartDataFromLocal();
        var counts = 0;

        for (let i = 0; i < data.length; i++) {
            if (flag) {
                if (data[i].selectedStatus) {
                    counts += data[i].counts;
                }
            } else {
                counts += data[i].counts;
            }
        }
        return counts;
    }

    _changeCounts(id, counts) {
        var cartData = this.getCartDataFromLocal();
        var hasInfo = this._productInCart(id, cartData);
        if (hasInfo.index != -1) {
            if (hasInfo.data.counts > 1) {
                cartData[hasInfo.index].counts += counts;
            }
        }
        wx.setStorageSync(this._storageKeyName,cartData);
    }

    addCounts(id)
    {
        this._changeCounts(id,1);
    }

    cutCounts(id)
    {
        this._changeCounts(id,-1);
    }

    delete(ids){
        if(!(ids instanceof Array)){
            ids=[ids];
        }
        var cartData = this.getCartDataFromLocal();
        for(let i = 0; i<ids.length; i++)
        {
            var hasInfo = this._productInCart(ids[i],cartData);
            if(hasInfo.index!=-1){
                cartData.splice(hasInfo.index,1);
            }
        }

        wx.setStorageSync(this._storageKeyName,cartData);
    }

    /**
     * 
     * 判断某个商品是否已经被添加到购物车中，并且返回这个商品的数据以及所在数据组中的序号
     * @param {int} id  商品序号
     * @param {array} arr 购物车的商品数组
     */
    _productInCart(id, arr) {
        var item = {};
        var result = { index: -1 };
        for (let i = 0; i < arr.length; i++) {
            item = arr[i];
            if (item.id == id) {
                result = {
                    index: i,
                    data: item
                };
                break;
            }
        }
        return result
    }

    execSetStorageSync(data){
        wx.setStorageSync(this._storageKeyName,data);
    }
}

export { Cart }