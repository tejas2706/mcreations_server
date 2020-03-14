var path               = require('path');
var fs                 = require('fs');
var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var OrderDetailsService = require('../services/OrderDetailsService').getInst();

module.exports.init = function (app) {
    app.get('/orders/getOrderDetails/:userName', function(req,res){
        let p = OrderDetailsService.getOrderDetailsByUserName(req.params.userName);
        return serviceHandler(req, res, p);
    });

    app.get('/orders/getAllOrderDetails', function(req,res){
        let p = OrderDetailsService.getAllOrderDetails();
        return serviceHandler(req, res, p);
    });

    app.post('/orders/:username/placeOrder', function(req,res){
        let p = OrderDetailsService.insertOrderDetails(req.params.username,req.body);
        return serviceHandler(req, res, p);
    });

    app.put('/orders/updateOrderDetails/:orderId', function(req,res){
        let p = OrderDetailsService.updateOrder(req.params.orderId,req.body);
        return serviceHandler(req, res, p);
    });
};
