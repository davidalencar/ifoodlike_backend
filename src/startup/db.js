const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function() {
	mongoose
		.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			retryWrites: false
		})
        .then(() => winston.info(`Connected to DB: ${process.env.MONGODB_URI}`))
        .catch((e) => winston.error(e))        
};
