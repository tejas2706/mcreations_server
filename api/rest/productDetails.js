var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var productDetailsService = require('../services/ProductDetailsService').getInst();

module.exports.init = function (app) {
    app.get('/getProductDetails/:productId', function(req, res){
        let p = productDetailsService.getProductDetails(req.params.productId)
        return serviceHandler(req, res, p)
    });

    app.get('/getProducts', function(req, res){
        let p = productDetailsService.getProducts()
        return serviceHandler(req, res, p)
    });

    app.post('/addProducts', function(req, res){
        let p = productDetailsService.addProducts(req.body)
        return serviceHandler(req, res, p)
    });
};
