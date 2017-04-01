'use strict'

const router = require('express').Router()
const db = require('../../db')
const Rate = db.model('rate')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

module.exports = router

const fetch_federal_rates = (req, res, next) => {
  const url = `https://studentaid.ed.gov/sa/types/loans/interest-rates`;
  request(url, (err, resp, body) => {
    if (!err) {
      const $ = cheerio.load(body);
      let rates = [];
      const data = $('.field-item.even table tr td p').slice(0, 12);

      for(let i=0; i<12; i +=3) {
        let loan = $(data[i]).text() + ' for '+ $(data[i+1]).text();
        let interest_rate = $(data[i+2]).text();
        rates.push({ loan, interest_rate: Number(interest_rate.slice(0, -1)) / 100 });
      }
      return db.Promise.map(rates, r => db.model('rate').upsert(r))
      .then(() => res.send(rates))
    }
  })
}

router.get('/', (req, res, next) => {
  Rate.findAll()
    .then(rates => {
      if (rates.length == 0) return fetch_federal_rates(req, res, next);
      else if (new Date - rates[0].updated_at > 24 * 60 * 60 * 1000) return fetch_federal_rates(req, res, next);
      else res.send(rates);
    })
    .catch(next)
})
