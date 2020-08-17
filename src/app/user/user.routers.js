
const express = require("express")

const service = require('./user.service')

const router = express.Router()

router.get('/:email', (req, res) => {
	service.get(req.params.email).then(user => {
		if(!user) {
			return res.send(404).send({})
		}

		return res.status(200).send(user)
	})
})

router.post('/', async (req, res) => {
	service.create(req.body).then( user => {
		res.status(201).send(user)
	})
});

module.exports = router
