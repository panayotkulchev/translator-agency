angular.module('cw.clients', [
  'ui.router',
  'ui.bootstrap'
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

        .controller('ClientsCtrl', function ClientsCtrl($scope) {

          $scope.datalists = [
            {
              id: "100",
              name: "ET COMPUTER",
              eik: "202209164",
              dds: "BG202209164",
              address: "5000 Veliko Tarnovo, ul.N.Gabrovski 22A",
              mol: "Ivan Dimitrov",
              phone: "08833545548"
            },
            {
              id: "101",
              name: "ET DRAGAN TZANKOV",
              eik: "345852123",
              dds: "BG202209164",
              address: "5000 Veliko Tarnovo, ul.S.Stambolov 5A",
              mol: "Dragan Tzankov",
              phone: "0897528735"
            },
            {
              id: "102",
              name: "CLOUWAY LTD.",
              eik: "256664521",
              dds: "BG202209164",
              address: "5000 Veliko Tarnovo, ul.V.Levski 21",
              mol: "Petar Vasilev",
              phone: "0895225652"
            },
            {
              id: "103",
              name: "ABV NETWORK",
              eik: "885522456",
              dds: "BG202209164",
              address: "5000 Veliko Tarnovo, bul.Bulgaria 8",
              mol: "Tosho Stefanov",
              phone: "0877854111"
            }
          ];

          $scope.modalContent = "";

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
            $scope.modalTitle = "Edit client";
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
            $scope.modalTitle = "Add client";
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

            $scope.datalists.push(newClient);

          };

          $scope.deleteClient = function (id) {
            for (var i = 0; i < $scope.datalists.length; i++) {
              if ($scope.datalists[i].id == id) {
                $scope.datalists.splice(i, 1);
                break;
              }
            }
          };
        });
