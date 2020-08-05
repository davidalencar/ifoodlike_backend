const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60       
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
    }]
});

module.exports = mongoose.model("Store", storeSchema);
