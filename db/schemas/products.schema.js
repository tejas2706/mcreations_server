'use strict';

const products = {
    "_id": {
        "type": String,
        "trim":true
    },
    "productName": {
        "type": String,
        "minlength": 1,
        "maxlength": 100,
        "unique": true
    },
    "category":{
        "type": String,
        "minlength":1,
        "maxlength" : 50,
        "required": true
    },
    "brandName": {
        "type": String,
        "minlength": 1,
        "maxlength": 100
    },
    "productDescription": {
        "type": String,
        "minlength": 1,
        "maxlength": 300
    },
    "availableQuantity": {
        "type": Number,
        "required": true
    },
    "mOn": {
        type: Date,
        default: Date.now
    }
};

module.exports = products;
