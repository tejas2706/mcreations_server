'use strict';
var BaseService = require('./BaseService.js');
var Model = appGlobals.dbModels;
var modelName = "orders";

function OrderDetailsService() {
    BaseService.call(this);
}

var model = Model.getModel(modelName);

OrderDetailsService.prototype.getOrderDetailsByUserName = async function(userName) {
    let orderDetails = await model.find({"username": userName}, {hash: 0});
    if(orderDetails){
        return orderDetails
    }else{
        throw {message:"User data not found."}
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
        return error
      }
};

OrderDetailsService.prototype.updateOrder = async function(orderId,data){
    try{
        var model = Model.getModel(modelName);
        let orderDetails = await model.update({"orderId":orderId},{$set:{...data}});
        if(!_.isEmpty(orderDetails)){
            return orderDetails;
        }else{
            throw {"message":`orderDetails not added`};
        }
      }catch(error){
        return error
      }
}

module.exports = {
    getInst : function() {
        return new OrderDetailsService();
    }
};
