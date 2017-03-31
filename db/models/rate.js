'use strict'

const Sequelize = require('sequelize')
const db = require('../index')

const Rate = db.define('rate', {
  loan: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  interest_rate: Sequelize.FLOAT
})

module.exports = Rate