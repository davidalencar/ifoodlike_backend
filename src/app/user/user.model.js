const mongoose = require('mongoose')
const config = require('config');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({    
    alias: {
        type: String,
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
		unique: true,
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

userSchema.methods.generateAuthToken = function() {
	const userModel = {
		_id: this._id,
		isAdmin: this.isAdmin
	};

	return jwt.sign(userModel, config.get("jwtPrivateKey"));
}

module.exports = mongoose.model("User", userSchema);
