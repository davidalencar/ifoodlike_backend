const express = require("express")
const service = require('./product.service')
const storeService = require('../store/store.service')

const router = express.Router()

router.post('/', async (req, res) => {
	service.create(req.body).then(product => {
        res.status(201).send(product)
    })
});

router.put('/:id', async (req, res) => {
    service.update(req.body).then(product => {
        res.send(product)
    })
});

module.exports = router