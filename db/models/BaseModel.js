'use strict';

var Promise = require('bluebird');
var debug = require('debug')('basemodel');
var utils = require("../../utils/");

class BaseModel {

    constructor(name, dbMgr, options) {
        this.utils = utils;
        this.dbMgr = dbMgr;
        this.options = options || {};
        this.debug = debug('model:' + this.constructor.name);
        this.model = this.dbMgr.getModel(name)
    }
    paginate() {
        return this.model.paginage.apply(this.model, arguments);
    }

    find(query, qOpts) {
        return this.model.find.apply(this.model, arguments);
    }

    findOne(query, qOpts) {
        return this.model.findOne.apply(this.model, arguments);
    }

    // findOne(){
    //     return new Promise((resolve,reject)=>{
    //         return this.model.findOne.apply(this.model)
    //     })
    // }
    create(rec, opts) {
        return this.model.create.apply(this.model, arguments);
    }
    
    update(matchCnd, updateArgs, opts) {
        opts = opts || {};
        if (!updateArgs) {
            return Promise.reject(new Error('updateArgs missing'));
        }

        // add modified date to document if it exists in the dbschema
        if (this.model.schema.paths.mOn) {
            if (updateArgs.$set)
                updateArgs.$set.mOn = new Date();
            else
                updateArgs.$set = {
                    "mOn": new Date()
                };
        }
        return this.model.updateOne(matchCnd, updateArgs, opts);
    }
    remove(query,opts) {
        return this.model.remove.apply(this.model,arguments);
    }

}
module.exports = BaseModel;