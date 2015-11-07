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
            add: function (lang) { console.log(lang);
              return httpRequest.post('/r/languages?lang='+ lang);
            },
            all: function() {
              return httpRequest.get('/r/languages');
            }
          };
        })

        .controller('LanguagesCtrl', function TranslatorsCtrl($scope, languagesGateway, growl) {

          $scope.addLanguage = function (lang) {
            languagesGateway.add(lang).then(
                    function onSuccess() {
                      $scope.langs.push(lang);
                      growl.success(lang + " е добавен!");
                    }
            );
          };

          var allLangs = function () {
            languagesGateway.all().then(
                    function onSuccess(data) {
                      $scope.langs = data; console.log(data);
                    }
            );
          };

          allLangs();

        });