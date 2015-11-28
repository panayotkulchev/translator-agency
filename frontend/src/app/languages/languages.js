/**
 * Created by pepo on 15-11-7.
 */

angular.module('ta.languages', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'ngAnimate',
    'common'
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
      all: function () {
        return httpRequest.get('/r/languages');
      },
      allActive: function () {
        return httpRequest.get('/r/languages/active');
      },
      allWithStatus: function () {
        return httpRequest.get('/r/languages/withStatus');
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

    $scope.addLanguage = function (lang) {
      languagesGateway.add(lang).then(
        function onSuccess() {
          growl.success(lang + " е добавен!");

          $scope.lang = "";
          $scope.langs.push({langId: lang, isActive: false});
        }
      );
    };

    var allLangs = function () {
      languagesGateway.allWithStatus().then(
        function onSuccess(data) {
          data.sort(compare);
          $scope.langs = data;
        }
      );
    };

    allLangs();

    $scope.changeStatus = function (lang) {
      languagesGateway.changeStatus(lang.langId, lang.isActive).then(
        function onSuccess() {
          growl.success("Статусът на " + lang.langId + " е редактиран!");
        }
      );
    };

    $scope.del = function (row) {
      console.log(row.langId);
      languagesGateway.del(row.langId).then(
        function onSuccess() {

          growl.success(row.langId + " е изтрит!");

          var index = $scope.langs.indexOf(row);
          if (index !== -1) {
            $scope.langs.splice(index, 1);
          }
        }
      );
    };

    function compare(a,b) {
      if (a.langId < b.langId){
        return -1;
      }
      if (a.langId > b.langId){
        return 1;
      }
      return 0;
    }

  });