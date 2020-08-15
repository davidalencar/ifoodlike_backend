
const express = require("express")

const service = require('./user.service')

const router = express.Router()

router.post('/', async (req, res) => {
	service.create(req.body).then( store => {
		res.status(201).send(store)
	})
});

module.exports = router
