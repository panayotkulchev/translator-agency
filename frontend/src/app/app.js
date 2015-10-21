angular.module('cw.core', [
  'templates-app',
  'templates-common',
  'angular-growl',
  'nya.bootstrap.select',
  'cw.home',
  'cw.about',
  'cw.clients',
  'cw.partners',
  'cw.pricelist',
  'cw.sales',
  'cw.goods',
  'cw.reports',
  'cw.invoices',
  'cw.deliveries',
  'ta.translators',
  'i18n',
  'ui.router'
])
        .config(function myAppConfig($stateProvider, $urlRouterProvider, growlProvider) {
          $urlRouterProvider.otherwise('/');

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
        })

        .service('httpRequest', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

          this.get = function (url, data) {
            return this.send('GET', url, data);
          };

          this.post = function (url, data) {
            return this.send('POST', url, data);
          };

          this.put = function (url, data) {
            return this.send('PUT', url, data);
          };

          this.send = function (method, url, data) {
            var deferred = $q.defer();

            $http({method: method, url: url, data: data})
                    .success(function (data) {
                      deferred.resolve(data);
                    })
                    .error(function (data) {
                      deferred.reject(data);
                    });

            $rootScope.loadingInProgress = true;

            return deferred.promise;
          };
        }]);