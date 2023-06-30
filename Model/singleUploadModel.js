const {Schema, model} = require("mongoose");

module.exports.SingleFile = model('SingleFile', Schema({
    id: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true }));

