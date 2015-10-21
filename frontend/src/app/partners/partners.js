angular.module('cw.partners', [
  'ui.router',
  'ui.bootstrap'
])

        .config(function config($stateProvider) {
          $stateProvider.state('partners', {
            url: '/partners',
            views: {
              "main": {
                controller: 'PartnersCtrl',
                templateUrl: 'partners/partners.tpl.html'
              }
            },
            data: {pageTitle: 'Partners'}
          });
        })

        .controller('PartnersCtrl', function ClientsCtrl($scope) {

          $scope.datalists = [
            {
              id: "200",
              name: "MOST COMPUTERS",
              eik: "202209164",
              dds: "BG202209164",
              address: "1111 Sofia, bul. Shipchenski prohod bl.240",
              mol: "Meri Vasileva",
              phone: "02/5535045"
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
            $('#myModal').modal('show');
          };

          $scope.save = function () {
            for (var i = 0; i < $scope.datalists.length; i++) {
              console.log($scope.datalists[i].id);
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

          $scope.deletePartner = function (id) {
            for (var i = 0; i < $scope.datalists.length; i++) {
              if ($scope.datalists[i].id == id) {
                $scope.datalists.splice(i, 1);
                break;
              }
            }
          };
        });
