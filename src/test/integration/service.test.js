const request = require("supertest");
const expect = require('expect')

const server = require('../../server');


context('integration tests', function () {
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
    })
})