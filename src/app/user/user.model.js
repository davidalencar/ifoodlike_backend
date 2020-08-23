const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({    
    name: {
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

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports = mongoose.model("User", userSchema);
