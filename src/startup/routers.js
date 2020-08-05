const express = require('express');

const store = require('../app/store/routers.store')

module.exports = (app) => {
    app.use(express.json())

    app.use('/api/stores', store)
}