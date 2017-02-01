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
angular.module('common', [
  'ui.bootstrap',
  'common.paging',
    'angular-ladda'
])

  //.directive('datetimepicker', function () {
  //  function _byDefault(value, defaultValue) {
  //    return _isSet(value) ? value : defaultValue;
  //    function _isSet(value) {
  //      return !(value === null || value === undefined || !isNaN(value) || value === '');
  //    }
  //  }
  //
  //  return {
  //    restrict: 'E',
  //    scope: {
  //      id: '@',
  //      name: '@',
  //      ngModel: '=',
  //      afterInit: '&',
  //      format: '@',
  //      todayBtn: '@',
  //      weekStart: '@',
  //      minuteStep: '@',
  //      onDateChanged: '&',
  //      customStyle: '@',
  //      readOnly: '@'
  //    },
  //    template: '<input type="text" value="{{ngModel}}" class="form-control" name="{{name}}" id="{{id}}" style="cursor: pointer;{{customStyle}}" ng-readonly="{{readOnly}}"/>',
  //    link: function (scope, element, attrs) {
  //
  //      scope.afterInit();
  //
  //      var $element = $(element.children()[0]);
  //
  //      $element.datetimepicker({
  //          format: _byDefault(scope.format, 'dd/mm/yyyy hh:ii'),
  //          weekStart: _byDefault(scope.weekStart, '1'),
  //          todayBtn: _byDefault(scope.todayBtn, 'true') === 'true',
  //          minuteStep: parseInt(_byDefault(scope.minuteStep, '5'), 10),
  //          initialDate: scope.ngModel,
  //          autoclose: 1,
  //          todayHighlight: 1,
  //          startView: 2,
  //          minView: 2,
  //          forceParse: 0,
  //          showMeridian: 1,
  //          fontAwesome: true,
  //          language: 'bg'
  //        })
  //        .on('changeDate', function (ev) {
  //          scope.$apply(function () {
  //
  //            // make the picker to return 00:00 in current time zone
  //            var timeZoneOffset = new Date().getTimezoneOffset();
  //            var selectedDate = new Date(ev.date);
  //            selectedDate.setMinutes(selectedDate.getMinutes() + timeZoneOffset);
  //            var timeAsMills = selectedDate.getTime();
  //            scope.ngModel=selectedDate;
  //
  //            scope.onDateChanged({time: timeAsMills});
  //          });
  //        });
  //
  //      scope.$watch('ngModel', function (newValue, oldValue) {
  //
  //        if (!newValue) {
  //          $element.datetimepicker('update', null);
  //          $element.val('');
  //          return;
  //        }
  //
  //        $element.datetimepicker('update', newValue);
  //      });
  //    }
  //  };
  //})
  //
  //
  ///**
  // * @ngdoc directive
  // * @name datePicker
  // * @restrict E
  // *
  // * @description
  // * Pick date from dropdown calendar
  // *
  // * Example usages:
  // *
  // * <pre>
  // *
  // * // $scope.today = new Date(2015,10,22);
  // * <date-picker
  // * ng-model="today"
  // * on-date-changed="onDateChanged(newDate)" or on-date-changed="onDateChanged(newDate, newDateAsMillis)"
  // * on-init="loadTodayOrders()"
  // * trim-to-start="true"
  // * current-text="Pick today" // if not present current translation is used
  // * custom-style="width: 100px">
  // * </date-picker>
  // *
  // * </pre>
  // *
  // * @param {String} mgModel binded date
  // * @param {Date} ngModel binded date
  // * @param {Function} onDateChanged called on date changed. Has two params 'newDate' , newDateAsMillis
  // * @param {Function} onInit called on initialization
  // * @param {String} currentText is the today button text
  // * @param {Long} setDateAsMillis is ngModel transformed to milliseconds
  // * @param {boolean} trimToStart if 'true' ngModel is set to 00:00 local time
  // * @param {String} customStyle adds style to the template
  // */
  //.directive('datePicker', function ($filter) {
  //  return {
  //    restrict: 'E',
  //    scope: {
  //      id: '@',
  //      name: '@',
  //      ngModel: '=',
  //      onDateChanged: '&',
  //      onInit: '&',
  //      currentText:'@',
  //      setDateAsMillis: "=",
  //      trimToStart: "=",
  //      customStyle: '@'
  //    },
  //    templateUrl: 'ui-date-picker.tpl.html',
  //
  //    link: function ($scope, elem, attr) {
  //      $scope.onInit();
  //
  //      $scope.status = {
  //        opened: false
  //      };
  //
  //      $scope.open = function ($event) {
  //        $scope.status.opened = true;
  //      };
  //
  //      var trimToStart = function (date) {
  //        date.setHours(0,0,0,0);
  //      };
  //
  //      if($scope.trimToStart===true){
  //        trimToStart($scope.ngModel);
  //      }
  //
  //      $scope.dateChanged = function (newDate) {
  //        if($scope.trimToStart===true){
  //          trimToStart(newDate);
  //        }
  //
  //        var newDateAsMillis = newDate ? newDate.getTime() : "";
  //
  //        $scope.onDateChanged({newDate: newDate, newDateAsMillis: newDateAsMillis});
  //
  //        if(newDate){
  //          $scope.setDateAsMillis = newDate.getTime();
  //        }
  //      };
  //
  //      // (@panayotkulchev) if date format is not interpolated in the child view, is buggy. look for solution
  //      $scope.format = 'dd/MM/yyyy';
  //
  //      $scope.currentText = $filter('translate')('BUTTON.TODAY');
  //
  //      $scope.getStyle = function () {
  //        var style = "cursor: pointer;background-color : #fff;" + $scope.customStyle;
  //        return style;
  //      };
  //    }
  //  };
  //})
  //
  ///**
  // * Provides for search functionality
  // *
  // * When input value 'query' is changed it is set as state param by changeState().
  // * Watcher listen for changes in the $stateParams.query .
  // * and fires submitQuery() .
  // * queryChanged() is called from submitQuery and uses query as value param,
  // * and triggers parent scope's search(). The las one must be implemented.
  // * Watcher also adds client's back button and refresh page functionality .
  // */
  //.directive('searchBox', function () {
  //
  //  var directive = {
  //    restrict: 'E',
  //    replace: true,
  //    scope: {
  //      queryChanged: '&onChange',
  //      placeholder: '@',
  //      searchBox: '=name',
  //      initialLoad: '='
  //    },
  //    templateUrl: 'search-box.tpl.html'
  //  };
  //
  //  directive.controller = [ '$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
  //
  //    var searchBox = {};
  //    searchBox.value = "";
  //
  //    searchBox.submitQuery = function () {
  //      var q = $stateParams.query;
  //      if (($scope.initialLoad && angular.isUndefined(q)) || (angular.isDefined(q) && q.length > 2)) {
  //        searchBox.value = $stateParams.query !== undefined ? $stateParams.query : "";
  //        $scope.queryChanged({keyword: searchBox.value});
  //      }
  //    };
  //
  //    searchBox.searchOnEnterPressed = function () {
  //      if(this.value.length > 2){
  //        this.submitQuery();
  //      }
  //    };
  //
  //    $scope.searchBox = searchBox;
  //
  //    $scope.$watch(function () {
  //      return $stateParams.query;
  //    }, function () {
  //      searchBox.submitQuery();
  //    });
  //
  //    $scope.changeState = function (query) {
  //
  //      if (query.length === 0 || query.length > 2) {
  //        $stateParams.query = query;
  //        $state.transitionTo($state.$current.name, {query: query}, {notify: false});
  //      }
  //    };
  //  }];
  //
  //  return directive;
  //})
  //
  ///**
  // * while request is proccessing button is disabled
  // *
  // * should return gateway in method for properly working
  // */
  //.directive('clickAndDisable', function () {
  //  return {
  //    scope: {
  //      clickAndDisable: '&'
  //    },
  //    link: function (scope, iElement, iAttrs) {
  //      iElement.bind('click', function () {
  //        iElement.prop('disabled', true);
  //        scope.clickAndDisable()['finally'](function () {
  //          iElement.prop('disabled', false);
  //        });
  //      });
  //    }
  //  };
  //})
  //
  ///**
  // * Provide pagination functionality.
  // * Used as element.
  // * When page is changed search is called with offset and count params
  // * onPageChange() must be implemented in parent scope
  // *
  // * Scope's nextPage() and previousPage() and hasNext() are used
  // * in the pager template
  // *
  // * Pager is an object used for exchange data outside isolated scope
  // * pager.accept takes care of hasNext page on base of data.length
  // * pager.rollback is used in case of error response
  // * pager.reset resets all values
  // */
  //.directive('simplePager', function () {
  //
  //  var directive = {
  //    restrict: 'E',
  //    replace: true,
  //    templateUrl: 'simple-pager.tpl.html',
  //    scope: {
  //      search: '&onPageChange',
  //      pageSize: '=',
  //      pager: '=name',
  //      initialLoad: '='
  //    }
  //  };
  //
  //  directive.controller = ['$scope', function ($scope) {
  //
  //    var pager = {};
  //    pager.currentPage = 1;
  //    pager.pageSize = $scope.pageSize;
  //    pager.count = $scope.pageSize + 1;
  //    pager.offset = 0;
  //    $scope.hasNext = false;
  //
  //    pager.accept = function (data) {
  //      $scope.hasNext = data.length > this.pageSize;
  //    };
  //
  //    pager.rollback = function () {
  //      this.currentPage = this.oldPage;
  //    };
  //
  //    pager.reset = function () {
  //      this.currentPage = 1;
  //      this.oldPage = 1;
  //      this.offset = 0;
  //      $scope.hasNext = false;
  //    };
  //
  //    $scope.nextPage = function () {
  //      $scope.hasNext=false;
  //      pager.oldPage = pager.currentPage;
  //      $scope.changePage(pager.currentPage + 1);
  //    };
  //
  //    $scope.previousPage = function () {
  //
  //      pager.oldPage = pager.currentPage;
  //      $scope.changePage(pager.currentPage - 1);
  //    };
  //
  //    $scope.changePage = function (page) {
  //
  //      pager.currentPage = page;
  //      pager.offset = (pager.currentPage * pager.pageSize) - pager.pageSize;
  //      $scope.search({
  //        offset: pager.offset,
  //        count: pager.pageSize + 1
  //      });
  //    };
  //
  //    $scope.hasPrevious = function () {
  //      return pager.currentPage != 1;
  //    };
  //
  //    // Should load first page initially If configured.
  //    if ($scope.initialLoad) {
  //      $scope.changePage(1);
  //    }
  //
  //    $scope.pager = pager;
  //
  //  }];
  //
  //  return directive;
  //})
  //
  //
  ///**
  // * @ngdoc directive
  // * @name showMore
  // * @restrict E
  // * @module common
  // *
  // * @description
  // * Directive search for more results. Simillar to pager that loads only next page.
  // *
  // * usage:
  // *
  // * ```html
  // * <show-more on-show-more="showMore(offset,count)"
  // *            page-size="10"
  // *            name="pager"
  // *            initial-load="true"></show-more>
  // * ```
  // */
  //.directive('showMore', function () {
  //
  //  var directive = {
  //    restrict: 'E',
  //    replace: true,
  //    templateUrl: 'show-more.tpl.html',
  //    scope: {
  //      search: '&onShowMore',
  //      pageSize: '=',
  //      pager: '=name',
  //      initialLoad: '='
  //    }
  //  };
  //
  //  directive.controller = ['$scope', function ($scope) {
  //
  //    var pager = {};
  //    pager.currentPage = 1;
  //    pager.pageSize = $scope.pageSize;
  //    pager.count = $scope.pageSize + 1;
  //    pager.offset = 0;
  //    $scope.hasNext = false;
  //
  //    pager.accept = function (data) {
  //      $scope.hasNext = data.length > this.pageSize;
  //    };
  //
  //    pager.rollbackPage = function () {
  //      this.currentPage = this.oldPage;
  //    };
  //
  //    pager.reset = function () {
  //      this.currentPage = 1;
  //      this.oldPage = 1;
  //      this.offset = 0;
  //      $scope.hasNext = false;
  //    };
  //
  //    $scope.nextPage = function () {
  //      $scope.hasNext=false;
  //      pager.oldPage = pager.currentPage;
  //      $scope.changePage(pager.currentPage + 1);
  //    };
  //
  //    $scope.changePage = function (page) {
  //
  //      pager.currentPage = page;
  //      pager.offset = (pager.currentPage * pager.pageSize) - pager.pageSize;
  //      $scope.search({
  //        offset: pager.offset,
  //        count: pager.pageSize + 1
  //      });
  //    };
  //
  //    if ($scope.initialLoad) {
  //      $scope.changePage(1);
  //    }
  //
  //    $scope.pager = pager;
  //
  //  }];
  //
  //  return directive;
  //})
  //
  //
  //.directive('validationForm', function () {
  //  return {
  //    restrict: 'E',
  //    require: 'form',
  //    transclude: true,
  //    replace: true,
  //    template: '<form role="form" novalidate><ng-transclude></ng-transclude></form>',
  //    link: function (scope, elem, attrs, formCtrl) {
  //
  //      formCtrl.isInline = elem.hasClass('form-inline');
  //
  //      scope.$on('constraintViolationEvent', function (event, data) {
  //        for (var each in data) {
  //          var item = data[each];
  //          formCtrl[item.fieldName].violationMessage = item.message;
  //        }
  //      });
  //
  //      /**
  //       * Resets the form's validation messages
  //       */
  //      formCtrl.reset = function () {
  //        formCtrl.$setUntouched();
  //
  //        for(var each in formCtrl) {
  //          if (formCtrl[each] && formCtrl[each].violationMessage) {
  //            delete formCtrl[each].violationMessage;
  //          }
  //        }
  //      };
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name validationBox
  // *
  // * Example usages:
  // * <code>
  // * <form name="exampleForm">
  // *   // NOTE: the form must have a name. Otherwise validation will not work.
  // *
  // *   // Automatic field detection
  // *   <validation-box>
  // *     <input name="fieldName" />
  // *     // NOTE: it must contain an input field with a name. Otherwise validation will not work.
  // *   </validation-box>
  // *
  // *
  // *   // Explicit field assignment
  // *   // Useful if there are more than one inputs (ex.: when the input is a complex directive)
  // *   <validation-box field="fieldName">
  // *     <input name="fieldName" />
  // *   </validation-box>
  // *
  // *   // Column layout of label and field
  // *   <validation-box label="Field label" label-class="col-md-2" field-class="col-md-5">
  // *     <input name="fieldName" />
  // *   </validation-box>
  // *
  // * </form>
  // * </code>
  // *
  // * @param {string} field name of the form field to be validated. If not specified, the name of the first input field is used.
  // * @param {string} label label text of the field. Can be omitted if no label is desired.
  // * @param {string} error-messages template file for validation error messages. If not specified, a default is used.
  // * @param {string} label-class css class for styling the label. Useful for customizing the form layout.
  // * @param {string} panel-class css class for styling the input field. Useful for customizing the form layout.
  // *
  // */
  //.directive('validationBox', function () {
  //  return {
  //    restrict: 'E',
  //    require: '^form',
  //    transclude: true,
  //    templateUrl: 'validation-box.tpl.html',
  //    scope: {
  //      label: '@',
  //      field: '@',
  //      errorMessages: '@',
  //      labelClass: '@',
  //      fieldClass: '@'
  //    },
  //    link: function(scope, elem, attrs, formCtrl) {
  //      scope.form = formCtrl;
  //
  //      if (scope.field) {
  //        if (angular.isUndefined(formCtrl[scope.field])){
  //          formCtrl[scope.field] = {};
  //        }
  //
  //        scope.formField = formCtrl[scope.field];
  //
  //      } else {
  //        // Look for containing input elements
  //        var inputElem = elem.find('input')[0];
  //        if (inputElem){
  //          scope.formField = formCtrl[inputElem.name];
  //          setRequiredSign(inputElem.attributes['required']);
  //          return;
  //        }
  //
  //        // Look for containing textarea elements
  //        var textAreas = elem.find('textarea');
  //        if (textAreas && textAreas.length > 0) {
  //          scope.formField = formCtrl[textAreas[0].name];
  //          setRequiredSign(textAreas[0].attributes['required']);
  //          return;
  //        }
  //
  //      }
  //
  //      function setRequiredSign(required){
  //        if (required) {
  //          scope.requiredSign = "*";
  //        }
  //      }
  //
  //    }
  //  };
  //})
  //
  //.directive('ngAutocomplete', function () {
  //  return {
  //    require: 'ngModel',
  //    scope: {
  //      ngModel: '=',
  //      options: '=?',
  //      details: '=?'
  //    },
  //
  //    link: function (scope, element, attrs, controller) {
  //
  //      //options for autocomplete
  //      var opts;
  //      var watchEnter = false;
  //      //convert options provided to opts
  //      var initOpts = function () {
  //
  //        opts = {};
  //        if (scope.options) {
  //
  //          if (scope.options.watchEnter !== true) {
  //            watchEnter = false;
  //          } else {
  //            watchEnter = true;
  //          }
  //
  //          if (scope.options.types) {
  //            opts.types = [];
  //            opts.types.push(scope.options.types);
  //            scope.gPlace.setTypes(opts.types);
  //          } else {
  //            scope.gPlace.setTypes([]);
  //          }
  //
  //          if (scope.options.bounds) {
  //            opts.bounds = scope.options.bounds;
  //            scope.gPlace.setBounds(opts.bounds);
  //          } else {
  //            scope.gPlace.setBounds(null);
  //          }
  //
  //          if (scope.options.country) {
  //            opts.componentRestrictions = {
  //              country: scope.options.country
  //            };
  //            scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
  //          } else {
  //            scope.gPlace.setComponentRestrictions(null);
  //          }
  //        }
  //      };
  //
  //      if (scope.gPlace === undefined) {
  //        scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
  //      }
  //      google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
  //        var result = scope.gPlace.getPlace();
  //        if (result !== undefined) {
  //          if (result.address_components !== undefined) {
  //
  //            scope.$apply(function () {
  //
  //              scope.details = result;
  //
  //              controller.$setViewValue(element.val());
  //            });
  //          }
  //          else {
  //            if (watchEnter) {
  //              getPlace(result);
  //            }
  //          }
  //        }
  //      });
  //
  //      //function to get retrieve the autocompletes first result using the AutocompleteService
  //      var getPlace = function (result) {
  //        var autocompleteService = new google.maps.places.AutocompleteService();
  //        if (result.name.length > 0) {
  //          autocompleteService.getPlacePredictions(
  //            {
  //              input: result.name,
  //              offset: result.name.length
  //            },
  //            function listentoresult(list, status) {
  //              if (list === null || list.length === 0) {
  //
  //                scope.$apply(function () {
  //                  scope.details = null;
  //                });
  //
  //              } else {
  //                var placesService = new google.maps.places.PlacesService(element[0]);
  //                placesService.getDetails(
  //                  {'reference': list[0].reference},
  //                  function detailsresult(detailsResult, placesServiceStatus) {
  //
  //                    if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
  //                      scope.$apply(function () {
  //
  //                        controller.$setViewValue(detailsResult.formatted_address);
  //                        element.val(detailsResult.formatted_address);
  //
  //                        scope.details = detailsResult;
  //
  //                        //on focusout the value reverts, need to set it again.
  //                        var watchFocusOut = element.on('focusout', function (event) {
  //                          element.val(detailsResult.formatted_address);
  //                          element.unbind('focusout');
  //                        });
  //
  //                      });
  //                    }
  //                  }
  //                );
  //              }
  //            });
  //        }
  //      };
  //
  //      controller.$render = function () {
  //        var location = controller.$viewValue;
  //        element.val(location);
  //      };
  //
  //      //watch options provided to directive
  //      scope.watchOptions = function () {
  //        return scope.options;
  //      };
  //      scope.$watch(scope.watchOptions, function () {
  //        initOpts();
  //      }, true);
  //
  //    }
  //  };
  //})

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
  //
  ///**
  // * @ngdoc factory
  // * @name simpleModal
  // *
  // * @description
  // * Wrapper for the ui-bootstrap `$modal` service
  // */
  //.factory('simpleModal', function ($uibModal) {
  //
  //  var modalSettings = {
  //    animation: true,
  //    backdrop: 'static'
  //  };
  //
  //  return {
  //    /**
  //     * Open a modal instance with standard settings.
  //     * @param {Object|Array|string|Number} modalData data that will be provided to the modal's controller.
  //     * @param {string} controller controller for the modal instance.
  //     * @param {string} templateUrl url of the template for the modal.
  //     *
  //     * @returns modalInstance the modal instance
  //     */
  //    openModal: function (modalData, controller, templateUrl) {
  //      var providedSettings = {
  //        controller: controller,
  //        templateUrl: templateUrl,
  //        resolve: {
  //          'modalData': function () {
  //            return modalData;
  //          }
  //        }
  //      };
  //      return $uibModal.open(angular.merge({}, modalSettings, providedSettings));
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name simpleModal
  // * @scope
  // * @restrict E
  // * @transclude
  // *
  // * @description
  // *
  // * Wrapper directive for standard modal dialog html.
  // *
  // * @param {string} titleLabel title text of the modal
  // * @param {string} confirmLabel label for the confirm button
  // * @param {expression} onConfirm expression to execute when pressing the confirm button
  // * @param {boolean} [confirmDisabled=false] whether or not the confirm button is disabled
  // * @param {string} [cancelLabel='BUTTON.CANCEL'] label for the cancel button
  // * @param {expression} [onCancel=modal.dismiss()] expression to execute when pressing the cancel button
  // */
  //.directive('simpleModal', function () {
  //  return {
  //    restrict: 'E',
  //    transclude: true,
  //    templateUrl: 'simple-modal.tpl.html',
  //    scope: {
  //      titleLabel: '@',
  //      confirmLabel: '@',
  //      confirmDisabled: '=',
  //      cancelLabel: '@',
  //      onConfirm: '&',
  //      onCancel: '&'
  //    },
  //    link: function (scope, element, attrs) {
  //
  //      scope.cancel = function () {
  //        if (!attrs.onCancel) {
  //          scope.$parent.$dismiss('cancel');
  //
  //        } else {
  //          scope.onCancel();
  //        }
  //      };
  //    }
  //  };
  //})
  //
  //.directive('confirmModal', ['$uibModal', function ($uibModal) {
  //
  //  return {
  //    transclude: true,
  //    restrict: 'EA',
  //    template: '<span ng-click="open()" ng-transclude></span>',
  //    scope: {
  //      message: "@",
  //      okPressed: '&',
  //      cancelPressed: '&'
  //    },
  //    link: function (scope, element, attrs) {
  //
  //      scope.open = function () {
  //        if (attrs.disabled) {
  //          return;
  //        }
  //
  //        var modalInstance = $uibModal.open({
  //          animation: true,
  //          templateUrl: 'confirm-modal.tpl.html',
  //          controller: 'ConfirmModalCtrl',
  //          windowClass: 'confirm-modal',
  //          backdrop: 'static',
  //          resolve: {
  //            data: function () {
  //              return {
  //                message: scope.message,
  //                okPressed: scope.okPressed,
  //                cancelPressed: scope.cancelPressed
  //              };
  //            }
  //          }
  //
  //        });
  //
  //        modalInstance.result.then(function () {
  //          scope.okPressed();
  //        }, function () {
  //          scope.cancelPressed();
  //        });
  //      };
  //    }
  //  };
  //}])
  //
  //.controller('ConfirmModalCtrl', ['$scope','$uibModalInstance','data', function ($scope, $uibModalInstance, data) {
  //
  //  $scope.data = data;
  //
  //  $scope.ok = function () {
  //    $uibModalInstance.close();
  //  };
  //
  //  $scope.cancel = function () {
  //    $uibModalInstance.dismiss('cancel');
  //  };
  //}])
  //
  ///**
  // * Highlights the tokens in searched text
  // *
  // * Use as: <span highlight="string">text</span>
  // * The example finds matches between 'string' in the 'text'
  // * Results are put in span tag like: <span class="highlightedFilteredText">some match</span>
  // * with highlightedFilteredText class
  // */
  //.directive('highlight', function ($parse) {
  //
  //  return {
  //    restrict: 'A',
  //    replace: false,
  //    link: function (scope, element, attrs) {
  //
  //      var parseHighlightValue = $parse(attrs.highlight);
  //
  //      scope.$watch( parseHighlightValue, function () {
  //
  //        var value = parseHighlightValue(scope);
  //        if (!value) {
  //          element.html(element.text());
  //          return;
  //        }
  //
  //        var tokens = value.split(" ");
  //        var regex = new RegExp('(' + tokens.join('|') + ')', 'gi');
  //        var html = element.text().replace(regex, '<span class="highlightedFilteredText">$&</span>');
  //        element.html(html);
  //      });
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name money
  // * @restrict EA
  // *
  // * @description
  // * Formats certain amount /number/ to double value with two decimal points.
  // * Can be added currency like 'BGN', 'EUR', '$'.
  // * Currency can be passed as translation string and translated.
  // *
  // * Example usages:
  // *
  // * <pre>
  // *
  // *   // as element
  // *   <money>{{amount}}</money>
  // *
  // *   // as attribute
  // *   <td money>3.599998</td>
  // *
  // *   // custom currency added
  // *    <money currency="BGN">1.234</money>
  // *
  // *   // translation string as currency
  // *   <money currency="CASHBOOK.CURRENCY">1.234</money>
  // *
  // * </pre>
  // *
  // * @param {String} currency can be translation string, sign, or regular string added after the amount
  // */
  //.directive('money', function ($filter, $interpolate, eventBus, $translate) {
  //
  //  return {
  //    restrict: 'EA',
  //
  //    link: function (scope, elem, attrs) {
  //      var currency = attrs.currency ? attrs.currency : '';
  //      currency = $translate.instant(currency);
  //
  //      var inner = $interpolate(elem.html())(scope);
  //      var html = $filter('currency')(inner, '', 2);
  //
  //      html = (currency !== '') ? html + ' ' + currency : html;
  //      elem.text(html);
  //
  //      eventBus.onMsg('$localeChangeSuccess', function () {
  //
  //        var html = $filter('currency')(inner, '', 2);
  //
  //        html = (currency !== '') ? html + ' ' + currency : html;
  //        elem.text(html);
  //      });
  //    }
  //  };
  //})
  //
  /**
   * @ngdoc directive
   * @name dateTime
   * @restrict EA
   *
   * @description
   * Formats date long value and Date() to human
   * readable date-time format based on current locale configuration
   *
   * Example usages:
   *
   * <pre>
   *
   *   // $scope.date = 123423536434;
   *   <date-time>{{date}}</date-time>
   *
   *   // $scope.date = newDate(2015,10,27,15,30);
   *   <div date-time>{{date}}</div>
   *   <div date-time>{{date.getTime()}}</div>
   *
   * </pre>
   */
  .directive('dateTime', function ($filter, $interpolate, $parse, eventBus, $rootScope) {

    return {
      restrict: 'EA',

      link: function (scope, elem) {

        var inner = $interpolate(elem.html())(scope);
        var parsed = $parse(inner)();
        var html = $filter('date')(new Date(parsed), 'short');

        elem.text(html);

        //eventBus.onMsg('$localeChangeSuccess', function () {
        $rootScope.$on('$localeChangeSuccess', function () {

          var html = $filter('date')(new Date(parsed), 'short');

          elem.text(html);
        });
      }
    };
  })

  ///**
  // * @ngdoc directive
  // * @name date
  // * @restrict EA
  // *
  // * @description
  // * Formats long value and javascript Date() to human
  // * readable date format based on current locale configuration
  // *
  // * Example usages:
  // *
  // * <pre>
  // *
  // *   // $scope.date = 123423536434;
  // *   <date>{{date}}</date>
  // *
  // *   // $scope.date = newDate(2015,10,27);
  // *   <div date>{{date}}</div>
  // *   <div date>{{date.getTime()}}</div>
  // *
  // * </pre>
  // */
  //.directive('date', function ($filter, $interpolate, $parse, eventBus) {
  //  return {
  //    restrict: 'EA',
  //
  //    link: function (scope, elem) {
  //
  //      var inner = $interpolate(elem.html())(scope);
  //      var parsed = $parse(inner)();
  //      var html = $filter('date')(new Date(parsed));
  //
  //      elem.text(html);
  //
  //      eventBus.onMsg('$localeChangeSuccess', function () {
  //
  //        var html = $filter('date')(new Date(parsed));
  //
  //        elem.text(html);
  //      });
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name time
  // * @restrict EA
  // *
  // * @description
  // * Formats date long value and javascript Date() to human
  // * readable time format based on current locale configuration
  // *
  // * Example usages:
  // *
  // * <pre>
  // *
  // *   // $scope.date = 123423536434;
  // *   <time>{{date}}</time>
  // *
  // *   // $scope.date = newDate(2015,10,27,15,30);
  // *   <div time>{{date}}</div>
  // *   <div time>{{date.getTime()}}</div>
  // *
  // * </pre>
  // */
  //.directive('time', function ($filter, $interpolate, $parse, eventBus) {
  //  return {
  //    restrict: 'EA',
  //
  //    link: function (scope, elem) {
  //
  //      var inner = $interpolate(elem.html())(scope);
  //      var parsed = $parse(inner)();
  //      var html = $filter('date')(new Date(parsed), 'shortTime');
  //
  //      elem.text(html);
  //
  //      eventBus.onMsg('$localeChangeSuccess', function () {
  //
  //        var html = $filter('date')(new Date(parsed), 'shortTime');
  //
  //        elem.text(html);
  //      });
  //    }
  //  };
  //})
  //
  //.directive('hasPermission', function (userProfile) {
  //
  //  return {
  //    restrict: 'A',
  //    replace: false,
  //    link: function (scope, element, attrs) {
  //      var restriction = attrs.hasPermission;
  //      var restrictions = userProfile.restrictions;
  //      var hasPermission = false;
  //      for (var index = 0; index < restrictions.length; index++) {
  //        if (restrictions[index].name === restriction) {
  //          hasPermission = true;
  //          break;
  //        }
  //      }
  //      if (!hasPermission) {
  //        element.remove();
  //      }
  //    }
  //  };
  //})
  //
  //
  ///**
  // * @ngdoc directive
  // * @name loadAudio
  // * @restrict E
  // * @module common
  // *
  // * @description
  // * This directive renders audio control by using the provided source attribute which to be used for setting of the src
  // * attribute of the control.
  // *
  // * As the provided source attribute could be evaluated, users of this directive are able to inject different kind of endpoints.
  // *
  // * ```html
  // *   <load-audio source="/r/ivr/source?key={{attachment}}"/>
  // * ```
  // *
  // * @element ANY
  // * @param {source} source value used for setting of the src attribute of the audio control
  // * @param {type} acceptable content type
  // *
  // * //TODO(mgenov): detect browser audio compatibility and render audio control as simple link when player is not available
  // */
  //.directive('loadAudio', function () {
  //  return {
  //    restrict: 'E',
  //    scope: {
  //      source: '@',
  //      type: "@"
  //    },
  //    template: '<audio controls><source/></audio>',
  //    link: function (scope, element) {
  //      var source = element.find('source');
  //      source.attr('src', scope.source);
  //      source.attr("type", scope.type);
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name simpleSwitch
  // * @restrict A
  // * @module common
  // *
  // * @description
  // * This directive is on/off, yes/no, true/false switch.
  // *
  // * Text labels can be translation strings
  // *
  // * Available colors: 'primary', 'info', 'success', 'warning', 'danger', 'default'
  // * Available sizes:  'mini', 'small', 'normal', 'large'
  // *
  // * ```html
  // *   <input simple-switch type="checkbox" ng-model="user.active" width="80"
  // on-text="USERS.YES" label-text="USERS.ACTIVE" off-text="USERS.NO" on-color="primary" off-color="success">
  // * ```
  // */
  //.directive('simpleSwitch', function ($translate) {
  //  return {
  //    restrict: 'A',
  //    require: 'ngModel',
  //    link: function (scope, element, attrs, ngModelCtrl) {
  //
  //      var onText = attrs.onText;
  //      onText = $translate.instant(onText||'BUTTON.YES');
  //      var offText = attrs.offText;
  //      offText = $translate.instant(offText||'BUTTON.NO');
  //      var labelText = attrs.labelText;
  //      labelText = $translate.instant(labelText);
  //      var width = attrs.width || 'auto';
  //      var onColor = attrs.onColor || "success";
  //      var offColor = attrs.offColor || "danger";
  //      var size = attrs.size || "mini";
  //
  //      $(element).bootstrapSwitch({
  //
  //        size: size,
  //        onColor: onColor,
  //        offColor: offColor,
  //        onText: onText,
  //        offText: offText,
  //        labelText: labelText,
  //        handleWidth: width,
  //
  //        onSwitchChange: function (event, state) {
  //          scope.$apply(function () {
  //            ngModelCtrl.$setViewValue(state);
  //          });
  //        }
  //      });
  //
  //      scope.$watch(attrs.ngModel, function(newVal) {
  //        $(element).bootstrapSwitch('state', !! newVal, true);
  //      });
  //
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name numericOnly
  // * @restrict A
  // * @module common
  // *
  // * @description
  // * This directive awol in input field to be entered only digits .
  // *
  // * ```html
  // *   <input type="password" name="payCode"
  // ng-model="user.payCode" numeric-only/>
  // * ```
  // */
  //.directive('numericOnly', function () {
  //  return {
  //    restrict: 'A',
  //    require: 'ngModel',
  //    link: function (scope, element, attrs, modelCtrl) {
  //
  //      modelCtrl.$parsers.push(function (inputValue) {
  //        var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;
  //
  //        if (transformedInput != inputValue) {
  //          modelCtrl.$setViewValue(transformedInput);
  //          modelCtrl.$render();
  //        }
  //
  //        return transformedInput;
  //      });
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name infoLine
  // *
  // * @param {String} label label test of the infoLine.
  // * @param {boolean} [narrow=false] whether the infoLine should have a narrow line height.
  // */
  //.directive('infoLine', function () {
  //  return {
  //    restrict: 'E',
  //    transclude: true,
  //    template: '<h5 style="display: inline;" ng-style="{lineHeight: narrow ? 1.9 : 2.5}">' +
  //    '<small translate>{{label}}</small> <ng-transclude></ng-transclude></h5>',
  //    scope: {
  //      label: '@',
  //      narrow: '='
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name floatingItem
  // * @restrict A
  // * @module common
  // *
  // * @description
  // * Directive for placing elements on common position (top right)
  // *
  // * usage:
  // *
  // * ```html
  // * <button floating-item>button</button>
  // * ```
  // */
  //.directive('floatingItem', function ($window) {
  //  return {
  //    restrict: 'A',
  //    link: function(scope, element){
  //      scope.getTop = function () {
  //        return $window.pageYOffset;
  //      };
  //
  //      //topBar could be configurable but we need simplicity
  //      var topBar = 32;//add top bar height if any fixed position top bar available
  //      var offset = 20;//offset from the outer container
  //      var elementHeight = parseInt(element.css("height"), 10);//performance optimisation to the element.height() method
  //      var wrapperTopMargin = (offset * 2 + elementHeight);
  //      var elementTopOffset = offset - wrapperTopMargin;
  //
  //      //this will be the new parent
  //      element.parent().wrapInner(function () {
  //        return '<div style="margin-top:' + wrapperTopMargin + 'px; position:relative">';
  //      });
  //
  //      //topBar z-index is 1030 so it should be under it and above everything else
  //      element.css('z-index', '1029');
  //      element.css('position', 'absolute');
  //      element.css('right', offset);
  //      element.css('top', elementTopOffset);
  //
  //      angular.element($window).on("scroll.toTop", function() {
  //        var parentTop = element.parent().offset().top;
  //        var parentHeight = element.parent().outerHeight(true);
  //        var windowTop = scope.getTop() + topBar; //position from the top of the window plus top bar height if any (the visible part)
  //
  //        if (windowTop < parentTop - wrapperTopMargin) {
  //          element.css('top', elementTopOffset);
  //        } else {
  //          if (windowTop - parentTop < parentHeight - elementHeight - offset*2 - wrapperTopMargin) {
  //            element.css('top', windowTop - parentTop + offset);
  //          } else {
  //            element.css('top',  parentHeight - elementHeight - offset - wrapperTopMargin);
  //          }
  //        }
  //        scope.$apply();
  //      });
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name comments
  // * @restrict E
  // * @scope
  // *
  // * @description
  // *
  // * A comment object needs to contain the following properties:
  // *  - value: the comment string
  // *  - createdDate: the date on which the comment was created
  // *  - creatorName: the name of the comment creator to display
  // *  - creatorEmail: the email of the comment creator to display in case the `creatorName` was not specified
  // *
  // * @param {Boolean} [opened=false] flag indicating the opened state.
  // * @param {Boolean} [viewOnly=false] flag indicating if comment addition should be disabled.
  // * @param {Array} commentList list of comment objects.
  // * @param {function(value)} onAddComment function to be executed when a comment is added. This function should expose an argument with the name "value" in order to take the added comment string.
  // */
  //.directive('comments', function () {
  //  return {
  //    restrict: 'E',
  //    scope: {
  //      opened: '=',
  //      viewOnly: '=',
  //      commentList: '=',
  //      onAddComment: '&'
  //    },
  //    templateUrl: 'comments.tpl.html',
  //    controller: function ($scope) {
  //      $scope.newComment = {value: ''};
  //      $scope.commentForm = {form: {}};
  //      $scope.isRequired = false;
  //
  //      $scope.toggleOpened = function () {
  //        $scope.opened = !$scope.opened;
  //
  //        if ($scope.opened) {
  //          $scope.isRequired = false;
  //        }
  //      };
  //
  //      $scope.addComment = function (commentData, event) {
  //        event.preventDefault();
  //
  //        var commentValue = commentData.value;
  //        commentData.value = '';
  //
  //        if (!commentValue || !commentValue.trim()) {
  //          $scope.isRequired = true;
  //          $scope.commentForm.form.value.$setTouched();
  //          return;
  //        }
  //
  //        $scope.commentForm.form.reset();
  //        $scope.isRequired = false;
  //        $scope.onAddComment({value: commentValue});
  //      };
  //
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name authorBalloon
  // * @restrict E
  // * @scope
  // *
  // * @param {string} nameLabel info label for author name
  // * @param {string} dateLabel info label for creation date
  // * @param {string} authorName name of the author to be displayed in the balloon
  // * @param {string} authorEmail email of the author to be displayed in the balloon
  // * @param {Date} creationDate date to be displayed in the balloon
  // */
  //.directive('authorBalloon', function () {
  //  return {
  //    restrict: 'E',
  //    transclude: true,
  //    template: '<span uib-popover-template="balloon.templateUrl" style="cursor: pointer" ng-transclude></span>',
  //    scope: {
  //      nameLabel: '@',
  //      dateLabel: '@',
  //      authorName: '=',
  //      authorEmail: '=',
  //      creationDate: '='
  //    },
  //    link: function (scope, elem, attrs) {
  //      scope.balloon = {templateUrl: 'author-balloon.tpl.html'};
  //    }
  //  };
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name focused
  // * @restrict A
  // * @module common
  // *
  // * @description
  // *
  // * Puts focus on the element upon creation.
  // */
  //.directive('focused', function () {
  //  return {
  //    restrict: 'A',
  //    link: function ($scope, elem, attrs) {
  //      elem[0].focus();
  //    }
  //  };
  //})
  //
  ///**
  // *TreeHelper for working with tree structures
  // */
  //.factory('TreeHelper', function () {
  //
  //  var treeHelper = {
  //    /**
  //     * Create tree structure from flat structured(List of nodes with theirs id and parentId) list
  //     * @param flatStructure
  //     * @param nodeId - name of the property that carries the id of the node
  //     * @param parentNodeId - name of the property that carries the parentId of the node
  //     * @param childrenPropertyName - name of the property in which all the children will be pushed
  //     * @param undefinedWhenNoChildren - when set true children property of node will be undefined when node has no children else it will be empty array
  //     * @returns tree structured object
  //     */
  //    treeFromFlatStructure: function (flatStructure, nodeId, parentNodeId, childrenPropertyName, undefinedWhenNoChildren) {
  //      var treeList = [];
  //      var lookup = {};
  //      flatStructure.forEach(function (obj) {
  //        lookup[obj[nodeId]] = obj;
  //        if (!undefinedWhenNoChildren) {
  //          obj[childrenPropertyName] = [];
  //        }
  //      });
  //      flatStructure.forEach(function (obj) {
  //        if (obj[parentNodeId] !== undefined && lookup[obj[parentNodeId]] !== undefined) {
  //          if (lookup[obj[parentNodeId]][childrenPropertyName] === undefined) {
  //            lookup[obj[parentNodeId]][childrenPropertyName] = [];
  //          }
  //          lookup[obj[parentNodeId]][childrenPropertyName].push(obj);
  //        } else {
  //          treeList.push(obj);
  //        }
  //      });
  //      return treeList;
  //    }
  //  };
  //
  //  return treeHelper;
  //})
  //
  ///**
  // * @ngdoc directive
  // * @name treeMultiSelect
  // * @restrict AE
  // *
  // * Example usages:
  // * <code>
  // *  <div
  // *   tree-multi-select
  // *   api="selector.api"
  // *   nodes="nodes"
  // *   id-property="id"
  // *   parent-id-property="parentId"
  // *   label-property="name"
  // *   button-label="{{'BUTTON.TITLE' | translate}}"
  // *   button-label-selected="{{'BUTTON.SELECTED_NODES' | translate}}"
  // *   enable-filter="true"
  // *   selection-strategy="allChildren">
  // *  </div>
  // * </code>
  // *
  // * controller configuration:
  // *<pre>
  // *.controller('MyCtrl', function ($scope, gateway) {
  // *   $scope.selector = {api: {}};
  // *
  // *   //get from somewhere nodes as array
  // *   gateway.loadNodes().then(function (data) {
  // *     $scope.nodes = data;
  // *   });
  // *
  // *   //fill selected nodes if you need
  // *   $scope.fillSelectedNodes = function () {
  // *    //ids of nodes for selection
  // *    var ids = [40, 50, 60];
  // *    $scope.selector.api.selectNodes(ids);
  // *   }
  // *
  // *   $scope.someAction = function () {
  // *     //get selected nodes
  // *     var selectedNodes = $scope.selector.api.getAllSelectedNodes();
  // *   };
  // * }
  // * </pre>
  // *
  // * @param {object} api - for access to functionality of directive
  // * @param {array}  nodes - array from nodes used to build the tree structure
  // * @param {string} id-property  - name of property which contains node id
  // * @param {string} parent-id-property - name of property which contains parent of a node
  // * @param {string} label-property - name of property which will be used for visualization of a node
  // * @param {string} enable-filter - enable/disable filter input
  // *  - true - default value - enable filtering
  // *  - false - disable filtering
  // * @param {expression} button-label - label of drop dawn button when nothing is not selected
  // * @param {expression} button-label-selected - label of drop dawn button when is selected nore than one node
  // * @param {string} selection-strategy - determinate which nodes to be selected when click on some node
  // *  - many - default value - select many nodes independently from other nodes;
  // *  - single - only one node can be selected;
  // *  - allChildren - select all children of selected node;
  // *  - onlyLeafs - only leaf node can be selected. Counter of nodes in button show count of leaf nodes;
  // */
  //.directive('treeMultiSelect', function ($timeout) {
  //  return {
  //    restrict: 'AE',
  //    scope: {
  //      api: '=',
  //      nodes: '=',
  //      idProperty: '=',
  //      parentIdProperty: '=',
  //      labelProperty: '=',
  //      buttonLabel: '@',
  //      buttonLabelSelected: '@',
  //      enableFilter: '=',
  //      selectionStrategy: '='
  //    },
  //    link: function ($scope, element, attrs) {
  //      $scope.idProperty = attrs.idProperty || "id";
  //      $scope.parentIdProperty = attrs.parentIdProperty || "parentId";
  //      $scope.labelProperty = attrs.labelProperty || "";
  //      $scope.buttonLabel = attrs.buttonLabel || "Dropdown";
  //      $scope.buttonLabelSelected = attrs.buttonLabelSelected || "";
  //      if(angular.isUndefined($scope.enableFilter)) {
  //        $scope.enableFilter = true;
  //      }
  //      $scope.selectionStrategy = attrs.selectionStrategy || "many";
  //
  //      //avoid recursion when change note selection status
  //      $scope.nodeFlatStructure = [];
  //      $scope.leafsCount = 0;
  //
  //      $scope.$watch('dropDown.isOpen', function(value) {
  //        //give time of drop down menu to be shown
  //        $timeout(function () {
  //          if (value && $scope.enableFilter) {
  //            element.find('input')[0].focus();
  //          }
  //        }, 100);
  //      }, true);
  //    },
  //    controller: function ($scope, $timeout) {
  //      $scope.selectedNodes = [];
  //
  //      $scope.$watch('nodes', function() {
  //        if (angular.isDefined($scope.nodes)) {
  //          $scope.leafsCount = 0;
  //          $scope.nodeFlatStructure = [];
  //          $scope.inputModel = $scope.treeFromFlatStructure($scope.nodes, $scope.idProperty, $scope.parentIdProperty, $scope.labelProperty);
  //          angular.forEach($scope.nodeFlatStructure, function(node) {
  //            if(!node.hasChildren()) {
  //              $scope.leafsCount++;
  //            }
  //          });
  //        }
  //      });
  //
  //      $scope.treeFromFlatStructure = function (flatStructure, nodeId, parentNodeId, labelProperty) {
  //        var treeList = [];
  //        var lookup = {};
  //        var lookupFlat = [];
  //        flatStructure.forEach(function (obj) {
  //          var node = {
  //            value: obj,
  //
  //            expanded: true,
  //            selected: false,
  //            visible: true,
  //
  //            id: obj[nodeId],
  //            parentId: obj[parentNodeId],
  //            children: [],
  //
  //            hasChildren: function() {
  //              return (angular.isDefined(this.children) && angular.isArray(this.children) && this.children.length > 0);
  //            }
  //          };
  //
  //          node[labelProperty] = obj[labelProperty];
  //
  //          lookup[node.id] = node;
  //          lookupFlat.push(node);
  //        });
  //
  //        lookupFlat.forEach(function (obj) {
  //          if (obj.parentId !== undefined && lookup[obj.parentId] !== undefined) {
  //            if (lookup[obj.parentId].children === undefined) {
  //              lookup[obj.parentId].children = [];
  //            }
  //            lookup[obj.parentId].children.push(obj);
  //          } else {
  //            treeList.push(obj);
  //          }
  //        });
  //        $scope.nodeFlatStructure = lookupFlat;
  //        return treeList;
  //      };
  //
  //      $scope.toggleDropdown = function($event) {
  //        $event.stopPropagation();
  //      };
  //
  //      $scope.expand = function (node) {
  //        node.expanded = true;
  //      };
  //
  //      $scope.collapse = function (node) {
  //        node.expanded = false;
  //      };
  //
  //      $scope.onChangeFilter = function (filterValue) {
  //        $scope.showAllNodes($scope.inputModel);
  //        $scope.showMatches($scope.inputModel, filterValue);
  //      };
  //
  //      $scope.onSelectionNode = function (node) {
  //        if (angular.equals("many", $scope.selectionStrategy)) {
  //          $scope.changeSelectionState(node, !node.selected);
  //        } else if (angular.equals("allChildren", $scope.selectionStrategy)) {
  //          $scope.setSelectionStateOfAllChild(node, !node.selected);
  //        } else if(angular.equals("onlyLeafs", $scope.selectionStrategy)) {
  //          if(!node.hasChildren()) {
  //            $scope.changeSelectionState(node, !node.selected);
  //          }
  //        }else if(angular.equals("single", $scope.selectionStrategy)) {
  //          var status = !node.selected;
  //          $scope.deselectAllNodes($scope.inputModel);
  //          $scope.changeSelectionState(node, status);
  //        }
  //      };
  //
  //      if ($scope.api !== undefined) {
  //        $scope.api = {
  //          getAllSelectedNodes: function () {
  //            $scope.outputModel = [];
  //            angular.forEach($scope.selectedNodes, function(node) {
  //              $scope.outputModel.push(node.value);
  //            });
  //
  //            if(angular.equals("single", $scope.selectionStrategy) && $scope.outputModel.length > 0) {
  //              return $scope.outputModel[0];
  //            } else if (angular.equals("single", $scope.selectionStrategy) && $scope.outputModel.length === 0) {
  //              return null;
  //            }
  //
  //            return $scope.outputModel;
  //          },
  //
  //          getSelectedNodeIds: function() {
  //            $scope.outputModel = [];
  //            angular.forEach($scope.selectedNodes, function(node) {
  //              $scope.outputModel.push(node.id);
  //            });
  //
  //            return $scope.outputModel;
  //          },
  //
  //          selectNode: function(nodeId) {
  //            //execute after all system watch methods are finished
  //            $timeout(function() {
  //              $scope.selectNodeById(nodeId);
  //            });
  //          },
  //
  //          selectNodes: function(nodeIds) {
  //            $timeout(function() {
  //              angular.forEach(nodeIds, function(id) {
  //                $scope.selectNodeById(id);
  //              });
  //            });
  //          },
  //
  //          deselectAll: function () {
  //            $timeout(function () {
  //              $scope.deselectAllNodes($scope.inputModel);
  //            });
  //          }
  //        };
  //      }
  //
  //      $scope.selectNodeById = function (nodeId) {
  //        angular.forEach($scope.nodeFlatStructure, function(node) {
  //          if(node.id == nodeId) {
  //            $scope.changeSelectionState(node, true);
  //          }
  //        });
  //      };
  //
  //      /**
  //       * All nodes including passed will be set to given selection state
  //       * @param node which is selected
  //       * @param value of selection state(true-selected, false-deselected)
  //       */
  //      $scope.setSelectionStateOfAllChild = function (node, value) {
  //        $scope.walk(node, function (currentNode) {
  //          $scope.changeSelectionState(currentNode, value);
  //        });
  //      };
  //
  //      $scope.deselectAllNodes = function (nodes) {
  //        $scope.selectedNodes = [];
  //        $scope.walk(nodes, function (currentNode) {
  //          currentNode.selected = false;
  //        });
  //      };
  //
  //      $scope.showAllNodes = function (nodes) {
  //        $scope.walk(nodes, function (currentNode) {
  //          currentNode.visible = true;
  //        });
  //      };
  //
  //      $scope.showMatches = function (nodes, value) {
  //        $scope.walk(nodes, function (currentNode) {
  //          var match = angular.lowercase(currentNode[$scope.labelProperty]).indexOf(angular.lowercase(value)) > -1;
  //          if (match && currentNode.hasChildren()) {
  //            currentNode.visible = true;
  //            return true; //should not hide children of matched node
  //          } else if (match) {
  //            currentNode.visible = true;
  //          } else {
  //            currentNode.visible = false;
  //          }
  //        });
  //      };
  //
  //      /**
  //       * Walk recursively through passed nodes and execute given task for every node.
  //       * If task function return 'true' recursion will not continue to child of current node.
  //       * @param node for Walk
  //       * @param task function for execution
  //       */
  //      $scope.walk = function (node, task) {
  //        if(angular.isArray(node)) {
  //          angular.forEach(node, function (_node) {
  //            $scope.walk(_node, task);
  //          });
  //          return;
  //        }
  //        if(task(node)){
  //          return;
  //        }
  //
  //        if (node.hasChildren()) {
  //          angular.forEach(node.children, function (_node) {
  //            $scope.walk(_node, task);
  //          });
  //        }
  //      };
  //
  //      $scope.changeSelectionState = function(node, state) {
  //        if(node.selected == state) {
  //          return;
  //        }
  //
  //        node.selected = state;
  //        if (state) {
  //          $scope.selectedNodes.push(node);
  //        } else {
  //          var index = -1;
  //          for (var i = 0, len = $scope.selectedNodes.length; i < len; i++) {
  //            if(node.id == $scope.selectedNodes[i].id) {
  //              index = i;
  //              break;
  //            }
  //          }
  //          if (index > -1) {
  //            $scope.selectedNodes.splice(index, 1);
  //          }
  //        }
  //      };
  //    },
  //    templateUrl: 'tree-multi-select.tpl.html'
  //  };
  //})

  .directive('confirmModal', ['$uibModal', function ($uibModal) {

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
        //var opened = false;
        scope.open = function () {
          //if(opened) {return;}
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'confirm-modal.tpl.html',
            controller: 'ConfirmModalCtrl',
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
          //opened = true;
          modalInstance.result.then(function () {
            scope.okPressed();
          }, function () {
            scope.cancelPressed();
          });
        };
      }
    };
  }])

  .controller('ConfirmModalCtrl', ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {

    $scope.data = data;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  }])

  .directive('uppercased', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (input) {
          return input ? input.toUpperCase() : "";
        });
        element.css("text-transform", "uppercase");
      }
    };
  })

  /**
   * @ngdoc directive
   * @name simpleSwitch
   * @restrict A
   * @module common
   *
   * @description
   * This directive is on/off, yes/no, true/false switch.
   *
   * Text labels can be translation strings
   *
   * Available colors: 'primary', 'info', 'success', 'warning', 'danger', 'default'
   * Available sizes:  'mini', 'small', 'normal', 'large'
   *
   * ```html
   *   <input simple-switch type="checkbox" ng-model="user.active" width="80"
   on-text="USERS.YES" label-text="USERS.ACTIVE" off-text="USERS.NO" on-color="primary" off-color="success">
   * ```
   */
  .directive('simpleSwitch', function ($translate) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        var onText = attrs.onText;
        onText = $translate.instant(onText||'BUTTON.YES');
        var offText = attrs.offText;
        offText = $translate.instant(offText||'BUTTON.NO');
        var labelText = attrs.labelText;
        labelText = $translate.instant(labelText);
        var width = attrs.width || 'auto';
        var onColor = attrs.onColor || "success";
        var offColor = attrs.offColor || "danger";
        var size = attrs.size || "mini";

        $(element).bootstrapSwitch({

          size: size,
          onColor: onColor,
          offColor: offColor,
          onText: onText,
          offText: offText,
          labelText: labelText,
          handleWidth: width,

          onSwitchChange: function (event, state) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(state);
            });
          }
        });

        scope.$watch(attrs.ngModel, function(newVal) {
          $(element).bootstrapSwitch('state', !! newVal, true);
        });

      }
    };
  })

  .directive('numericOnly', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {

        modelCtrl.$parsers.push(function (inputValue) {
          var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;

          if (transformedInput != inputValue) {
            modelCtrl.$setViewValue(transformedInput);
            modelCtrl.$render();
          }

          return transformedInput;
        });
      }
    };
  })

  /**
   * @ngdoc directive
   * @name infoLine
   *
   * @param {String} label label test of the infoLine.
   * @param {boolean} [narrow=false] whether the infoLine should have a narrow line height.
   */
  .directive('infoLine', function () {
    return {
      restrict: 'E',
      transclude: true,
      template: '<h5 style="display: inline;" ng-style="{lineHeight: narrow ? 1.9 : 2.5}">' +
      '<small translate>{{label}}</small> <ng-transclude></ng-transclude></h5>',
      scope: {
        label: '@',
        narrow: '='
      }
    };
  })
;
