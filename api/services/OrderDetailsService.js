'use strict';
var BaseService = require('./BaseService.js');
var Model = appGlobals.dbModels;
var modelName = "orders";
const _ = require('lodash');
const PromiseB = require('bluebird');
const ProductServiceInst = require('./ProductDetailsService').getInst();
function OrderDetailsService() {
    BaseService.call(this);
}

var model = Model.getModel(modelName);

OrderDetailsService.prototype.getOrderDetailsByUserName = async function(userName) {
    try{
        let orderDetails = await model.find({"username": userName}, {hash: 0});
        if(orderDetails){
            return orderDetails
        }else{
            throw {message:"User data not found."}
        }
    }catch(error){
        return Promise.reject(error)
    }
};

OrderDetailsService.prototype.getAllOrderDetails = async function() {
    let orderDetails = await model.find({}, {hash: 0});
    if(orderDetails){
        return orderDetails
    }else{
        throw {message:"User data not found."}
    }
};

OrderDetailsService.prototype.insertOrderDetails = async function(userName, order) {
console.log("userName", userName)
    try{
        var model = Model.getModel(modelName);
        let orderDetails = await model.create({"username":userName, ...order});
        console.log("orderDetails", orderDetails)
        if(!_.isEmpty(orderDetails)){
            return orderDetails;
        }else{
            throw {"message":`orderDetails not added`};
        }
      }catch(error){
        return Promise.reject(error);
      }
};

OrderDetailsService.prototype.updateOrder = async function(orderId,data){
    try{
        let {order, productDetails, availableQuantities} = data;
        console.log("productDetails", productDetails)
        productDetails.map(eachProduct =>{
            if(eachProduct.quantity > availableQuantities[eachProduct._id]){
                throw {message: `Quantity mismatch for ${eachProduct.productName}`}
            }
        })

        var model = Model.getModel(modelName);
        let productsUpdateP = ProductServiceInst.updateProductsQuantity(productDetails)
        let orderDetailsP = model.update({"orderId":orderId},{$set:{...order}});
        let [orderDetails] = await PromiseB.all([orderDetailsP,productsUpdateP]);
        if(!_.isEmpty(orderDetails)){
            return orderDetails;
        }else{
            throw {"message":`orderDetails not added`};
        }
      }catch(error){
        console.log("error", error)
        return Promise.reject(error);
      }
}

module.exports = {
    getInst : function() {
        return new OrderDetailsService();
    }
};
