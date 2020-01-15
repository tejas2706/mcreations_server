'use strict';
var BaseService = require('./BaseService.js');
var Model = appGlobals.dbModels;
var modelName = "users";

function UserProfileService() {
    BaseService.call(this);
}


UserProfileService.prototype.getUserProfile = function(username) {
    let model = Model.getModel(modelName);
    return model.findOne({username: username}, {hash: 0});
};

module.exports = {
    getInst : function() {
        return new UserProfileService();
    }
};
