const express = require('express')

const winston = require("winston");
const app = express()

require('./startup/config')()
require('./startup/db')()
require('./startup/routers')(app)

app.get('/', (req, res) => {
    return res.status(200).send('Oi')
})

const server = app.listen(process.env.PORT, () => {
    winston.info(`Started on: http://localhost:${process.env.PORT}`)
  })
  
  module.exports = {
    server
  }