'use strict'
var BaseService = require("./BaseService.js");
var Model = applGlobals.dbModels;
var modeName = "products";

function ProductDetailsService() {
    BaseService.call(this);
}

ProductDetailsService.prototype.getProductDetails = function(){
    let model = Model.getModel(modeName);
    return model.find({ }, { hash:0 });
}

ProductDetailsService.prototype.addProducts = function() {
    let model = Model.getModel(modeName);
    model.
}

module.exports = {
    getInst : function (){
        return new ProductDetailsService();
    }
}