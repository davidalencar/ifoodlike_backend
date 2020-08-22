
const config = require('config');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const UserModel = require('./user.model')
const storeService = require('../store/store.service')
const services = {};

services.get = async email => {
	return await UserModel.findOne({ email: email });	
	
};

services.create = async (data) => {

	const user = new UserModel(data);
	user.password =  await hashPassword(data.password)

	return await user.save();
};

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}


services.generateAuthToken = async (user) => {
	const data = {
		id: user._id,
		plan: user.plan,
		stores: await storeService.getByUser(user._id.toString())
	}
	
	return jwt.sign(data, config.get("jwtPrivateKey"));
}


module.exports = services;
