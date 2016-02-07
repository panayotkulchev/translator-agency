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
    'ta.languages',
    'ta.clients'
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
          console.log(rejection);
          if (rejection.status === 401) {
            $window.location.href = '/logout';
          }
          return $q.reject(rejection);
        }
      };
    });
  })

  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        APP: {
          HELLO: "Приевет, "
        }
      })
      .translations('en', {
        APP: {
          HELLO: "Hello, "
        }
      });

  })

  .run(function run() {
  })

  .controller('AppCtrl', function AppCtrl($rootScope, $scope, $translate, httpRequest, $modal) {

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      // set page to top
      window.scrollTo(0, 0);
      // change page title
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
    });

    // SET UP PROFFERED LANGUAGE
    $scope.defaultLanguageIsBg = true;

    $scope.changeAppLanguage = function () {

      $scope.defaultLanguageIsBg = !$scope.defaultLanguageIsBg;

      if ($scope.defaultLanguageIsBg) {
        $translate.use('bg');
        return;
      }

      $translate.use('en');
    };

    $('#my-modal').modal('show');

    $scope.getCurrentUser = function () {
      httpRequest.get('/r/currentUser').then(function (data) {
        $scope.currentUser = data;
        $('#my-modal').modal('hide');
      });
    };
  });