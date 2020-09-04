const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

const salesSchema = new mongoose.Schema({
    store: String,
    status: {type: String, default: 'received'},
    time : { type : Date, default: Date.now },
    schedule: { date: Date, period: String},    
    cust: { type: Schema.Types.ObjectId, ref: 'Customer' },
    paymMethod: String,
    totalAmount: Number,
    instruction: String,
    taxes:[{
        name:{
            type: String,
            trim: true
        }, 
        value:{
            type: Number
        }
    }],
    lines: [{
        qty: Number,
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        
        product: String,
        amount: Number,
        items: [{
            category: String,
            items: [{
                qty: Number,
                item: String
            }]
        }]
    }]
})

salesSchema.plugin(AutoIncrement, {inc_field: 'salesId'});

module.exports = mongoose.model("Sales", salesSchema);
