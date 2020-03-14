var BaseModel = require('./BaseModel');
const modelName = "orders";
class OrdersModel extends BaseModel {

    constructor(dbMgr, options) {
        super(modelName, dbMgr, options);
    }

    create(orderObj) {
        try{
        orderObj._id = this.utils.Orders();
        return this.model.create(orderObj)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = OrdersModel;
