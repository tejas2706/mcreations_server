var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var userProfileService = require('../services/UserProfileService.js').getInst();

module.exports.init = function (app) {
    app.get('/getProductDetails', function(req, res){
        let p = userProfileService.getUserProfile(req.user.username)
        return serviceHandler(req, res, p)
    });
};
