const request = require("supertest");
const expect = require('expect')
const ProductModel = require('../../app/product/product.model')
const StoreModel = require('../../app/store/store.model')
const server = require('../../server');


context('integration tests', function () {
    before(function(done){
        StoreModel.deleteMany({}, () => {
            const testStore = require('../seed/store.json')
            const store = new StoreModel(testStore)
            store.save().then(() => done())
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
                const payload = require('../seed/product.json')
                request(server)
                .post('/api/products')
                .set('Content-Type', 'application/json')
                .send(payload)
                .expect(201)
                .expect((res) => {
                    expect(res.body._id).toBeDefined()
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
                        })
                        .end(done)
                    }
                )
            })
        })
    })

})