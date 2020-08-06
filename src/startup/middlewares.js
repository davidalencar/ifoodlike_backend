const express = require('express');
const helmet = require("helmet");
const compression = require("compression")

module.exports = function (app) {
    app.use(express.json())
    app.use(helmet())
    app.use(compression())
}