
const store = require('../app/store/store.routers')

module.exports = (app) => {

    app.use('/api/stores', store)
}