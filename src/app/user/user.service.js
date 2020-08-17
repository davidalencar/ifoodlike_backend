const UserModel = require('./user.model')
const bcrypt = require("bcrypt");

const services = {};

services.get = async email => {
	return await UserModel.findOne({ email: email });
};

services.create = async (data) => {

	const user = new UserModel({
		name: data.name,
		email: data.email,
		phone: data.phone,
		plan: data.plan,
		password: await hashPassword(data.password)
	});

	return await user.save();
};

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

module.exports = services;
