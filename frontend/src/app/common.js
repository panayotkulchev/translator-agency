/**
 * @ngdoc module
 * @name bss.common
 * @description
 *
 * The `bss.common` module provides all common classes which need to be re-used between all modules of the BSS app.
 *
 * <div doc-module-components="ngAnimate"></div>
 */

/**
 * @ngdoc service
 * @name eventBus
 * @kind object
 *
 * @description
 * The eventBus service documentation.
 *
 * Click here {@link bss.common eventBus to learn more about it}.
 */
angular.module('common', ['ui.bootstrap'])

  .directive('datetimepicker', function () {
    function _byDefault(value, defaultValue) {
      return _isSet(value) ? value : defaultValue;
      function _isSet(value) {
        return !(value === null || value === undefined || !isNaN(value) || value === '');
      }
    }

    return {
      restrict: 'E',
      scope: {
        id: '@',
        name: '@',
        ngModel: '=',
        format: '@',
        todayBtn: '@',
        weekStart: '@',
        minuteStep: '@',
        customStyle: '@',
        initValue: '@',
        readOnly: '@'
      },
      template: '<input type="text" value="{{initValue}}" class="form-control" name="{{name}}" id="{{id}}" style="{{customStyle}}" ng-readonly="{{readOnly}}"/>',
      link: function (scope, element, attrs) {
        var $element = $(element.children()[0]);

        $element.datetimepicker({
          format: _byDefault(scope.format, 'dd/mm/yyyy hh:ii'),
          weekStart: _byDefault(scope.weekStart, '1'),
          todayBtn: _byDefault(scope.todayBtn, 'true') === 'true',
          minuteStep: parseInt(_byDefault(scope.minuteStep, '5'), 10),
          autoclose: 1,
          todayHighlight: 1,
          startView: 2,
          minView: 2,
          forceParse: 0,
          showMeridian: 1,
          language:'bg'
        })
          .on('changeDate', function (ev) {
            scope.$apply(function () {
              var selectedDate = new Date(ev.date);
              scope.ngModel = selectedDate.getTime();
            });
          });

        scope.$watch('ngModel', function (newValue, oldValue) {

          if (!newValue) {
            $element.datetimepicker('update', null);
            $element.val('');
            return;
          }

          $element.datetimepicker('update', newValue);
        });
      }
    };
  })

/**
 * Provides for search functionality
 *
 * When input value 'query' is changed it is set as state param by changeState().
 * Watcher listen for changes in the $stateParams.query .
 * and fires submitQuery() .
 * queryChanged() is called from submitQuery and uses query as value param,
 * and triggers parent scope's search(). The las one must be implemented.
 * Watcher also adds client's back button and refresh page functionality .
 */
  .directive('searchBox', function () {

    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        queryChanged: '&onChange',
        placeholder: '@',
        searchBox: '=name',
        initialLoad: '='
      },
      templateUrl: 'search-box.tpl.html'
    };

    directive.controller = [ '$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

      var searchBox = {};
      searchBox.value = "";

      searchBox.submitQuery = function () {
        var q = $stateParams.query;
        if (($scope.initialLoad && angular.isUndefined(q)) || (angular.isDefined(q) && q.length > 2)) {
          searchBox.value = $stateParams.query !== undefined ? $stateParams.query : "";
          $scope.queryChanged({keyword: searchBox.value});
        }
      };

      $scope.searchBox = searchBox;

      $scope.$watch(function () {
        return $stateParams.query;
      }, function () {
        searchBox.submitQuery();
      });

      $scope.changeState = function (query) {

        if (query.length === 0 || query.length > 2) {
          $stateParams.query = query;
          $state.transitionTo($state.$current.name, {query: query}, {notify: false});
        }
      };
    }];

    return directive;
  })

/**
 * @ngdoc directive
 *
 * Example usages:
 * <pre>
 * <form name="exampleForm">
 *   // NOTE: the form must have a name. Otherwise validation will not work.
 *
 *   // Automatic field detection
 *   <validation-box>
 *     <input name="fieldName" />
 *     // NOTE: it must contain an input field with a name. Otherwise validation will not work.
 *   </validation-box>
 *
 *
 *   // Explicit field assignment
 *   // Useful if there are more than one inputs (ex.: when the input is a complex directive)
 *   <validation-box field="fieldName">
 *     <input name="fieldName" />
 *   </validation-box>
 *
 *   // Column layout of label and field
 *   <validation-box label="Field label" label-class="col-md-2" field-class="col-md-5">
 *     <input name="fieldName" />
 *   </validation-box>
 *
 * </form>
 * </pre>
 *
 * @param {string} field name of the form field to be validated. If not specified, the name of the first input field is used.
 * @param {string} label label text of the field. Can be omitted if no label is desired.
 * @param {string} error-messages template file for validation error messages. If not specified, a default is used.
 * @param {string} label-class css class for styling the label. Useful for customizing the form layout.
 * @param {string} panel-class css class for styling the input field. Useful for customizing the form layout.
 *
 */
  .directive('validationBox', function () {
    return {
      restrict: 'E',
      require: '^form',
      transclude: true,
      templateUrl: 'validation-box.tpl.html',
      scope: {
        label: '@',
        field: '@',
        errorMessages: '@',
        labelClass: '@',
        fieldClass: '@'
      },
      link: function(scope, elem, attrs, formCtrl) {
        scope.form = formCtrl;

        if (scope.field) {
          scope.formField = formCtrl[scope.field];

        } else {
          // Look for containing input elements
          var inputElem = elem.find('input')[0];
          if (inputElem){
            scope.formField = formCtrl[inputElem.name];
          }
        }
      }
    };
  })

  .directive('clickAndDisable', function () {
    return {
      scope: {
        clickAndDisable: '&'
      },
      link: function (scope, iElement, iAttrs) {
        iElement.bind('click', function () {
          iElement.prop('disabled', true);
          scope.clickAndDisable()['finally'](function () {
            iElement.prop('disabled', false);
          });
        });
      }
    };
  })

