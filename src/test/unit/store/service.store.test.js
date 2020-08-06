const expect = require('expect')
const StoreService = require('../../../app/store/store.service')
const StoreModel = require('../../../app/store/store.model')


describe('App.Store.Service', function () {    
    before(function (done) {
        require('../../../startup/config')()
        require('../../../startup/db')()
        StoreModel.deleteMany({}, () => done())
        
    })

    it ('Should create a Store', function (done) {
        const payload = require('../../seed/store.json')
        StoreService.write(payload)
            .then((storeData) =>{
                expect(storeData._id).toBeDefined()
                done()
            })        
    })

    it ('Should retrive Store data by Name', function (done) {
        StoreService.getByName('store01')
            .then(storeData => {
                expect(storeData._id).toBeDefined()
                expect(storeData.products.length).toBe(1)                
                done()
            })
    })

    it ('Should update Store data by Name', function (done) {
        const payload = require('../../seed/store.json') 
        payload.title = 'updated title'       
        StoreService.write(payload)
            .then(storeData => {
                expect(storeData._id).toBeDefined()                
                expect(storeData.title).toBe(payload.title)                
                done()
            })
    })
})