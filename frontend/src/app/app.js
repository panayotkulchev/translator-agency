angular.module('ta.core', [
  'templates-app',
  'templates-common',
  'ta.home',
  'angular-growl',
  'nya.bootstrap.select',
  'ta.translators',
  'i18n',
  'ui.router',
  'angular-loading-bar',
  'ngAnimate',
  'ta.languages'
])
        .config(function myAppConfig($stateProvider, $urlRouterProvider, growlProvider) {
          $urlRouterProvider.otherwise('/translators');

          growlProvider.onlyUniqueMessages(false);
          growlProvider.globalDisableCountDown(true);
          growlProvider.globalDisableIcons(true);
          growlProvider.globalTimeToLive({success: 5000, error: 10000, warning: 5000, info: 5000});

        })

        .run(function run() {
        })

        .controller('AppCtrl', function AppCtrl($scope) {
          $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
              $scope.pageTitle = toState.data.pageTitle;
            }
          });
        });