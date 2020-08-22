const _ = require('lodash')
const request = require("supertest");
const expect = require('expect')
const ProductModel = require('../../app/product/product.model')
const StoreModel = require('../../app/store/store.model')
const UserModel = require('../../app/user/user.model')
const userService = require('../../app/user/user.service')
const server = require('../../server');



context('integration tests', function () {
    before(function(done){
        var clearDB = []

        clearDB.push(UserModel.deleteMany({}))
        clearDB.push(StoreModel.deleteMany({}))


        Promise.all(clearDB).then(() => {
            var preDataTest = []
            const testStore = require('../seed/store.json')
            var testUser = require('../seed/user-login.json')

            const store = new StoreModel(testStore)
            

            preDataTest.push(store.save())
            preDataTest.push(userService.create(testUser))
            Promise.all(preDataTest).then(() => {
                done()
                
            })
        })
    })

    describe('api/accounts', function () {
        describe('POST/', function () {
            it('Should login', function (done) {                                
                const payload = _.pick(require('../seed/user-login.json'), 'email', 'password')
                
                request(server)
                .post('/api/accounts')
                .set('Content-Type', 'application/json')
                .send(payload)
                .expect(200)
                .expect((res) => {
                    expect(res.body.access_token).toBeDefined()
                })
                .end(done)
            })
        })
    })

    describe('api/user', function () {
        describe('POST/', function () {
            it('Should create user', function (done) {
                const payload = require('../seed/user.json')
                request(server)
                .post('/api/users')
                .set('Content-Type', 'application/json')
                .send(payload)
                .expect(201)
                .expect((res) => {
                    expect(res.body.alias).toBeDefined()
                    expect(res.body.plan).toBe('pro')
                })
                .end(done)
            })
        })

        describe('GET/:eamil', function () {
            it('Should get user', function (done) {
                request(server)
                .get('/api/users/useremail@email.com')
                .expect(200)
                .expect((res) => {
                    expect(res.body.alias).toBeDefined()
                })
                .end(done)
            })
        })
    })

    describe('api/store', function () {
        describe('GET/:id', function () {
            it('Should return data', function (done) {
                request(server)
                .get('/api/stores/store01')
                .expect(200)
                .expect((res) => {
                    expect(res.body.store.name).toBeDefined()
                })
                .end(done)
            })
        })

        describe('POST/', function () {
            it('Should create store', function (done) {
                const payload = require('../seed/store.json')
                payload.name = 'storePOSTtest01'
                request(server)
                .post('/api/stores')
                .set('Content-Type', 'application/json')
                .send(payload)
                .expect(201)
                .expect((res) => {
                    expect(res.body.name).toBeDefined()
                    expect(res.body.paym).toBeDefined()
                })
                .end(done)
            })            
        })

        describe('PUT/', function() {
            it('Should update store', function (done) {
                StoreModel.findOne({}).then(payload => {
                    payload.name = 'newstorenamefortest'
                    request(server)
                    .put('/api/stores/' + payload.name)
                    .set('Content-Type', 'application/json')
                    .send(payload)
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.name).toBe(payload.name)
                    })
                    .end(done)
                })
            })
        })
    })

    describe('api/products', function () {
        describe('POST/', function () {
            it('Should cretae a product', function (done) {
                seed = require('../seed/product.json')
                const payload = {
                    products: [seed]
                } 
                request(server)
                .post('/api/products')
                .set('Content-Type', 'application/json')
                .send(payload)
                .expect(201)
                .expect((res) => {
                    console.log(res.body)
                    expect(res.body.status).toBeDefined()
                })
                .end(done)
            })            
        })

        describe('PUT/:id', function() {
            it('Should update a product', function (done) {
                ProductModel.findOne({}).then(
                    payload => {
                        payload.name = 'product test name for update'
                        request(server)
                        .put('/api/products/' + payload._id.toString())
                        .set('Content-Type', 'application/json')
                        .send(payload)
                        .expect(200)
                        .expect((res) => {
                            expect(res.body._id).toBe(payload._id.toString())
                            expect(res.body.name).toBe(payload.name)
                            expect(res.body.items).toBeDefined()
                        })
                        .end(done)
                    }
                )
            })
        })
    })

})