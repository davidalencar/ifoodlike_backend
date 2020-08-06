const expect = require('expect')
const ProductService = require('../../../app/product/product.service')
const ProductModel = require('../../../app/product/product.model')
let productId

describe('App.Product.Service', function () {    
    before(function (done) {
        require('../../../startup/config')()
        require('../../../startup/db')()
        ProductModel.deleteMany({}, () => done())        
    })

    it ('Should create product', function (done) {
        const payload = require('../../seed/product.json')
        ProductService.write(payload)
            .then(product =>{
                expect(product._id).toBeDefined()
                productId = product._id
                done()
            })
    })

    it ('Should update a product', function (done) {
        const payload = require('../../seed/product.json')
        payload._id = productId
        payload.name = 'product02'
        ProductService.write(payload)
            .then(product =>{
                expect(product._id).toBeDefined()
                expect(product.name).toBe(payload.name)
                done()
            })
    })

    it ('Should retrive all products by store', function (done) {        
        ProductService.getByStore('store01')
            .then(data => {
                expect(data.length).toBe(1)
                done()
            })
    })

})