const mongoose = require('mongoose')


const customerTagSchema = new mongoose.Schema({    
    store : {
        type: String,
        required: true
    },
    cust: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer'
     },
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 60,
    }
})


module.exports = mongoose.model("CustomerTag", customerTagSchema);
