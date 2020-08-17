const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        immutable: true,
        trim: true,
        lowercase: true,
        required: true,
        minlength: 5,
        maxlength: 60,
        match: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/        
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60       
    },
    complement:{
        type: String,
        trim: true,
        required: true,
        maxlength: 255
    },
    shelfTitle: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60
    },
    unitTitle: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10
    },
    productTitle: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20
    },
    minimumOrderAmount: {
        type: Number,
        default: 0
    },
    phone: {
		type: String,
		minlength: 8,
		maxlength: 20,
		trim: true
    },
    questions : {
        address: {
            type: Boolean,
            default: true
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    taxes:[{
        name:{
            type: String,
            trim: true,
            required: true,
            maxlength: 20
        }, 
        value:{
            type: Number,
            required: true
        }
    }],
    categories: [{
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 60       
        },
        enable : {
            type: Boolean,
            default: true
        },
        order: {
            type: Number,
            default: 0
        }
    }],
    paym: {
        money: Boolean,
        credit: Boolean,
        transfer: {
            enable: Boolean,
            bank: String,
            account: String,
            document: String,
        }
    }
});

module.exports = mongoose.model("Store", storeSchema);
