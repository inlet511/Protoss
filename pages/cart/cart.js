// pages/cart/cart.js
import { Cart } from 'cart-model.js';
var cart = new Cart();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow: function () {
        var cartData = cart.getCartDataFromLocal();
        var cal = this._calcTotalPriceAndCounts(cartData);
        this.setData({
            selectedCounts: cal.selectedCounts,
            selectedTypeCounts: cal.selectedTypeCounts,
            totalPrice: cal.totalPrice,
            cartData: cartData
        });
    },

    _calcTotalPriceAndCounts: function (data) {
        var len = data.length;
        var totalPrice = 0;

        //被选中的商品总数量
        var selectedCounts = 0;

        //被选中的商品类别数量
        var selectedTypeCounts = 0;

        for (let i = 0; i < len; i++) {
            if (data[i].selectStatus) {
                totalPrice += data[i].counts * 100 * Number(data[i].price) * 100;
                selectedCounts += data[i].counts;
                selectedTypeCounts++;
            }
        }

        return {
            selectedCounts: selectedCounts,
            selectedTypeCounts: selectedTypeCounts,
            totalPrice: totalPrice / 10000
        }

    },

    toggleSelect:function(event){
        var id = event.currentTarget.dataset.id;
        var status = event.currentTarget.dataset.status;
        var index = this._getProductIndexById(id);
        this.data.cartData[index].selectStatus=!status;
        this._resetCartData();
    },

    _resetCartData:function(){
        var newData = this._calcTotalPriceAndCounts(this.data.cartData);
        this.setData({
            totalPrice:newData.totalPrice,
            selectedCounts:newData.selectedCounts,
            selectedTypeCounts:newData.selectedTypeCounts,
            cartData:this.data.cartData
        })
    },

    toggleSelectAll:function(event){

    },

    _getProductIndexById:function(id){
        var data = this.data.cartData;
        var len = data.length;
        for(let i=0; i<len; i++)
        {
            if(data[i].id == id){
                return i;
            }
        }
    }

})