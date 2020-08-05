const express = require("express")
const service = require('./store.service')

const router = express.Router()

router.post('/', async (req, res) => {
	const customer = await service.create(req.body);
	res.send(customer);
});

module.exports = router