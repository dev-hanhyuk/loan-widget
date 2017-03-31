'use strict'

const api = module.exports = require('express').Router()

api
  .use('/rates', require('./rates'))

// error handler (send 500 error)
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// 404: no routes matched
api.use((req, res) => res.status(404).end())