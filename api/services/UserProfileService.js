'use strict';
var BaseService = require('./BaseService.js');
var Model = appGlobals.dbModels;
var modelName = "users";

function UserProfileService() {
    BaseService.call(this);
}

var model = Model.getModel(modelName);

UserProfileService.prototype.getUserByUserName = async function(userName) {
    let userDetails = await model.findOne({"username": userName}, {hash: 0});
    if(userDetails){
        return userDetails
    }else{
        throw {message:"User data not found."}
    }
};


UserProfileService.prototype.updateUser = async function(userName, updateArgs) {
    let updatedDetails = await model.update({"username":userName},updateArgs)
    if(updatedDetails.nModified){
        return await model.findOne({"username":userName}, {hash:0})
    }else{
        throw {message: "User not found and no entry updated."}
    }
}

UserProfileService.prototype.deleteUser = async function(userName){
    let removed = await model.remove({"username":userName});
    if(removed){
        return `Removed user ${userName} successfully from the database`;
    }else{
        return {message: "Failed to remove user."}
    }
}
module.exports = {
    getInst : function() {
        return new UserProfileService();
    }
};
