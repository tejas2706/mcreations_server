'use strict';



const user = {
    "_id": {
        type: String,
        trim: true,
    },
    "hash": {
        type: String,
        required: true
    },
    "username": {
        "type": String,
        trim: true,
        "minlength": 1,
        "maxlength": 50,
        "index": true,
        "unique": true
    },
    "firstName": {
        "type": String,
        trim: true,
        "minlength": 1,
        "maxlength": 50
    },
    "lastName": {
        "type": String,
        trim: true,
        "minlength": 1,
        "maxlength": 50
    },
    "emailId": {
        "type": String,
        "required": true
    },
    "mOn": {
        type: Date,
        default: Date.now
    }
};

module.exports = user;
