const express = require('express');
const helmet = require("helmet");
const compression = require("compression")
const cors = require('cors')

const corsOptions = {
     origin: [/bslista\.com$/]
}

module.exports = function (app) {
    app.use(express.json())
    app.use(helmet())
    app.use(compression())
    app.use(cors(corsOptions))
}