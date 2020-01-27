'use strict';

const categories = {
    "_id": {
        type: String,
        trim: true
    },
    "name": {
        "type": String,
        "minlength": 1,
        "maxlength": 50,
        "unique": true
    },
    "mOn": {
        type: Date,
        default: Date.now
    }
};

module.exports = categories;
