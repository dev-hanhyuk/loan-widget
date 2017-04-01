'use strict'

const debug = require('debug')('sql')
const chalk = require('chalk')
const Sequelize = require('sequelize')
const name = (process.env.DATABASE_NAME || 'loanschedulewidget' )
const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`

console.log(chalk.yellow(`Opening database connection to ${url}`));

const db = module.exports = new Sequelize(url, {
  logging: debug,
  native: true,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  }
})

require('./models')

// sync the db, creating it if necessary
function sync(force=false, retries=0, maxRetries=5) {
  return db.sync({force})
    .then(ok => console.log(`Synced models to db ${url}`))
    .catch(fail => {
      if (retries > maxRetries) {
        console.error(chalk.red(`********** database error ***********`))
        console.error(chalk.red(`    Couldn't connect to ${url}`))
        console.error()
        console.error(chalk.red(fail))
        console.error(chalk.red(`*************************************`))
        return
      }
      console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
      return new Promise((resolve, reject) =>
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => sync(true, retries + 1))
    })
}

db.didSync = sync()