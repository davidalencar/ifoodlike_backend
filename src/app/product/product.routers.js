const express = require("express")
const service = require('./product.service')
const auth = require('../../middlewares/auth.middleware')

const storeService = require('../store/store.service')

const router = express.Router()

router.get('/:id', auth, async (req, res) => {
    const store = await storeService.getByName(req.params.id)
    const products = await service.getByStoreControl(req.params.id)
        
        res.send({
            categories: store.categories,
            products
        })
})

// router.post('/:id',auth, async (req, res) => {
//     let saves = []
//     req.body.products.forEach(p => {
//         saves.push(service.create(p))
//     }); 
//     Promise.all(saves).then(() => {
//         res.status(201).send({status: 'OK'})
//     })   
// });

router.post('/:id',auth, async (req, res) => {
    service.create(req.body).then((product) => {
        res.status(201).send(product);
    })   
});

router.put('/control/:id',auth, async (req, res) => {
    let saves = []
    req.body.products.forEach(p => {
        saves.push(service.control(p))
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

router.delete('/:id/:pid',auth, async (req, res) => {
    service.delete(req.params.pid).then(() => {
        res.send({status: 'OK'})
    })
});

module.exports = router