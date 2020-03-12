var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var productDetailsService = require('../services/ProductDetailsService').getInst();

module.exports.init = function (app) {
    app.get('/products/getProductDetails/:productId', function(req, res){
        let p = productDetailsService.getProductDetails(req.params.productId)
        return serviceHandler(req, res, p)
    });

    app.get('/products/getProductDetailsByCategory/:category', function(req, res){
        let p = productDetailsService.getProductDetailsByCategory(req.params.category)
        return serviceHandler(req, res, p)
    });

    app.get('/products/getProducts', function(req, res){
        let p = productDetailsService.getProducts()
        return serviceHandler(req, res, p)
    });

    app.post('/products/addProducts', function(req, res){
        let p = productDetailsService.addProducts(req.body)
        return serviceHandler(req, res, p)
    });

    app.post('/products/addProductsBulk', function(req,res){
        let p =productDetailsService.addProductsBulk(req)
        return serviceHandler(req,res,p);
    })

    app.put('/products/editProduct',function(req,res){
    console.log("module.exports.init -> req", req.body)
        let p =productDetailsService.editProduct(req.body)
        return serviceHandler(req,res,p);
    })
};
