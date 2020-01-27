var path               = require('path');
var fs                 = require('fs');
var serviceHandler     = require('../serviceHandler.js').serviceHandler;
var userProfileService = require('../services/UserProfileService.js').getInst();

module.exports.init = function (app) {
    app.get('/profile/:userName', function(req,res){
        let p = userProfileService.getUserByUserName(req.params.userName);
        return serviceHandler(req, res, p);
    });

    app.put('/profile/updateUser/:userName', function(req,res){
        let p = userProfileService.updateUser(req.params.userName, req.body);
        return serviceHandler(req,res,p);
    });

    app.delete('/profile/removeUser/:userName', function (req, res){
        let p = userProfileService.deleteUser(req.params.userName);
        return serviceHandler(req,res,p);
    })
};
