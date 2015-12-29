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
      add: function (translatorDto) {
        return httpRequest.post('r/translators/add', translatorDto);
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

      translatorsGateway.add($scope.translator).then(
        function onSuccess() {
          growl.success($scope.translator.name + " беше добавен!");
          $scope.translator = {};
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
          function onSuccess(data) {
            $scope.translator = data;
          });

      }


    };

    $scope.cancel = function () {
      $state.go("translatorsList");
    };

  })

  .controller('TranslatorsListCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state) {

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

  });

function compare(a, b) {

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}


//{
//  name: "Иван Игнатов Петров",
//    languages: "Английски, Немски",
//  registered: true,
//  favorite: true,
//  phones: "0883 - 345 - 545",
//  email: 'ivanpetrov1976@gmail.com'
//},
//{
//  name: "Милен Игнатов Димитров",
//    languages: "Английски",
//  registered: true,
//  phones: "0879 - 698 - 440',' 062-67-88-20",
//  email: "milen_id@abv.bg"
//},
//{
//  name: "Радка Петрова Чолакова",
//    languages: "Английски, Руски",
//  registered: false,
//  favorite: true,
//  phones: "0895 - 252 - 545",
//  email: 'radi86@yahoo.com'
//},
//{
//  name: "Емилия Игнатов Ангелова",
//    languages: "Английски",
//  registered: true,
//  phones: "0899 - 882 - 320",
//  email: "emi_angelova@abv.bg"
//},
//{
//  name: "Дончо Цанков Димитров",
//    languages: "Английски",
//  registered: false,
//  phones: "0978 - 665 - 423, 062-78-78-34",
//  email: "milen_id@abv.bg"
//},
//{
//  name: "Изабел Миланова Русева",
//    languages: "Английски, Арабски",
//  registered: false,
//  phones: "0895 - 328 - 646",
//  email: 'izabel_rus1974@yahoo.com'
//}