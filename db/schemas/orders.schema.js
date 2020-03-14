'use strict';

const orders = {
    "_id": {
        "type": String,
        "trim": true
    },
    "orderId":{
        "type": Number,
        "required": true
    },
    "order_date": {
        "type": String,
        "required": true
    },
    "username": {
        "type" : String,
        "required": true
    },
    "status": {
        "type": String,
        "required": true
    },
    "products" : {
        "type": Array
    },
    "mOn":{
        "type":Date,
        "default": new Date()
    }

};

module.exports = orders;
