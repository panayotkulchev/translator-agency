/**
 * Created by pepo on 15-10-13.
 */
angular.module('ta.translators', [
  'ui.router',
  'ui.bootstrap',
  'ta.http',
  'common'
])
        .config(function config($stateProvider) {
          $stateProvider.state('translators', {
            url: '/translators',
            views: {
              "main": {
                controller: 'TranslatorsCtrl',
                templateUrl: 'translators/translators.tpl.html'
              }
            },
            data: {pageTitle: 'Преводачи'}
          });
        })

        .service('translatorsGateway', function (httpRequest) {
          return {
            getAll: function (offset, count, keyword) {
              return httpRequest.post('/r/nomenclature/translators',
                      {offset: offset, count: count, keyword: keyword});
            },
            add: function (translatorDto) {
              return httpRequest.post('r/nomenclature/translators', translatorDto);
            },
            deleteById: function (id) {
              return httpRequest.del('/r/nomenclature/translators', {id: id});
            }
          };
        })

        .controller('TranslatorsCtrl', function TranslatorsCtrl($scope, translatorsGateway, growl) {

          $scope.translator = {};

          $scope.add = function (translator) {

            var translatorDto = toDto(translator);

            translatorsGateway.add(translatorDto).then(
                    function onSuccess() {
                      growl.success($scope.translator.name + " was added!");
                      $scope.translator = {};
                    },
                    function onError() {
                      growl.warning("Unexpected system error!");
                    }
            );
          };

          $scope.deleteById = function (id) {
            translatorsGateway.deleteById(id).then(
                    function onSuccess() {
                      var position = $scope.translators.map(function (e) {
                        return e.id;
                      }).indexOf(id);
                      if (position !== -1) {
                        $scope.translators.splice(position, 1);
                      }
                    },
                    function onError() {
                      growl.warning("Unexpected system error!");
                    }
            );
          };

          var toDto = function (translator) {

            var dto = {};
            dto.name = translator.name;
            dto.permanentAddress = translator.permanentAddress;
            dto.currentAddress = translator.currentAddress;
            dto.phones = translator.phones;
            dto.languages = extractLanguages(translator.languages);
            dto.educations = extractEducations(translator.educations);
            dto.email = translator.email;
            dto.skype = translator.skype;
            dto.eid = translator.eid;
            dto.document = translator.document;
            dto.iban = translator.iban;
            console.log(dto);
            return dto;

          };

          var extractLanguages = function (languages) {
            var result = [];
            angular.forEach(languages, function (language) {
              result.push(language.name);
            });
            return result;
          };

          var extractEducations = function (educations) {
            var result = [];
            angular.forEach(educations, function (education) {
              result.push(education.name);
            });
            return result;
          };

          $scope.languageOptions = [
            {name: 'Английски'},
            {name: 'Български'},
            {name: 'Руски'},
            {name: 'Френски'},
            {name: 'Испански'},
            {name: 'Полски'},
            {name: 'Холандски'}
          ];

          $scope.educationOptions = [
            {name: 'Ез. Гимназия'},
            {name: 'Пр. Лингвистика'}
          ];

          $scope.translators = [
            {
              name: "Иван Игнатов Петров",
              languages: "Английски, Немски",
              registered: true,
              favorite: true,
              phones: "0883 - 345 - 545",
              email: 'ivanpetrov1976@gmail.com'
            },
            {
              name: "Милен Игнатов Димитров",
              languages: "Английски",
              registered: true,
              phones: "0879 - 698 - 440',' 062-67-88-20",
              email: "milen_id@abv.bg"
            },
            {
              name: "Радка Петрова Чолакова",
              languages: "Английски, Руски",
              registered: false,
              favorite: true,
              phones: "0895 - 252 - 545",
              email: 'radi86@yahoo.com'
            },
            {
              name: "Емилия Игнатов Ангелова",
              languages: "Английски",
              registered: true,
              phones: "0899 - 882 - 320",
              email: "emi_angelova@abv.bg"
            },
            {
              name: "Дончо Цанков Димитров",
              languages: "Английски",
              registered: false,
              phones: "0978 - 665 - 423, 062-78-78-34",
              email: "milen_id@abv.bg"
            },
            {
              name: "Изабел Миланова Русева",
              languages: "Английски, Арабски",
              registered: false,
              phones: "0895 - 328 - 646",
              email: 'izabel_rus1974@yahoo.com'
            }

          ];

          //$scope.items = ['item1', 'item2', 'item3'];
          //
          //$scope.animationsEnabled = true;
          //
          //$scope.open = function (size) {
          //
          //  var modalInstance = $modal.open({
          //    animation: $scope.animationsEnabled,
          //    templateUrl: 'translators/myModalContent.html',
          //    controller: 'ModalInstanceCtrl',
          //    size: size,
          //    resolve: {
          //      items: function () {
          //        return $scope.items;
          //      }
          //    }
          //  });
          //
          //  modalInstance.result.then(function (selectedItem) {
          //    $scope.selected = selectedItem;
          //  }, function () {
          //    $log.info('Modal dismissed at: ' + new Date());
          //  });
          //};
          //
          //$scope.toggleAnimation = function () {
          //  $scope.animationsEnabled = !$scope.animationsEnabled;
          //};

        })

        .
        controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
          //
          //$scope.items = items;
          //$scope.selected = {
          //  item: $scope.items[0]
          //};
          //
          //$scope.ok = function () {
          //  $modalInstance.close($scope.selected.item);
          //};
          //
          //$scope.cancel = function () {
          //  $modalInstance.dismiss('cancel');
          //};
        })

;