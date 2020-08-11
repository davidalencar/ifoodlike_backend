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
		requried: true,
        lowercase: true,
        trim: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	}, 
	password: {
		type: String,
		requried: true,
		minlength: 5,
		maxlength: 60
	},
	isAdmin: Boolean
})

module.exports = mongoose.model("User", userSchema);
