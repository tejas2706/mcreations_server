'use strict'
var BaseService = require("./BaseService.js");
var Model = appGlobals.dbModels;
var modelName = "products";
var _ = require("lodash");

function ProductDetailsService() {
    BaseService.call(this);
}

const model = Model.getModel(modelName);
ProductDetailsService.prototype.getProducts = async function(){
  try{
    let products = await model.find({ }, { hash:0 });
    if(!_.isEmpty(products)){
        return products;
    }else{
        throw {"message":"No products found"};
    }
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.getProductDetails = async function(productId){
  try{
    let productDetails = await model.findOne({"_id":productId}, {hash:0});
    if(!_.isEmpty(productDetails)){
        return productDetails;
    }else{
        throw {"message":`No productDetails found for productId : ${productId}`};
    }
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.addProducts = async function(data) {
  try{
    let productDetails = await model.create(data);
    if(!_.isEmpty(productDetails)){
        return productDetails;
    }else{
        throw {"message":`ProductDetails not added`};
    }
  }catch(error){
    return error
  }
}

module.exports = {
    getInst : function (){
        return new ProductDetailsService();
    }
}