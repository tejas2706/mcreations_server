var path               = require('path');
var fs                 = require('fs');
var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var userProfileService = require('../services/UserProfileService.js').getInst();

module.exports.init = function (app) {
    app.get('/profile', function(req, res){
        let p = userProfileService.getUserProfile(req.user.username)
        return serviceHandler(req, res, p)
    });
};
