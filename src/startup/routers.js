
const store = require('../app/store/store.routers')
const product = require('../app/product/product.routers')
const user = require('../app/user/user.routers')
const account = require('../app/accounts/account.routers')
const sales = require('../app/sales/sales.routers')
module.exports = (app) => {

    app.use('/users', user)
    app.use('/stores', store)
    app.use('/accounts', account)
    app.use('/products', product)
    app.use('/sales', sales)
}