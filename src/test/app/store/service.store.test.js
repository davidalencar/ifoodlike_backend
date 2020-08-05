const StoreService = require('../../../app/store/store.service')

before((done)=> {
    require('../../../startup/config')()
    require('../../../startup/db')()
    done()
})

describe('App.Store.Service', () => {
    it ('Should create a Store', (done) => {
        const data = require('../../seed/store.json')
        StoreService.create(data)
            .then(() => done())
        
    })
})