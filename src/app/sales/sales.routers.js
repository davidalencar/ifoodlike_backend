const express = require("express")
const router = express.Router()

const auth = require('../../middlewares/auth.middleware')

const storeService = require('../store/store.service');
const service = require('../sales/sales.service')

router.post('/', async (req, res) => {
	service.create(req.body).then( salesId => {
		res.status(201).send({salesId})
	})
});

router.post('/deleteMany/:id',auth, async (req, res) => {
	let saves = []
	
    req.body.sales.forEach(s => {
        saves.push(service.delete(s.salesId))
    }); 
    Promise.all(saves).then(() => {
        res.status(200).send({status: 'OK'})
    })   
})

router.get('/:id',auth, async (req, res) => {
    const store = await storeService.getByName(req.params.id)
	const sales = await service.getByStore(req.params.id)
	res.send({sales, labels: store.labels})
})

router.put('/status/:id',auth, async (req, res) => {
	let saves = []
	
    req.body.status.forEach(s => {
        saves.push(service.updateStatus(s.salesId, s.newStatus))
    }); 
    Promise.all(saves).then(() => {
        res.status(200).send({status: 'OK'})
    })   
});

module.exports = router