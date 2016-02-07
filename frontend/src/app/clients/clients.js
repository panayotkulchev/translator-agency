angular.module('ta.clients', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'common'
  ])

  .config(function config($stateProvider) {
    $stateProvider.state('clients', {
      url: '/clients',
      views: {
        "main": {
          controller: 'ClientsCtrl',
          templateUrl: 'clients/clients.tpl.html'
        }
      },
      data: {pageTitle: 'Clients'}
    });
  })

  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        CLIENTS: {
          NEW: "Нов клиент",
          SEARCH: "Търси в резултатите...",
          NAME: "ИМЕ",
          EIK: "БУЛСТАТ",
          DDS: "ДДС",
          ADDRESS: "АДРЕС",
          MOL: "МОЛ",
          PHONE: "ТЕЛЕФОН",
          OPTIONS: "ОПЦИИ",
          EDIT: "Редакция",
          DELETE: "Изтриване",
          REGISTER: "Регистрация на клиент",
          UPDATE: "Обновяване на клиент"
        }
      })
      .translations('en', {
        CLIENTS: {
          NEW: "New client",
          SEARCH: "Search in results...",
          NAME: "NAME",
          EIK: "EIK",
          DDS: "DDS",
          ADDRESS: "ADDR",
          MOL: "MOL",
          PHONE: "TEL",
          OPTIONS: "OPTIONS",
          EDIT: "Edit",
          DELETE: "Delete",
          REGISTER: "Register new client",
          UPDATE: "Update client information"
        }
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
      update : function (client) {
        return httpRequest.put("/r/clients", client);
      },
      deleteById: function (clientId) {
        return httpRequest.del('/r/clients/' + clientId);
      }
    };
  })

  .controller('ClientsCtrl', function ClientsCtrl($scope, clientsGateway) {

    $scope.datalists = [];

    $scope.modalContent = "";

    $scope.loadInitialData = function () {
      clientsGateway.getAll().then(function onSuccess(data) {
        $scope.datalists = data;
      });
    };

    $scope.openModal = function (id, name, eik, dds, address, mol, phone) {
      $scope.id = id;
      $scope.name = name;
      $scope.eik = eik;
      $scope.dds = dds;
      $scope.address = address;
      $scope.mol = mol;
      $scope.phone = phone;
      $scope.showAddBtn = false;
      $scope.showEditBtn = true;
      $scope.modalTitle = "CLIENTS.UPDATE";
      $('#myModal').modal('show');
    };

    $scope.openAddModal = function () {
      $scope.id = "";
      $scope.name = "";
      $scope.eik = "";
      $scope.dds = "";
      $scope.address = "";
      $scope.mol = "";
      $scope.phone = "";
      $scope.showAddBtn = true;
      $scope.showEditBtn = false;
      $scope.modalTitle = "CLIENTS.REGISTER";
      $('#myModal').modal('show');
    };


    $scope.save = function () {
      for (var i = 0; i < $scope.datalists.length; i++) {

        if ($scope.datalists[i].id == $scope.id) {
          $scope.datalists[i].name = $scope.name;
          $scope.datalists[i].eik = $scope.eik;
          $scope.datalists[i].dds = $scope.dds;
          $scope.datalists[i].address = $scope.address;
          $scope.datalists[i].mol = $scope.mol;
          $scope.datalists[i].phone = $scope.phone;
          break;
        }

      }
    };

    $scope.add = function () {
      //put to db and get it because need id
      var newClient = {};
      newClient.name = $scope.name;
      newClient.eik = $scope.eik;
      newClient.dds = $scope.dds;
      newClient.address = $scope.address;
      newClient.mol = $scope.mol;
      newClient.phone = $scope.phone;
      //$scope.datalists.push(newClient);

      clientsGateway.add(newClient).then(function onSuccess() {
        $scope.datalists.push(newClient);
      });

    };

    $scope.deleteClient = function (clientId, index) {
      clientsGateway.deleteById(clientId);
      $scope.datalists.splice(index, 1);
    };
  });
