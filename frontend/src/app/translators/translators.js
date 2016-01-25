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
    $stateProvider
      .state('translatorsList', {
        url: '/translatorsList',
        views: {
          "main": {
            controller: 'TranslatorsListCtrl',
            templateUrl: 'translators/translators-list.tpl.html'
          }
        },
        data: {pageTitle: 'Преводачи номенклатура'}
      })

      .state('translatorsEditor', {
        url: '/translatorsEditor?id',
        views: {
          "main": {
            controller: 'TranslatorsEditorCtrl',
            templateUrl: 'translators/translators-editor.tpl.html'
          }
        },
        data: {pageTitle: 'Преводачи номенклатура'}
      })
    ;
  })

  .service('translatorsGateway', function (httpRequest) {
    return {
      getAll: function (offset, count, keyword) {
        return httpRequest.post('/r/translators/getAll',
          {offset: offset, count: count, keyword: keyword});
      },
      getByEmail: function (email) {
        return httpRequest.get('/r/translators', {email: email});
      },
      getByLanguages: function (selectedLanguages) {
        return httpRequest.post('/r/translators/getByLanguages', selectedLanguages);
      },
      add: function (translator) {
        return httpRequest.post('r/translators/add', translator);
      },
      edit: function (translator) {
        return httpRequest.post('r/translators/edit', translator);
      },
      deleteById: function (id) {
        return httpRequest.del('/r/translators/delete', {id: id});
      }
    };
  })

  .controller('TranslatorsEditorCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state, $stateParams) {

    var email = $stateParams.id;
    $scope.inEditMode = email ? true : false;

    $scope.translator = {};
    $scope.translator.favorite = false;
    $scope.translator.registered = false;

    $scope.add = function (translator) {

      translatorsGateway.add(translator).then(
        function onSuccess() {
          growl.success($scope.translator.name + " беше добавен!");
          $scope.translator = {};
        },
        function onError() {
          growl.warning("Възникна системна грешка!");
        }
      );
    };

    $scope.edit = function (translator) {

      translatorsGateway.edit(translator).then(
        function onSuccess() {
          growl.success($scope.translator.name + " беше редактиран!");
        },
        function onError() {
          growl.warning("Възникна системна грешка!");
        }
      );
    };

    $scope.initForm = function () {

      languagesGateway.allActive().then(
        function onSuccess(data) {
          $scope.languageOptions = data.sort(compare);
        }
      );

      if ($scope.inEditMode) {

        translatorsGateway.getByEmail(email).then(
          function onSuccess(data) { console.log(data);
            $scope.translator = data;
          });

      }


    };

    $scope.cancel = function () {
      $state.go("translatorsList");
    };

  })

  .controller('TranslatorsListCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state, $modal, $translate) {

    $scope.getByLanguages = function (selectedLanguages) {

      translatorsGateway.getByLanguages(selectedLanguages).then(
        function onSuccess(data) {
          $scope.translators = data;
          $scope.showNoResultsMsg = data.length === 0;
        },
        function onError() {
          $scope.translators = {};
          growl.warning("Възникна системна грешка!");
        }
      );
    };

    $scope.deleteById = function (id) {
      translatorsGateway.deleteById(id).then(
        function onSuccess() {
          var position = $scope.translators.map(function (e) {
            return e.email;
          }).indexOf(id);
          if (position !== -1) {
            $scope.translators.splice(position, 1);
          }
        },
        function onError() {
          growl.warning("Системна грешка!");
        }
      );
    };

    $scope.findAllLangs = function () {
      languagesGateway.allActive().then(
        function onSuccess(data) {
          $scope.languageOptions = data.sort(compare);
        }
      );
    };

    $scope.goToTranslatorEditor = function () {
      $state.go("translatorsEditor");
    };

    $scope.editTranslator = function (id) {
      $state.go("translatorsEditor", {id: id});
    };

    $scope.translators = [];

    $scope.open = function (translator) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'translators/myModalContent.tpl.html',
        controller: 'TranslatorInfoCtrl',
        resolve: {
          data: function () {
            return translator;
          }
        }
      });

    };

  })

  .controller('TranslatorInfoCtrl', function ($scope, $modalInstance, data) {
    $scope.translator = data;
    $scope.ok = function () {
      $modalInstance.close();
    };
  })

;

function compare(a, b) {

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}