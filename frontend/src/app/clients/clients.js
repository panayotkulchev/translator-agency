angular.module('ta.clients', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'common',
    'ta.clients.i18n'
  ])

  .config(function config($stateProvider) {
    $stateProvider.state('clients', {
      url: '/clients?clientId',
      views: {
        "main": {
          controller: 'ClientsCtrl',
          templateUrl: 'clients/clients.tpl.html'
        }
      },
      data: {pageTitle: 'Clients'}
    });
  })

  .service('clientsGateway', function (httpRequest) {
    return {
      add: function (client) {
        return httpRequest.post('/r/clients', client);
      },
      getAll: function () {
        return httpRequest.get('/r/clients');
      },
      update: function (client) {
        return httpRequest.put("/r/clients", client);
      },
      search: function (query) {
        return httpRequest.get('/r/clients/search/filtered', {query: query});
      },
      deleteById: function (clientId) {
        return httpRequest.del('/r/clients/' + clientId);
      }
    };
  })

  .controller('ClientsCtrl', function ClientsCtrl($scope, clientsGateway, $stateParams) {

    $scope.datalists = [];
    $scope.modalData = {};
    $scope.clientId = $stateParams.clientId || "";

    /**
     * Load page initial data
     */
    $scope.loadInitialData = function () {
      clientsGateway.getAll().then(function onSuccess(data) {
        $scope.datalists = data;

        // If scope.clientId is present only this client is shown
        if ($scope.clientId) {
          $scope.clientId = Number($scope.clientId);
          var client = findById(data, $scope.clientId);
          $scope.searchText = client.name;
        }
      });
    };

    /**
     * Open new client registration dialog
     */
    $scope.openRegistrationModal = function () {
      $scope.modalData.client = {};
      $scope.showAddBtn = true;
      $scope.showEditBtn = false;
      $scope.modalTitle = "CLIENTS.REGISTER";
      $('#myModal').modal('show');
    };

    /**
     * Updates client update dialog
     * @param clent
     */
    $scope.openUpdateModal = function (client) {
      $scope.modalData.client = client;
      $scope.showAddBtn = false;
      $scope.showEditBtn = true;
      $scope.modalTitle = "CLIENTS.UPDATE";
      $('#myModal').modal('show');
    };

    /**
     * Adds client
     * @param client
     */
    $scope.add = function (client) {
      clientsGateway.add(client).then(function onSuccess(data) {
        client.id = data;
        $scope.datalists.push(client);
      });
    };

    /**
     * Update client by id and update it in the list
     * @param client
     * @param index
     */
    $scope.update = function (client, index) {
      clientsGateway.update(client).then(function () {
        $scope.datalists[index] = client;
      });
    };

    /**
     * Delete client by id and remove it from the list
     * @param clientId
     * @param index
     */
    $scope.deleteClient = function (clientId, index) {
      clientsGateway.deleteById(clientId).then(function () {
        $scope.datalists.splice(index, 1);
      });
    };

    /**
     * Find item in a list of items by Id
     * @param itemList
     * @param itemId
     */
    function findById(itemList, itemId) {
      return _.find(itemList, {id: itemId});
    }
  });
