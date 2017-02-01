angular.module('ta.core', [
    'templates-app',
    'templates-common',
    'angular-growl',
    'nya.bootstrap.select',
    'i18n',
    'tmh.dynamicLocale',
    'angularMoment',
    'ui.router',
    'angular-loading-bar',
    'ngAnimate',
    'jcs-autoValidate',
    'ta.home',
    'ta.translators',
    'ta.languages',
    'ta.clients',
    'ta.orders'
  ])
  .config(function myAppConfig($stateProvider, $urlRouterProvider, growlProvider, tmhDynamicLocaleProvider) {
    $urlRouterProvider.otherwise('/orders');

    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalDisableIcons(true);
    growlProvider.globalTimeToLive({success: 5000, error: 10000, warning: 5000, info: 5000});

    // Specify location of angular locale files
    tmhDynamicLocaleProvider.localeLocationPattern('locales/angular-locale_{{locale}}.js');

  })


  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location, $window) {
      return {
        'response': function (response) {
          return response;
        },
        'responseError': function (rejection) {

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
          HELLO: "Привет, "
        }
      })
      .translations('en', {
        APP: {
          HELLO: "Hello, "
        }
      });

  })

  .run(function run(tmhDynamicLocale, $rootScope, amMoment, validator, defaultErrorMessageResolver, $state, $stateParams) {
    //locales
    tmhDynamicLocale.set('bg');
    // form auto validate
    defaultErrorMessageResolver.setI18nFileRootPath('locales');
    defaultErrorMessageResolver.setCulture('bg');
    validator.setValidElementStyling(false);

    // Change locale when translation changes
    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      tmhDynamicLocale.set(data.language);
      amMoment.changeLocale(data.language);
      defaultErrorMessageResolver.setCulture(data.language);
      $state.go($state.current, $stateParams, {reload: true});
    });
  })

  .service('CurrentUser', function () {
    var email;
    this.getUser = function () {
      return this.email;
    };
    this.setUser = function (email) {
      this.email = email;
    };
    this.getTime = function () {
      return new Date();
    };
  })

  .controller('AppCtrl', function AppCtrl($rootScope, $scope, $translate, httpRequest, $uibModal, tmhDynamicLocale, CurrentUser) {

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      // set page to top
      window.scrollTo(0, 0);
      // change page title
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
    });

    // SET UP PREFFERED LANGUAGE
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
        CurrentUser.setUser(data.email);
        $('#my-modal').modal('hide');
      });
    };
  });