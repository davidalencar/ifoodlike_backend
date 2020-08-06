const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    store: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60       
    },    
    description:{
        type: String,
        trim: true,
        maxlength: 255
    },    
    unit: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60       
    },
    img: {
        type: String
    },
    enable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Product", productSchema);
