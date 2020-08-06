const express = require("express")
const service = require('./product.service')
const storeService = require('../store/store.service')

const router = express.Router()

router.post('/', async (req, res) => {
    if (!storeService.exists(req.body.store))
        res.status(400).send()

	const product = await service.write(req.body);
	res.send(product);
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