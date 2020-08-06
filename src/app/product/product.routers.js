const express = require("express")
const service = require('./product.service')
const storeService = require('../store/store.service')

const router = express.Router()

router.post('/', async (req, res) => {
    if (!storeService.exists(req.body.store))
        res.status(400).send()

	const product = await service.write(req.body);
	res.status((req.body._id) ? 200 : 201).send(product);
});

module.exports = router