/**
 * Provide pagination functionality.
 * Used as element.
 * When page is changed search is called with offset and count params
 * onPageChange() must be implemented in parent scope
 *
 * Scope's nextPage() and previousPage() and hasNext() are used
 * in the pager template
 *
 * Pager is an object used for exchange data outside isolated scope
 * pager.accept takes care of hasNext page on base of data.length
 * pager.rollback is used in case of error response
 * pager.reset resets all values
 */
  .directive('simplePager', function () {

    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'simple-pager.tpl.html',
      scope: {
        search: '&onPageChange',
        pageSize: '=',
        pager: '=name'
      }
    };

    directive.controller = ['$scope', function ($scope) {

      var pager = {};
      pager.currentPage = 1;
      pager.pageSize = $scope.pageSize;
      pager.count = $scope.pageSize + 1;
      pager.offset = 0;
      $scope.hasNext = false;

      pager.accept = function (data) {
        $scope.hasNext = data.length > this.pageSize;
      };

      pager.rollbackPage = function () {
        this.currentPage = this.oldPage;
      };

      pager.reset = function () {
        this.currentPage = 1;
        this.oldPage = 1;
        this.offset = 0;
        $scope.hasNext = false;
      };

      $scope.nextPage = function () {
        $scope.hasNext=false;
        pager.oldPage = pager.currentPage;
        $scope.changePage(pager.currentPage + 1);
      };

      $scope.previousPage = function () {

        pager.oldPage = pager.currentPage;
        $scope.changePage(pager.currentPage - 1);
      };

      $scope.changePage = function (page) {

        pager.currentPage = page;
        pager.offset = (pager.currentPage * pager.pageSize) - pager.pageSize;
        $scope.search({
          offset: pager.offset,
          count: pager.pageSize + 1
        });
      };

      $scope.hasPrevious = function () {
        return pager.currentPage != 1;
      };

      $scope.pager = pager;

    }];

    return directive;
  })


  .directive('validationForm', function () {
    return {
      restrict: 'E',
      require: 'form',
      transclude: true,
      replace: true,
      template: '<form role="form" novalidate><ng-transclude></ng-transclude></form>',
      link: function (scope, elem, attrs, formCtrl) {

        formCtrl.isInline = elem.hasClass('form-inline');

        scope.$on('constraintViolationEvent', function (event, data) {
          for (var each in data) {
            var item = data[each];
            formCtrl[item.fieldName].violationMessage = item.message;
          }
        });

        /**
         * Resets the form's validation messages
         */
        formCtrl.reset = function () {
          formCtrl.$setUntouched();

          for(var each in formCtrl) {
            if (formCtrl[each] && formCtrl[each].violationMessage) {
              delete formCtrl[each].violationMessage;
            }
          }
        };
      }
    };
  })

  .directive('ngAutocomplete', function () {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=',
        options: '=?',
        details: '=?'
      },

      link: function (scope, element, attrs, controller) {

        //options for autocomplete
        var opts;
        var watchEnter = false;
        //convert options provided to opts
        var initOpts = function () {

          opts = {};
          if (scope.options) {

            if (scope.options.watchEnter !== true) {
              watchEnter = false;
            } else {
              watchEnter = true;
            }

            if (scope.options.types) {
              opts.types = [];
              opts.types.push(scope.options.types);
              scope.gPlace.setTypes(opts.types);
            } else {
              scope.gPlace.setTypes([]);
            }

            if (scope.options.bounds) {
              opts.bounds = scope.options.bounds;
              scope.gPlace.setBounds(opts.bounds);
            } else {
              scope.gPlace.setBounds(null);
            }

            if (scope.options.country) {
              opts.componentRestrictions = {
                country: scope.options.country
              };
              scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
            } else {
              scope.gPlace.setComponentRestrictions(null);
            }
          }
        };

        if (scope.gPlace === undefined) {
          scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
        }
        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
          var result = scope.gPlace.getPlace();
          if (result !== undefined) {
            if (result.address_components !== undefined) {

              scope.$apply(function () {

                scope.details = result;

                controller.$setViewValue(element.val());
              });
            }
            else {
              if (watchEnter) {
                getPlace(result);
              }
            }
          }
        });

        //function to get retrieve the autocompletes first result using the AutocompleteService
        var getPlace = function (result) {
          var autocompleteService = new google.maps.places.AutocompleteService();
          if (result.name.length > 0) {
            autocompleteService.getPlacePredictions(
              {
                input: result.name,
                offset: result.name.length
              },
              function listentoresult(list, status) {
                if (list === null || list.length === 0) {

                  scope.$apply(function () {
                    scope.details = null;
                  });

                } else {
                  var placesService = new google.maps.places.PlacesService(element[0]);
                  placesService.getDetails(
                    {'reference': list[0].reference},
                    function detailsresult(detailsResult, placesServiceStatus) {

                      if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                        scope.$apply(function () {

                          controller.$setViewValue(detailsResult.formatted_address);
                          element.val(detailsResult.formatted_address);

                          scope.details = detailsResult;

                          //on focusout the value reverts, need to set it again.
                          var watchFocusOut = element.on('focusout', function (event) {
                            element.val(detailsResult.formatted_address);
                            element.unbind('focusout');
                          });

                        });
                      }
                    }
                  );
                }
              });
          }
        };

        controller.$render = function () {
          var location = controller.$viewValue;
          element.val(location);
        };

        //watch options provided to directive
        scope.watchOptions = function () {
          return scope.options;
        };
        scope.$watch(scope.watchOptions, function () {
          initOpts();
        }, true);

      }
    };
  })

  .factory('eventBus', ['$rootScope', function ($rootScope) {
    var eventBus = {};

    eventBus.emitMsg = function (eventName, data, scope) {

      // no scope was defined? so we are using the root scope
      if (typeof scope === 'undefined') {
        scope = $rootScope;
      }

      scope.$emit(eventName, data);
    };

    /**
     * Subscribes for particular event.
     * <p/>
     * The subscription will be removed automatically when message is removed.
     *
     * @param eventName the event for which subscription is required
     * @param func the callback to be executed when event is received
     */
    eventBus.onMsg = function (eventName, func) {
      var unbind = $rootScope.$on(eventName, func);
      $rootScope.$on('$destroy', unbind);
    };

    return eventBus;
  }])

  .directive('confirmModal', ['$modal', function ($modal) {

    return {
      transclude: true,
      restrict: 'EA',
      template: '<span ng-click="open()" ng-transclude></span>',
      scope: {
        message: "@",
        okPressed: '&',
        cancelPressed: '&'
      },
      link: function (scope, element, attrs) {

        scope.open = function () {

          var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'confirm-modal.tpl.html',
            controller: 'ConfirmModalCtrl',
            windowClass: 'confirm-modal',
            backdrop: 'static',
            resolve: {
              data: function () {
                return {
                  message: scope.message,
                  okPressed: scope.okPressed,
                  cancelPressed: scope.cancelPressed
                };
              }
            }

          });

          modalInstance.result.then(function () {
            scope.okPressed();
          }, function () {
            scope.cancelPressed();
          });
        };
      }
    };
  }])

  .controller('ConfirmModalCtrl', ['$scope','$modalInstance','data', function ($scope, $modalInstance, data) {

    $scope.data = data;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

/**
 * Highlights the tokens in searched text
 *
 * Use as: <span highlight="string">text</span>
 * The example finds matches between 'string' in the 'text'
 * Results are put in span tag like: <span class="highlightedFilteredText">some match</span>
 * with highlightedFilteredText class
 */
  .directive('highlight', function ($parse) {

    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {

        var parseHighlightValue = $parse(attrs.highlight);

        scope.$watch( parseHighlightValue, function () {

          var value = parseHighlightValue(scope);
          if (!value) {
            element.html(element.text());
            return;
          }

          var tokens = value.split(" ");
          var regex = new RegExp('(' + tokens.join('|') + ')', 'gi');
          var html = element.text().replace(regex, '<span class="highlightedFilteredText">$&</span>');
          element.html(html);
        });
      }
    };
  })

  .directive('hasPermission', function (userProfile) {

    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        var restriction = attrs.hasPermission;
        var restrictions = userProfile.restrictions;
        var hasPermission = false;
        for (var index = 0; index < restrictions.length; index++) {
          if (restrictions[index].name === restriction) {
            hasPermission = true;
            break;
          }
        }
        if (!hasPermission) {
          element.remove();
        }
      }
    };
  })

  .directive('infoLine', function () {
    return {
      restrict: 'E',
      transclude: true,
      template: '<h5 ng-style="{display: narrow ?\'inline\':\'inline-block\'}"><small translate>{{label}}</small> <ng-transclude></ng-transclude></h5>',
      scope: {
        label: '@',
        narrow: '='
      }
    };
  })
;
