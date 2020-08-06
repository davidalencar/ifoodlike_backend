const _ = require("lodash")

const express = require("express")
const service = require('./store.service')
const productSevice = require('../product/product.service')

const router = express.Router()

router.post('/', async (req, res) => {
	const store = await service.create(req.body);
	res.send(store);
});

router.get('/:id', async (req, res) => {
	const store = await service.getByName(req.params.id)
    const products = await productSevice.getByStore(req.params.id)
	
	if (!store)
		return res.status(404).send("Store was not found");
	
	var ret = {
		store,
		products
	}
	
	res.send(ret)
})

module.exports = router