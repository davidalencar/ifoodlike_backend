const express = require("express")
const router = express.Router()

const auth = require('../../middlewares/auth.middleware')

const service = require('../sales/sales.service')

router.post('/', async (req, res) => {
	service.create(req.body).then( salesId => {
		res.status(201).send({salesId})
	})
});


router.get('/:id',auth, async (req, res) => {
	const sales = await service.getByStore(req.params.id)
	res.send({sales})
})

module.exports = router