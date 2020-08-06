
const store = require('../app/store/store.routers')
const product = require('../app/product/product.routers')
module.exports = (app) => {

    app.use('/api/stores', store)
    app.use('/api/products', product)
}