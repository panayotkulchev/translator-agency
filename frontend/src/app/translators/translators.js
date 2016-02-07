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

  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        TRANSLATORS: {
          NO_LANGUAGE_SELECTED: "Няма избран език!",
          REGISTERED_SUCCESSFUL: "Преводачът е регистриран!",
          UPDATED_SUCCESSFUL: "Преводачът е обновен!",
          DELETED_SUCCESSFUL: "Преводачът е изтрит!",
          CHOOSE_LANGUAGE: "Изберете езици...",
          NEW: "Нов преводач",
          "TRANSLATORS": "Преводачи",
          "NOMENCLATURE": "номенклатура",
          "LISTS": "Списъци",
          "ADD": "Добавяне",
          NAME: "Име: ",
          PERMANENT_ADDRESS: "Постоянен адрес: ",
          "CURRENT_ADDRESS": "Настоящ адрес",
          "PHONES": "Телефон: ",
          "LANGUAGES": "Езици: ",
          "EDUCATION": "Образование",
          "LANGUAGES_EDUCATION": "Езици",
          "EMAIL": "Е-мейл: ",
          "SKYPE": "Скайп: ",
          "EID": "ЕГН: ",
          "DOCUMENTS": "Данни лична карта:",
          "IBAN": "Банкова сметка",
          "OPTIONS": "Опции",
          "FULL_INFO": "Подробно",
          "EDIT": "Редакция",
          "DELETE": "Изтриване",
          "LEGAL_SIGN": "Таг",
          "FILTER": "Филтър: ",
          "ONLY_LEGALS": "само заклети",
          "SEARCH": "Търсене",
          "SEARCH_TOOLTIP": "Намерете всички преводачи за съотвения език",
          "RESULTS": "Резултати: ",
          "TOOLTIP_LEGAL": "заклет",
          "TOOLTIP_FAVORITE": "любим",
          "NO_RESULT_MESSAGE": "Няма намерени резултати!"
        },
        TRANSLATOR_EDITOR: {
          TRANSLATORS: "Преводачи",
          ADD: "добавяне",
          BASIC_INFO: "ОСНОВНИ ДАННИ:",
          NAME: "ИМЕ",
          EGN: "ЕГН",
          LANGS: "ЕЗИЦИ",
          CHOOSE_LANGS: "Избери езици...",
          CONTACTS: "КОНТАКТИ",
          TELEPHONE: "ТЕЛ",
          MAIL: "MAIL",
          SKYPE: "SKYPE",
          EXTRA_INFO: "ДОПЪЛНИТЕЛНИ:",
          CURRENT_ADDRESS: "НСТ АДРЕС",
          PERMANENT_ADDRESS: "ПСТ АДРЕС",
          ID_CARD: "Л КАРТА",
          IBAN: "IBAN",
          FAVORITE: "ЛЮБИМ",
          SIGNED: "ЗАКЛЕТ",
          MEMO: "БЕЛЕЖКА"
        }
      })
      .translations('en', {
        TRANSLATORS: {
          NO_LANGUAGE_SELECTED: "Select language!",
          REGISTERED_SUCCESSFUL: "Registered successful!",
          UPDATED_SUCCESSFUL: "Updated successful!",
          DELETED_SUCCESSFUL: "Deleted successful!",
          CHOOSE_LANGUAGE: "Choose languages...",
          NEW: "New translator",
          "TRANSLATORS": "Translators",
          "NOMENCLATURE": "nomenclature",
          "LISTS": "Lists",
          "ADD": "Add",
          NAME: "Name: ",
          PERMANENT_ADDRESS: "Permanent addr: ",
          "CURRENT_ADDRESS": "Current addr",
          "PHONES": "Phones: ",
          "LANGUAGES": "Languages: ",
          "EDUCATION": "Education",
          "LANGUAGES_EDUCATION": "Езици",
          "EMAIL": "E-mail: ",
          "SKYPE": "Skype: ",
          "EID": "EGN: ",
          "DOCUMENTS": "ID card:",
          "IBAN": "Bank account",
          "OPTIONS": "Options",
          "FULL_INFO": "Full info",
          "EDIT": "Edit",
          "DELETE": "Delete",
          "LEGAL_SIGN": "Tag",
          "FILTER": "Filter: ",
          "ONLY_LEGALS": "Only signed",
          "SEARCH": "Search",
          "SEARCH_TOOLTIP": "Search for translators with selected languages",
          "RESULTS": "Results: ",
          "TOOLTIP_LEGAL": "signed",
          "TOOLTIP_FAVORITE": "favorite",
          "NO_RESULT_MESSAGE": "No results are found!"
        },
        TRANSLATOR_EDITOR: {
          TRANSLATORS: "Translators",
          ADD: "registration",
          BASIC_INFO: "BASIC INFO",
          NAME: "NAME",
          EGN: "EID",
          LANGS: "LANGS",
          CHOOSE_LANGS: "Choose languages...",
          CONTACTS: "CONTACTS",
          TELEPHONE: "TEL",
          MAIL: "MAIL",
          SKYPE: "SKYPE",
          EXTRA_INFO: "EXTRA INFORMATION",
          CURRENT_ADDRESS: "CR ADDRS",
          PERMANENT_ADDRESS: "PRM ADDRS",
          ID_CARD: "LK",
          IBAN: "IBAN",
          FAVORITE: "FAVORITE",
          SIGNED: "SIGNED",
          MEMO: "MEMO"
        }
      });

  })

  .service('translatorsGateway', function (httpRequest) {
    return {
      getAll: function (offset, count, keyword) {
        return httpRequest.post('/r/translators/getAll',
          {offset: offset, count: count, keyword: keyword});
      },
      getFavorites: function () {
        return httpRequest.get('/r/translators/favorites');
      },
      getByEmail: function (email) {
        return httpRequest.get('/r/translators', {email: email});
      },
      getByLanguages: function (languages) {
        return httpRequest.post('/r/translators/getByLanguages', languages);
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
          growl.success("{{'TRANSLATORS.REGISTERED_SUCCESSFUL' | translate}}");
          $state.go("translatorsList");
        }
      );
    };


    $scope.edit = function (translator) {

      translatorsGateway.edit(translator).then(
        function onSuccess() {
          growl.success("{{'TRANSLATORS.UPDATED_SUCCESSFUL' | translate}}");
          $state.go("translatorsList");
        }
      );
    };

    $scope.initForm = function () {

      languagesGateway.getActive().then(
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

  .controller('TranslatorsListCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state, $modal, $translate) {

    $scope.selectedLanguageOptions = [];

    $scope.getByLanguages = function (selectedLanguages) {
      if (selectedLanguages.length > 0) {
        translatorsGateway.getByLanguages(selectedLanguages).then(
          function onSuccess(data) {
            $scope.translators = data;
            $scope.showNoResultsMsg = data.length === 0;
          },
          function onError() {
            $scope.translators = {};
          }
        );
      } else {
        growl.warning("{{'TRANSLATORS.NO_LANGUAGE_SELECTED' | translate}}");
      }
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
          growl.success("{{'TRANSLATORS.DELETED_SUCCESSFUL' | translate}}");
        }
      );
    };

    $scope.findAllLangs = function () {
      languagesGateway.getActive().then(
        function onSuccess(data) {
          $scope.languageOptions = data.sort(compare);
        }
      );
    };

    $scope.initialLoad = function () {
      translatorsGateway.getFavorites().then(function (data) {
        $scope.translators = data;
      });
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