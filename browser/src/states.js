'use strict'

app.config(($stateProvider) =>
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'src/templates/main.template.html',
    conroller: 'MainCtrl'
  })
)