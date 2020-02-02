var BaseModel = require('./BaseModel');
const modelName = "products";
class ProductsModel extends BaseModel {

    constructor(dbMgr, options) {
        super(modelName, dbMgr, options);
    }

    create(userObj) {
        userObj._id = this.utils.Products();
        return this.model.create(userObj)
    }
}

module.exports = ProductsModel;
