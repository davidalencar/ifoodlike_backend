const express = require('express')

const winston = require("winston");
const app = express()

require('./startup/config')()
require('./startup/db')()
require('./startup/middlewares')(app)
require('./startup/routers')(app)

app.get('/', (req, res) => {
    return res.status(200).send('Oi')
})
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    winston.info(`Started on: http://localhost:${PORT}`)
  })
  
  module.exports = server