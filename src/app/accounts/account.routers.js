const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')

const userService = require('../user/user.service')
const storeService = require('../store/store.service')

const router = express.Router()

router.post('/', async (req, res) => {
	const { error } = validate(req.body)
	
	if (error) return res.status(400).send(error.details[0].message)

	let user = await userService.get(req.body.email)
	if (!user) return res.status(401).send('Invalid email or password.')

	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(401).send('Invalid email or password.')

	const access_token = await userService.generateAuthToken(user)
	const stores = await storeService.getByUser(user._id.toString())
	res.send({
		access_token,
		userName: user.name,
		stores
	})
})

function validate(req) {

	const schema = Joi.object({
		email: Joi.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
	})

	return schema.validate(req)
}

module.exports = router
