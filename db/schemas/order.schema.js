'use strict';

const order = {
    "_id": {
        type: String,
        trim: true
    },
    "user": {
        type: String,
        ref: "user",
    },
    "cart": {
        type: Object,
        required: true
    },
    "address": {
        type: String,
        required: true
    },
    "name": {
        type : String,
        required: true
    }
};

module.exports = order;
