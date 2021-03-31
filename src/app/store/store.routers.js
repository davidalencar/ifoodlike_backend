const express = require("express")
const router = express.Router()

const auth = require('../../middlewares/auth.middleware')
const productSevice = require('../product/product.service')
const service = require('./store.service')

router.post('/', async (req, res) => {
	service.create(req.body).then( store => {
		res.status(201).send(store)
	})
});

router.put('/:id', auth, async (req, res) => {
	service.update(req.body).then( store => {
		res.send(store)
	}).catch(e => {
		res.status(501).send(e)
	})
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

router.get('/control/:id', auth, async (req, res) => {
	const store = await service.getByName(req.params.id)

	if (!store)
		return res.status(404).send("Store was not found");
	
	res.send({store})
})

module.exports = router