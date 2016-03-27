/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('ta.home', [
    'ui.router',
  'i18n',
    'jcs-autoValidate'

  ])

.config(function i18n($translateProvider) {
  $translateProvider
    .translations('bg', {
      TEST: {
        TEST: "BG"
      }
    })
    .translations('en', {
        TEST: {
          TEST: "ENG"
        }
    });

})

  //.run(function (validator, defaultErrorMessageResolver) {
  //  defaultErrorMessageResolver.setCulture('fr-FR');
  //  validator.setValidElementStyling(false);
  //  defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
  //    errorMessages['myCustomError'] = 'My custom error message';
  //    errorMessages['myCustomError2'] = "aaa";
  //    console.log($translate.instant('TEST.TEST'));
  //    errorMessages['anotherErrorMessage'] = 'An error message with the attribute value {0}';
  //  });
  //})

  /**
   * Each section or module of the site can also have its own routes. AngularJS
   * will handle ensuring they are all available at run-time, but splitting it
   * this way makes each module more "self-contained".
   */
  .config(function config($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data: {pageTitle: 'Home'}
    });
  })

  /**
   * And of course we define a controller for our route.
   */
  .controller('HomeCtrl', function HomeController($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  })

;

