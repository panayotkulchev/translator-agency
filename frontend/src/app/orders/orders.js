/**
 * Created by pepo on 16-2-8.
 */

angular.module('ta.orders', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'common'
  ])

  .config(function config($stateProvider) {
    $stateProvider.state('orders', {
      url: '/orders',
      views: {
        "main": {
          controller: 'OrdersCtrl',
          templateUrl: 'orders/orders.tpl.html'
        }
      },
      data: {pageTitle: 'Orders'}
    });
  })

  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        ORDERS: {
          ORDERS: "Поръчки",
          NOMENCLATURE: "списък",
          NEW: "Нова поръчка"
        }
      })
      .translations('en', {
        ORDERS: {
          ORDERS: "Orders",
          NOMENCLATURE: "list",
          NEW: "New order"
        }
      });
  })

  .service('ordersGateway', function (httpRequest) {
    return {
      add: function (client) {
        return httpRequest.post('/r/orders', client);
      },
      getAll: function () {
        return httpRequest.get('/r/orders');
      },
      update: function (client) {
        return httpRequest.put("/r/orders", client);
      }
    };
  })

  .controller('OrdersCtrl', function OrdersCtrl($scope, ordersGateway) {

    $scope.orderList = [
      {
        clientName: "Иван Иванов",
        title: "Превод и легализация на диплома и свидетелство",
        number: 1340,
        createdBy: "panayotkulchev@gmail.com",
        createdOn: 1454967058000,
        commentsNumber: 4
      },
      {
        clientName: "ET Старт 97",
        title: "Превод свидетелство за граждански брак",
        number: 1341,
        createdBy: "panayotkulchev@gmail.com",
        createdOn: 1454966058000,
        commentsNumber: 2
      },
      {
        clientName: "Свежест ООД",
        title: "Фактури за внос на перилни препарати",
        number: 1342,
        createdBy: "julika@abv.bg",
        createdOn: 1454965058000,
        commentsNumber: 11
      },
      {
        clientName: "Стефан Петров",
        title: "Уверение за бригада",
        number: 1343,
        createdBy: "mtrifonova@yahoo.com",
        createdOn: 1454964058000,
        commentsNumber: 1
      }
    ];

    $scope.loadInitialData = function () {
      //ordersGateway.getAll().then(function onSuccess(data) {
      //  $scope.orders = data;
      //});
    };

    $scope.add = function (order) {
      ordersGateway.add(order).then(function onSuccess() {
        $scope.datalists.push(order);
      });
    };

  });