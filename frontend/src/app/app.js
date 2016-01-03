angular.module('ta.core', [
    'templates-app',
    'templates-common',
    'angular-growl',
    'nya.bootstrap.select',
    'i18n',
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'ta.home',
    'ta.translators',
    'ta.languages'
  ])
  .config(function myAppConfig($stateProvider, $urlRouterProvider, growlProvider) {
    $urlRouterProvider.otherwise('/home');

    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalDisableIcons(true);
    growlProvider.globalTimeToLive({success: 5000, error: 10000, warning: 5000, info: 5000});

  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location, $window) {
      return {
        'response': function (response) {
          return response;
        },
        'responseError': function (rejection) {
          if (rejection.status === 401) {
            $window.location.href = '/login';
          }
          return $q.reject(rejection);
        }
      };
    });
  })

  .run(function run() {
  })

  .controller('AppCtrl', function AppCtrl($rootScope,$scope) {

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

      window.scrollTo(0, 0);

      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
    });
  });