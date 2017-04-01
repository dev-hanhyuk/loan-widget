'use strict'

app.config(($stateProvider) =>
  $stateProvider.state('main', {
    url: '/main',
    views: {
      '': { templateUrl: 'src/templates/main.template.html', conroller: 'MainCtrl'},
      'bg@main': {templateUrl: 'src/templates/bg.template.html'},
      'intro@main': { templateUrl: 'src/templates/intro.template.html' },
      'form@main': {templateUrl: 'src/templates/form.template.html', controller: 'MainCtrl'},
      'footer@main': { templateUrl: 'src/templates/footer.template.html' }
    }
  })
)