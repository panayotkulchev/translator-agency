angular.module('cw.goods', [
  'ui.router',
  'ui.bootstrap'
])

        .config(function config($stateProvider) {
          $stateProvider.state('goods', {
            url: '/goods',
            views: {
              "main": {
                controller: 'GoodsCtrl',
                templateUrl: 'goods/goods.tpl.html'
              }
            },
            data: {pageTitle: 'Goods'}
          });
        })

        .controller('GoodsCtrl', function AboutCtrl($scope) {


        })

;
