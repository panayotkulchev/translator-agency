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
    $stateProvider.state('orderEditor', {
      url: '/orderEditor',
      views: {
        "main": {
          controller: 'OrderEditorCtrl',
          templateUrl: 'orders/order-editor.tpl.html'
        }
      },
      data: {pageTitle: 'Orders Editor'}
    });
  })

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
          NEW: "Нова поръчка",
          ADD: "добавяне",
          TITLE: "ЗАГЛАВИЕ",
          DESCRIPTION: "ОПИСАНИЕ",
          CLIENT: "КЛИЕНТ",
          SEARCH: "Търси"
        }
      })
      .translations('en', {
        ORDERS: {
          ORDERS: "Orders",
          NOMENCLATURE: "list",
          NEW: "New order",
          ADD: "registration",
          TITLE: "TITLE",
          DESCRIPTION: "DESCRIPTION",
          CLIENT: "CLIENT",
          SEARCH: "Търси"
        }
      });
  })

  .service('ordersGateway', function (httpRequest) {
    return {
      register: function (order) {
        console.log("send");
        return httpRequest.post('/r/orders', order);
      },
      getAll: function () {
        return httpRequest.get('/r/orders');
      },
      update: function (client) {
        return httpRequest.put("/r/orders", client);
      }
    };
  })

  .controller('OrdersCtrl', function OrdersCtrl($scope, $state, ordersGateway) {

    $scope.orderList = [];

    $scope.loadInitialData = function () {
      ordersGateway.getAll().then(function onSuccess(data) {
        $scope.orderList = data;
      });
    };

    $scope.goToOrderEditor = function () {
      $state.go("orderEditor");
    };

  })

  .controller('OrderEditorCtrl', function OrdersCtrl($scope, ordersGateway, clientsGateway, $state) {

    $scope.order = {};
    $scope.modalData= {};
    $scope.orderTypeOptions = ['Превод', 'Легализация', 'Синхронен превод', 'Устен превод'];
    $scope.openClientSearchDialog = function () {
      $scope.modalData.modalTitle = "Търсене на клиент";
      $('#clientSearchModal').modal('show');
    };

    $scope.searchClient = function (query) {
      clientsGateway.search(query).then(function (data) {
        $scope.clientsList = data;
      });
    };

    $scope.select = function (client) {
      $scope.order.clientId = client.id;
      $scope.order.clientName = client.name;
    };

    $scope.registerOrder = function (order) {
      console.log(order);
      ordersGateway.register(order).then(function onSuccess() {
        $scope.goToOrders();
      });
    };

    $scope.goToOrders = function () {
      $state.go("orders");
    };

  });