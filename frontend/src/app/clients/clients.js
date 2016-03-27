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

    $scope.loadInitialData = function () {
      clientsGateway.getAll().then(function onSuccess(data) {
        $scope.datalists = data;
        if ($scope.clientId) {
          $scope.clientId = Number($scope.clientId);
          var client = findById(data, $scope.clientId);
          $scope.searchText = client.name;
        }
      });
    };

    function findById(itemList, itemId) {
      return _.find(itemList, {id: itemId});
    }

    $scope.openUpdateModal = function (clent) {
      $scope.modalData.client = clent;
      $scope.showAddBtn = false;
      $scope.showEditBtn = true;
      $scope.modalTitle = "CLIENTS.UPDATE";
      $('#myModal').modal('show');
    };

    $scope.openRegistrationModal = function () {

      $scope.modalData.client = {};
      $scope.showAddBtn = true;
      $scope.showEditBtn = false;
      $scope.modalTitle = "CLIENTS.REGISTER";
      $('#myModal').modal('show');
    };

    $scope.add = function (client) {
      clientsGateway.add(client).then(function onSuccess(data) {
        client.id = data;
        $scope.datalists.push(client);
      });
    };

    $scope.update = function (client, index) {
      clientsGateway.update(client).then(function () {
        $scope.datalists[index] = client;
      });
    };

    $scope.deleteClient = function (clientId, index) {
      clientsGateway.deleteById(clientId).then(function () {
        $scope.datalists.splice(index, 1);
      });
    };

  });
