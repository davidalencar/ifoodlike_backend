const express = require("express")
const service = require('./customer.service')
const storeService = require('../store/store.service')
const auth = require('../../middlewares/auth.middleware')

const router = express.Router()

router.get('/:id', auth, async (req, res) => {
    const store = await storeService.getByName(req.params.id)
    const custs = await service.getByStore(req.params.id)

    res.send({
        custs,
        labels: store.labels
    })
})


router.put('/:id', auth, async (req, res) => {
    
    let saves = []
    req.body.labes.forEach(l => {
        saves.push(service.setLabel(l.custId, req.params.id, l.label))
    }); 
    Promise.all(saves).then(() => {
        res.status(201).send({status: 'OK'})
    })
})

module.exports = router