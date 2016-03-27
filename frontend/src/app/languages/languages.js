/**
 * Created by pepo on 15-11-7.
 */

angular.module('ta.languages', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'common',
    'ta.languages.i18n'
  ])
  .config(function config($stateProvider) {
    $stateProvider.state('languages', {
      url: '/languages',
      views: {
        "main": {
          controller: 'LanguagesCtrl',
          templateUrl: 'languages/languages.tpl.html'
        }
      },
      data: {pageTitle: 'Езици'}
    });
  })

  .service('languagesGateway', function (httpRequest) {
    return {
      add: function (lang) {
        return httpRequest.post('/r/languages?lang=' + lang);
      },
      getAll: function () {
        return httpRequest.get('/r/languages');
      },
      getActive: function () {
        return httpRequest.get('/r/languages/active');
      },
      del: function (id) {
        return httpRequest.del('/r/languages', {id: id});
      },
      changeStatus: function (id, isActive) {
        return httpRequest.put('/r/languages', {id: id, isActive: isActive});
      }
    };
  })

  .controller('LanguagesCtrl', function TranslatorsCtrl($scope, languagesGateway, growl) {

    /**
     * Loads page initial data
     */
    $scope.loadInitialData = function () {
      languagesGateway.getAll().then(
        function onSuccess(data) {
          data.sort(compare);
          $scope.langs = data;
        }
      );
    };

    /**
     * Add new languages
     * @param lang - language
     */
    $scope.addLanguage = function (lang) {
      languagesGateway.add(lang).then(
        function onSuccess() {
          $scope.lang = "";
          $scope.langs.push({id: lang, isActive: false});
          $scope.langs.sort(compare);
          growl.success("{{'LANGUAGES.ADDED_SUCCESSFUL' | translate}}");
        }
      );
    };

    /**
     * Change language status - used or not used in the system
     * @param lang
     */
    $scope.changeStatus = function (lang) {
      languagesGateway.changeStatus(lang.id, lang.isActive).then(
        function onSuccess() {
          growl.success("{{'LANGUAGES.UPDATED_SUCCESSFUL' | translate}}");
        }
      );
    };

    /**
     * Delete language
     * @param row
     */
    // TODO (pkulchev) replace 'row' with better name. Use underscore to find the element when delete. Change function name
    $scope.del = function (row) {
      languagesGateway.del(row.id).then(

        function onSuccess() {
          var index = $scope.langs.indexOf(row);
          if (index !== -1) {
            $scope.langs.splice(index, 1);
          }

          growl.success("{{'LANGUAGES.DELETED_SUCCESSFUL' | translate}}");
        }
      );
    };


    function compare(a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }

  });