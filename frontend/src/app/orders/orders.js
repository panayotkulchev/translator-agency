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
      url: '/orderEditor?orderId',
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
        },
        TRANSLATION: "Превод",
        LEGALIZATION: "Легализация"
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
          SEARCH: "Search"
        },
        TRANSLATION: "Translation",
        LEGALIZATION: "Legalization"
      });
  })

  .service('ordersGateway', function (httpRequest) {
    return {
      register: function (order) {
        return httpRequest.post('/r/orders', order);
      },
      loadOrder: function (orderId) {
        return httpRequest.get('/r/orders', {orderId: orderId});
      },
      getAll: function () {
        return httpRequest.get('/r/orders');
      },
      editOrder: function (order) {
        return httpRequest.put("/r/orders", order);
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

    $scope.editOrder = function (orderId) {
      console.log("EDIT ORDER");
      $state.go("orderEditor", {orderId: orderId});
    };

    $scope.goToOrderEditor = function () {
      $state.go("orderEditor");
    };

  })

  .controller('OrderEditorCtrl', function OrdersCtrl($scope, ordersGateway, clientsGateway,
                                                     $state, $stateParams, growl) {

    var orderId = $stateParams.orderId;
    $scope.inEditMode = orderId ? true : false;

    $scope.order = {};
    $scope.modalData= {};
    $scope.orderTypeOptions = ['TRANSLATION', 'LEGALIZATION'];
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
      ordersGateway.register(order).then(function onSuccess() {
        growl.success('Поръчката е добавена');
        $scope.goToOrders();
      });
    };

    $scope.goToOrders = function () {
      $state.go("orders");
    };

    $scope.loadOrder = function (orderId) {
      ordersGateway.loadOrder(orderId).then(function (data) {
        $scope.order = data;
      });
    };

    $scope.initForm = function () {
      if($scope.inEditMode) {
        $scope.loadOrder(orderId);
      }
    };

    $scope.editOrder = function (order) {
      ordersGateway.editOrder(order).then(function () {
        growl.success('Поръчката е обновена');
        $scope.goToOrders();
      });
    };

  });