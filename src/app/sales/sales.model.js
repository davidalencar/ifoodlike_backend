const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

const salesSchema = new mongoose.Schema({
    store: String,
    time : { type : Date, default: Date.now }
    cust: { type: Schema.Types.ObjectId, ref: 'Customer' },
    paymMethod: String,
    lines: [{
        qty: Number,
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
