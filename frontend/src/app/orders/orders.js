/**
 * Created by pepo on 16-2-8.
 */

angular.module('ta.orders', [
    'ui.router',
    'i18n',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'ui.keypress',
    'common',
    'ta.orders.i18n'
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
      },
      raw: function (orderId) {
        return httpRequest.put("/r/orders/" + orderId + '/raw');
      },
      assign: function (orderId) {
        return httpRequest.put("/r/orders/" + orderId + '/assign');
      },
      execute: function (orderId) {
        return httpRequest.put("/r/orders/" + orderId + '/execute');
      },
      close: function (orderId) {
        return httpRequest.put("/r/orders/" + orderId + '/close');
      },
      addOrderComment: function (orderId, comment) {
        return httpRequest.post("/r/orders/" + orderId + "/comment", {orderId: orderId, comment: comment});
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

    $scope.searchClient = function (clientId) {
      $state.go('clients', {clientId: clientId});
    };

    $scope.editOrder = function (orderId) {
      $state.go("orderEditor", {orderId: orderId});
    };

    $scope.goToOrderEditor = function () {
      $state.go("orderEditor");
    };
  })

  .controller('OrderEditorCtrl', function OrdersCtrl($scope, ordersGateway, clientsGateway,
                                                     $state, $stateParams, growl, CurrentUser) {

    $scope.orderId = $stateParams.orderId;
    $scope.inEditMode = $scope.orderId ? true : false;

    $scope.order = {};
    $scope.comment = {};
    $scope.comments = [];
    $scope.modalData = {};
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

    $scope.initForm = function (orderId) {
      if ($scope.inEditMode) {
        $scope.loadOrder(orderId);
      }
    };

    $scope.editOrder = function (order) {
      ordersGateway.editOrder(order).then(function () {
        growl.success('Поръчката е обновена');
        $scope.goToOrders();
      });
    };

    $scope.raw = function (orderId) {
      ordersGateway.raw(orderId).then(function () {
        $scope.order.status = 'raw';
        growl.success('Статусът е променен');
      });
    };

    $scope.assign = function (orderId) {
      ordersGateway.assign(orderId).then(function () {
        $scope.order.status = 'assigned';
        growl.success('Статусът е променен');
      });
    };

    $scope.execute = function (orderId) {
      ordersGateway.execute(orderId).then(function () {
        $scope.order.status = 'executed';
        growl.success('Статусът е променен');
      });
    };

    $scope.close = function (orderId) {
      ordersGateway.close(orderId).then(function () {
        $scope.order.status = 'closed';
        growl.success('Статусът е променен');
      });
    };

    $scope.addOrderComment = function (orderId, comment) {
      if (!comment) {
        return;
      }

      ordersGateway.addOrderComment(orderId, comment).then(function () {
        var newComment = {content: comment, author: CurrentUser.getUser(), createdOn: new Date()};
        $scope.order.comments.unshift(newComment);
        $scope.comment.content = "";
      });
    };
  });