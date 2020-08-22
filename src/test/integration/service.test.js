const _ = require('lodash')
const request = require("supertest");
const expect = require('expect')
const ProductModel = require('../../app/product/product.model')
const StoreModel = require('../../app/store/store.model')
const UserModel = require('../../app/user/user.model')
const userService = require('../../app/user/user.service')
const server = require('../../server');

var store_test = null
var user_test = null


context('integration tests', function () {
    before(function (done) {
        var clearDB = []

        clearDB.push(UserModel.deleteMany({}))
        clearDB.push(StoreModel.deleteMany({}))


        Promise.all(clearDB).then(() => {

            const testStore = require('../seed/store.json')
            var testUser = require('../seed/user-login.json')

            userService.create(testUser)
                .then(user => {
                    user_test = user
                    testStore.user = user._id.toString()
                    new StoreModel(testStore).save()
                        .then((store) => {
                            store_test = store
                            done()
                        })
                })
        })
    })

    describe('/accounts', function () {
        describe('POST/', function () {
            it('Should login', function (done) {
                const payload = {
                    email: 'useremail-login@email.com',
                    password: 'password@1234'
                }

                request(server)
                    .post('/accounts')
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

    describe('/user', function () {
        describe('POST/', function () {
            it('Should create user', function (done) {
                const payload = require('../seed/user.json')
                request(server)
                    .post('/users')
                    .set('Content-Type', 'application/json')
                    .send(payload)
                    .expect(201)
                    .expect((res) => {
                        expect(res.body.name).toBeDefined()
                        expect(res.body.plan).toBe('pro')
                    })
                    .end(done)
            })
        })

        describe('GET/:eamil', function () {
            it('Should get user', function (done) {
                request(server)
                    .get('/users/useremail@email.com')
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.name).toBeDefined()
                    })
                    .end(done)
            })
        })
    })

    describe('store', function () {
        describe('GET/:id', function () {
            it('Should return data', function (done) {
                request(server)
                    .get('/stores/store01')
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
                    .post('/stores')
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

        describe('PUT/', function () {
            it('Should update store', function (done) {
                userService.generateAuthToken(user_test)
                    .then(token => {
                        store_test.title = 'title-test-put'
                        request(server)
                            .put('/stores/' + store_test.name)
                            .set('Content-Type', 'application/json')
                            .set("x-auth-token", token)
                            .send(store_test)
                            .expect(200)
                            .expect((res) => {
                                expect(res.body.title).toBe(store_test.title)
                            })
                            .end(done)
                    })
            })
        })
    })

    describe(':id/products', function () {
        describe('POST/', function () {
            it('Should cretae a product', function (done) {
                seed = require('../seed/product.json')
                const payload = {
                    products: [seed]
                }
                userService.generateAuthToken(user_test).then(token => {
                    request(server)
                        .post('/products/store01')
                        .set("x-auth-token", token)
                        .set('Content-Type', 'application/json')
                        .send(payload)
                        .expect(201)
                        .expect((res) => {
                            expect(res.body.status).toBeDefined()
                        })
                        .end(done)
                })
            })
        })

        describe('PUT/:id', function () {
            it('Should update a product', function (done) {
                userService.generateAuthToken(user_test).then(token => {
                    ProductModel.findOne({}).then(
                        payload => {
                            payload.name = 'product test name for update'
                            request(server)
                                .put('/products/store01/' + payload._id.toString())
                                .set('Content-Type', 'application/json')
                                .set("x-auth-token", token)
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

})