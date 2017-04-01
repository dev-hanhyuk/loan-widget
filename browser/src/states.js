'use strict'

app.config(($stateProvider) =>
  $stateProvider.state('main', {
    url: '/main',
    views: {
      '': { templateUrl: 'src/templates/main.template.html', conroller: 'MainCtrl'},
      'form@main': {templateUrl: 'src/templates/form.template.html', controller: 'MainCtrl'},
      'footer@main': { templateUrl: 'src/templates/footer.template.html' }
    }
  })
)