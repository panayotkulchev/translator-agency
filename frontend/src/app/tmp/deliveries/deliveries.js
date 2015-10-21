angular.module('ngBoilerplate.deliveries', [
  'ui.router',
  'ui.bootstrap'
])

        .config(function config($stateProvider) {
          $stateProvider.state('deliveries', {
            url: '/deliveries',
            views: {
              "main": {
                controller: 'DeliveriesCtrl',
                templateUrl: 'deliveries/deliveries.tpl.html'
              }
            },
            data: {pageTitle: 'Deliveries'}
          });
        })

        .controller('DeliveriesCtrl', function InvoicesCtrl($scope) {


        })

;
