
const express = require("express")

const service = require('./user.service')
const auth = require('../../middlewares/auth.middleware')

const router = express.Router()

router.get('/:email', (req, res) => {
	service.get(req.params.email).then(user => {
		if(!user) {
			return res.status(404).send({})
		}

		return res.status(200).send(user)
	})
})

router.post('/', async (req, res) => {
			
	service.createWithStore(req.body).then( user => {
		res.status(201).send({status: 'OK', user})
	}).catch(e => {
		res.status(201).send({status: e.msg})
	})
});

router.post('/:id/pwd', auth, async (req, res) => {
			
	
	service.changePwd(req.user.id, req.body.newPwd).then( user => {
		
		res.status(201).send({status: 'OK', user});
	}).catch(e => {
		
		res.status(201).send({status: e.msg, user: null})
	})
});


module.exports = router
