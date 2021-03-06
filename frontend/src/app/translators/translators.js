/**
 * Created by pepo on 15-10-13.
 */
angular.module('ta.translators', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'common',
    'ta.translators.i18n'
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
      },
      uploadImage: function (id, image) {
        return httpRequest.post("/r/translators/" + id + "/image", {image: image});
      }
    };
  })

  .controller('TranslatorsEditorCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state, $stateParams, $window, $q) {

    var email = $stateParams.id;
    $scope.inEditMode = email ? true : false;

    $scope.translator = {avatar: "assets/avatar.png"};
    $scope.translator.favorite = false;
    $scope.translator.registered = false;

    /**
     * Add new translator
     * @param translator
     */
    $scope.add = function (translator) {

      translatorsGateway.add(translator).then(
        function onSuccess() {
          growl.success("{{'TRANSLATORS.REGISTERED_SUCCESSFUL' | translate}}");
          $state.go("translatorsList");
        }
      );
    };

    /**
     * Edit translator
     * @param translator
     */
    $scope.edit = function (translator) {

      translatorsGateway.edit(translator).then(
        function onSuccess() {
          growl.success("{{'TRANSLATORS.UPDATED_SUCCESSFUL' | translate}}");
          $state.go("translatorsList");
        }
      );
    };

    /**
     * Submit translator editor form
     * @param translator
     */
    $scope.submitForm = function (translator) {
      if($scope.inEditMode){
        $scope.edit(translator);
      } else {
        $scope.add(translator);
      }
    };

    /**
     * Initialize translator form with needed data
     */
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

    /**
     * Auto scroll to the top of the page
     */
    $scope.scrollTop = function () {
      $window.scrollTo(0, 0);
    };

    /**
     * Go to translator list page
     */
    $scope.cancel = function () {
      $state.go("translatorsList");
    };

    $("#output").click(function() {
      $("#browser").trigger("click");
    });

    var isValid = function (file) {
      var deferred = $q.defer();
      var valid = false;
      var fileSizeReader = new FileReader();

      fileSizeReader.onloadend = function () {
        var arrayBuffer = fileSizeReader.result;
        valid = arrayBuffer.byteLength < (1024 * 1024);

        if (valid) {
          deferred.resolve();

        } else {
          growl.warning("File should be less than 1MB");
          deferred.reject();
        }
      };

      fileSizeReader.readAsArrayBuffer(file);

      return deferred.promise;
    };

    var applyAvatar = function (file) {
      var reader = new FileReader();

      reader.onloadend = function () {
        var dataURL = reader.result;
        $scope.translator.avatar = dataURL;
        var output = document.getElementById('output');
        output.src = dataURL;
      };

      reader.readAsDataURL(file);
    };

    $scope.$watch('avatarFile', function (newVal, oldVal) {
      if (!angular.equals(newVal, oldVal)){
        isValid(newVal).then(function () {
          console.log("then  ");
          applyAvatar(newVal);
        });
      }
    });
  })

  .controller('TranslatorsListCtrl', function TranslatorsCtrl($scope, translatorsGateway, languagesGateway, growl, $state, $uibModal) {

    $scope.translators = [];
    $scope.selectedLanguageOptions = [];

    /**
     * Get translators by their languages
     * @param selectedLanguages
     */
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

    /**
     * Delete translator by id
     * @param id
     */
    $scope.deleteById = function (id) {
      translatorsGateway.deleteById(id).then(
        function onSuccess() {
          // TODO use underscore to find the index
          var position = $scope.translators.map(function (e) {return e.email; }).indexOf(id);
          if (position !== -1) {
            $scope.translators.splice(position, 1);
          }
          growl.success("{{'TRANSLATORS.DELETED_SUCCESSFUL' | translate}}");
        }
      );
    };

    /**
     * Loads all active languages
     */
    $scope.findAllLangs = function () {
      languagesGateway.getActive().then(
        function onSuccess(data) {
          $scope.languageOptions = data.sort(compare);
        }
      );
    };

    /**
     * Loads all translators marked as 'favorite' at page enter
     */
    $scope.initialLoad = function () {
      translatorsGateway.getFavorites().then(function (data) {
        $scope.translators = data;
      });
    };

    /**
     * Go to translator edit page to add new translator
     */
    $scope.goToTranslatorEditor = function () {
      $state.go("translatorsEditor");
    };

    /**
     * Go to translator edit page to edit translator by his id
     */
    $scope.editTranslator = function (id) {
      $state.go("translatorsEditor", {id: id});
    };

    /**
     * Open translator information dialog
     * @param translator
     */
    //TODO change with better name
    $scope.open = function (translator) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'translators/translator-info-modal.tpl.html',
        controller: 'TranslatorInfoCtrl',
        resolve: {
          data: function () {
            return translator;
          }
        }
      });
    };

  })

  .controller('TranslatorInfoCtrl', function ($scope, $uibModalInstance, data) {

    $scope.translator = data;

    /**
     * Close dialog
     */
    $scope.ok = function () {
      $uibModalInstance.close();
    };
  })

  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }])

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