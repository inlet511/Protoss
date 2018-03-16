import { Category } from "category-model.js";
var category = new Category();
// pages/category/category.js
Page({


  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    category.getCategoryType((categoryData) => {

      this.setData({
        categoryTypeArr: categoryData
      });
      
      //一定要在回调里再进行分类详情的方法调用
      category.getProductsByCategory(categoryData[0].id, (res) => {

        var dataObj = {
          products:res,
          topImgUrl:categoryData[0].img.url,
          title:categoryData[0].name
        };

        this.setData({
          categoryProducts:dataObj
        });
      });
    });




  },


})