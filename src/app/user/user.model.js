const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 60,
    },
    email: {
		type: String,
		required: true,
        lowercase: true,
        trim: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	}, 
	phone: {
		type: String,
		minlength: 8,
		maxlength: 20,
		trim: true
    },
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 60
	},
	plan: {
		type: String,
		required: true,
		default: 'basic'
	},
	isAdmin: Boolean
})

module.exports = mongoose.model("User", userSchema);
