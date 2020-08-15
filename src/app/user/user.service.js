const User = require('./user.model')
const bcrypt = require("bcrypt");

const services = {};

services.get = async email => {
	return await User.findOne({ email: email });
};

services.create = async (data) => {

	const user = new User({
		name: data.name,
		email: data.email,
		phone: data.phone,
		password: await hashPassword(data.password)
	});

	return await user.save();
};

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

module.exports = services;
