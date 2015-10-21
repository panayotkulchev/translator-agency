angular.module('cw.reports', [
  'ui.router',
  'ui.bootstrap'
])

        .config(function config($stateProvider) {
          $stateProvider.state('reports', {
            url: '/reports',
            views: {
              "main": {
                controller: 'ReportsCtrl',
                templateUrl: 'reports/reports.tpl.html'
              }
            },
            data: {pageTitle: 'Reports'}
          });
        })

        .controller('ReportsCtrl', function AboutCtrl($scope) {


        })

;
