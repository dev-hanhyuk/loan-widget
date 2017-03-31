'use strict'

app.factory('RateFactory', ($http, $log) => {
  let rates = [];

  const fetch_rates = () => {
    if (rates.length == 0) return $http.get('/api/rates').then(res => rates = res.data);
    else if (new Date - rates[0].updated_at > 24 * 60 * 60 * 1000) return $http.get('/api/rates').then(res => rates = res.data);
    return rates;
  }

  return { fetch_rates }
})
