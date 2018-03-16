// pages/home/home.js
import {Home} from 'home-model.js'

var home = new Home();

Page({

  data: {
  
  },

  onLoad:function(){
    this._loadData();
  },

  _loadData:function(){
    var id = 1;
    home.getBannerData(id,(res)=>{
      this.setData({
        'bannerArr':res.items
      });
    }); 

    home.getThemeData([1, 2, 3],(res)=>{
      this.setData({
        'themeArr':res
      });
    }); 

    home.getProductsData((res)=>{
      
      this.setData({
        'productsArr':res
      });
    });      
  },

  onProductsItemTap:function(event){    
    var id= event.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../product/product?id='+id
    });
  },

  onThemesItemTap: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    var name = event.currentTarget.dataset.name;

    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name
    });
  },
})