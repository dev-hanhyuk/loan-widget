'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const {resolve} = require('path')
const app = express()


module.exports = app
  .use(volleyball)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(express.static(resolve(__dirname, '..', 'browser')))
  .use(express.static(resolve(__dirname, '..', 'node_modules')))
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

if (module === require.main) {
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}