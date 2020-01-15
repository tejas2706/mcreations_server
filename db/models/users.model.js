var BaseModel = require('./BaseModel');
var bcrypt = require('bcrypt-nodejs');
const Promise = require("bluebird")
Promise.promisifyAll(bcrypt)
const modelName = "users";
class UsersModel extends BaseModel {

    constructor(dbMgr, options) {
        super(modelName, dbMgr, options);
    }

    create(userObj) {
        userObj._id = this.utils.User();
        return bcrypt.genSaltAsync(10).then(salt => {
            return bcrypt.hashAsync(userObj.password, salt, null)
                .then(hash => {
                    userObj.hash = hash;
                    return this.model.create(userObj)
                })
        })
    }

    findAndCheck(username, password) {
        return this.findOne({
            username: username
        }).then(user => {
            if(!user)
                return Promise.reject(new Error("user not found"))
            return bcrypt.compareAsync(password, user.hash)
                .then(match => {
                    return user
                })
        })
    }
}

module.exports = UsersModel;
