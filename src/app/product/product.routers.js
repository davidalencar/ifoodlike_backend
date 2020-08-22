const express = require("express")
const service = require('./product.service')
const auth = require('../../middlewares/auth.middleware')

const storeService = require('../store/store.service')

const router = express.Router()

router.post('/:id',auth, async (req, res) => {
    let saves = []
    req.body.products.forEach(p => {
        saves.push(service.create(p))
    }); 
    Promise.all(saves).then(() => {
        res.status(201).send({status: 'OK'})
    })   
});

router.put('/:id/:pid',auth, async (req, res) => {
    service.update(req.body).then(product => {
        res.send(product)
    })
});

module.exports = router