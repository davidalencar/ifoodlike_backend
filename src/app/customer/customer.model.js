const mongoose = require('mongoose');
const { string } = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const customerSchema = new mongoose.Schema({    
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 60,
    }, 
	phone: {
		type: String,
		minlength: 8,
		maxlength: 20,
		unique: true,
		trim: true
    },
	address: {
        zipCode: String,
        street: String,
        number: String,
        district: String,
        city: String,
        state: String,
        complement: String
    },
    stores: [{
        name: String
    }]
})

customerSchema.plugin(AutoIncrement, {inc_field: 'custId'});


module.exports = mongoose.model("Customer", customerSchema);
