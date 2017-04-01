const app = angular.module('App', ['ui.router', 'ngAnimate']);

app.config(($urlRouterProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/main');
})

app.run(($rootScope) =>
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, thrownError) => {
    console.info(`The following error was thrown by ui-router while transitioning to state "${toState.name}". The origin of this error is probably a resolve function:`);
    console.error(thrownError);
  })
)
