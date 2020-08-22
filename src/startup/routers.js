
const store = require('../app/store/store.routers')
const product = require('../app/product/product.routers')
const user = require('../app/user/user.routers')
const account = require('../app/accounts/account.routers')

module.exports = (app) => {

    app.use('/api/users', user)
    app.use('/api/stores', store)
    app.use('/api/products', product)
    app.use('/api/accounts', account)
}