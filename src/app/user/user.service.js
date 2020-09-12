
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
	user.password = await hashPassword('gIUK31HNOyO3')

	return await user.save();
};

services.createWithStore = async (data) => {

	if (await storeService.exists(data.store)) {
		throw { msg: 'Uma loja com esse nome já existe' }
	}

	try {

		const userData = new UserModel(data);
		userData.password = await hashPassword('gIUK31HNOyO3')
		const user = await userData.save();

		await storeService.createFromTemplate(data.store, user._id.toString());

		return user;

	} catch (error) {
		console.log('----------------ERROR', error);
		throw { msg: 'Error ao criar usuário' }
	}

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

services.changePwd = async (userId, newPwd) => {

	const user = await UserModel.findById(userId);
	user.password = await hashPassword(newPwd);

	return await user.save();
}

module.exports = services;
