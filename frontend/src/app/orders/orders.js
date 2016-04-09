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
      getClosed: function () {
        return httpRequest.get('/r/orders/closed');
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

    /**
     * Load page initial data
     */
    $scope.loadInitialData = function () {
      ordersGateway.getAll().then(function onSuccess(data) {
        $scope.orderList = data;
      });
      $scope.radioModel = 'Opened';
    };

    /**
     * Load all but closed orders
     */
    $scope.loadAll = function () {
      ordersGateway.getAll().then(function onSuccess(data) {
        $scope.orderList = data;
      });
    };

    /**
     * Load all closed orders
     */
    $scope.loadClosed = function () {
      ordersGateway.getClosed().then(function onSuccess(data) {
        $scope.orderList = data;
      });
    };

    /**
     * Go to clients page to search for client by his id
     * @param clientId
     */
    $scope.searchClient = function (clientId) {
      $state.go('clients', {clientId: clientId});
    };

    /**
     * Go to page for editing orders
     * @param orderId
     */
    $scope.editOrder = function (orderId) {
      $state.go("orderEditor", {orderId: orderId});
    };

    /**
     * Go to page for adding new order
     */
    $scope.goToOrderEditor = function () {
      $state.go("orderEditor");
    };
  })

  .controller('OrderEditorCtrl', function OrdersCtrl($scope, ordersGateway, clientsGateway,
                                                     $state, $stateParams, growl, CurrentUser) {

    $scope.orderId = $stateParams.orderId;
    $scope.inEditMode = $scope.orderId ? true : false;

    $scope.order = {type: 'TRANSLATION'};
    $scope.comment = {};
    $scope.comments = [];
    $scope.modalData = {};
    $scope.orderTypeOptions = ['TRANSLATION', 'LEGALIZATION'];

    /**
     * Open client search dialog
     */
    $scope.openClientSearchDialog = function () {
      $scope.modalData.modalTitle = "Търсене на клиент"; // TODO add translation
      $('#clientSearchModal').modal('show');
    };

    /**
     * Search for clients
     * @param query
     */
    $scope.searchClient = function (query) {
      if (!query || query.length < 3) {
        return;
      }

      clientsGateway.search(query).then(function (data) {
        $scope.clientsList = data;
      });
    };

    /**
     * Select client
     * @param client
     */
    $scope.select = function (client) {
      $scope.order.clientId = client.id;
      $scope.order.clientName = client.name;
    };

    /**
     * Register new order
     * @param order
     */
    $scope.registerOrder = function (order) {
      ordersGateway.register(order).then(function onSuccess() {
        growl.success('Поръчката е добавена'); // TODO add translation
        $scope.goToOrders();
      });
    };

    $scope.submitOrderForm = function (order) {
      if ($scope.inEditMode){
        $scope.editOrder(order);
      } else {
        $scope.registerOrder(order);
      }
    };

    /**
     * Go to orders page
     */
    $scope.goToOrders = function () {
      $state.go("orders");
    };

    /**
     * Load order by id
     * @param orderId
     */
    $scope.loadOrder = function (orderId) {
      ordersGateway.loadOrder(orderId).then(function (data) {
        $scope.order = data;
        $scope.radioModel = data.status;
      });
    };

    /**
     * Initialize order form for editing
     * @param orderId
     */
    $scope.initForm = function (orderId) {
      if ($scope.inEditMode) {
        $scope.loadOrder(orderId);
      }
    };

    // TODO add translation for the next couple functions
    /**
     * Edit order
     * @param order
     */
    $scope.editOrder = function (order) {
      ordersGateway.editOrder(order).then(function () {
        growl.success('Поръчката е обновена');
        $scope.goToOrders();
      });
    };

    /**
     * Change order status to 'raw'
     * @param orderId
     */
    $scope.raw = function (orderId) {
      ordersGateway.raw(orderId).then(function () {
        $scope.order.status = 'raw';
        growl.success('Статусът е променен');
      });
    };

    /**
     * Change order status to 'assigned'
     * @param orderId
     */
    $scope.assign = function (orderId) {
      ordersGateway.assign(orderId).then(function () {
        $scope.order.status = 'assigned';
        growl.success('Статусът е променен');
      });
    };

    /**
     * Change order status to 'executed'
     * @param orderId
     */
    $scope.execute = function (orderId) {
      ordersGateway.execute(orderId).then(function () {
        $scope.order.status = 'executed';
        growl.success('Статусът е променен');
      });
    };

    /**
     * Change order status to 'closed'
     * @param orderId
     */
    $scope.close = function (orderId) {
      ordersGateway.close(orderId).then(function () {
        $scope.order.status = 'closed';
        growl.success('Статусът е променен');
      });
    };

    /**
     * Add order comment
     * @param orderId
     * @param comment
     */
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