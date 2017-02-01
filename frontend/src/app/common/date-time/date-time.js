/**
 * @author Panayot Kulchev (panayotkulchev@gmail.com).
 */

angular.module('common.date-time', ['angularMoment'])

  /**
   * @ngdoc service
   * @name DateTime
   *
   * @description
   * Manipulate and transform dates in
   * different formats.
   * Works with standart JS `Date` and long values.
   *
   * - get date as string in `YYYYMMDD` format
   * - get first date of month
   * - get last date of month
   *
   * Example usages:
   *
   * <pre>
   *
   * var startDate = new Date();
   * var startDateString = DateTime.toYYYYMMDD(startDate);
   * var startDateString = DateTime.date(startDate).toYYYYMMDD();
   *
   * var endDate = new Date();
   * var dateTime = DateTime.date(endDate);
   * var firstDateOfMont = dateTime.firstDateOfMonth();
   * var lastDateOfMont = dateTime.lastDateOfMonth();
   * var dateAsString = dateTime.toYYYYMMDD();
   *
   * </pre>
   */

  .service('DateTime', function () {
    var dateValue;

    var standartDate = 'YYYY-MM-DD';
    var month ='month';

    this.date = function (date) {
      dateValue = date;
      return this;
    };

    /**
     * Returns date as string in YYYYMMDD format
     *
     * Example:
     * var date = new Date(2016, 7, 23);
     * var dateString = DateTime.toYYYYMMDD(date);
     * Than dateString is '2016-08-23'
     *
     * Can be used in builder pattern like:
     * DateTime.date(new Date()).totoYYYYMMDD();
     * Then no arguments are passed
     *
     * @param {date} [date]
     * @returns {String}
     */
    this.toYYYYMMDD = function (date) {
      if (date){
        return moment(date).format(standartDate);
      }
      return moment(dateValue).format(standartDate);
    };

    /**
     * Returns first date of the month in witch is
     * the passed date
     *
     * Example:
     * var date = new Date(2016, 7, 23);
     * var firstDateOfMonth = DateTime.firstDateOfMonth(date);
     * Than firstDateOfMonth is new Date(2016, 7, 1, 0, 0, 0)
     *
     * Can be used in builder pattern like:
     * DateTime.date(new Date()).firstDateOfMonth();
     * Then no arguments are passed
     *
     * @param {date} [date]
     * @returns {Date}
     */
    this.firstDateOfMonth = function (date) {
      if (date){
        return moment(date).startOf(month).toDate();
      }
      return moment(dateValue).startOf(month).toDate();
    };

    /**
     * Returns first date of the month in witch is
     * the passed date
     *
     * Example:
     * var date = new Date(2016, 7, 23);
     * var lastDateOfMonth = DateTime.lastDateOfMonth(date);
     * Than lastDateOfMonth is new Date(2016, 7, 31, 23, 59, 59, 999)
     *
     * Can be used in builder pattern like:
     * DateTime.date(new Date()).lastDateOfMonth();
     * Then no arguments are passed
     *
     * @param {date} [date]
     * @returns {Date}
     */
    this.lastDateOfMonth = function (date) {
      if(date){
        return  moment(date).endOf(month).toDate();
      }
      return  moment(dateValue).endOf(month).toDate();
    };
  })


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
   *   //to update view when $scope.date is changed use one like
   *   <date-time ng-model=date></date-time>
   *   <span date-time=date></span>
   *   <td date-time ng-model=date></td>
   *
   * </pre>
   */
  .directive('dateTime', function ($filter, $locale, $interpolate, $parse, eventBus) {

    return {
      restrict: 'EA',

      link: function (scope, elem, attrs) {

        var dateValue;
        var model = attrs.dateTime || attrs.ngModel;
        if (model) {
          scope.$watch(
            function () {
              return $parse(model)(scope);
            },
            function onChange(newVal) {
              dateValue = newVal;
              formatDateTime(dateValue);
            });

        } else {
          var inner = $interpolate(elem.html())(scope);
          var parsed = $parse(inner)();
          dateValue = new Date(parsed);
          formatDateTime(dateValue);
        }

        eventBus.onMsg('$localeChangeSuccess', function () {
          formatDateTime(dateValue);
        }, scope);

        function formatDateTime(dateValue) {
          var dateTimeFormat = $locale.DATETIME_FORMATS.mediumDate + ' ' + $locale.DATETIME_FORMATS.shortTime;
          var html = $filter('date')(dateValue, dateTimeFormat);

          elem.text(html);
        }
      }
    };
  })

  /**
   * @ngdoc directive
   * @name date
   * @restrict EA
   *
   * @description
   * Formats long value and javascript Date() to human
   * readable date format based on current locale configuration
   *
   * Example usages:
   *
   * <pre>
   *
   *   // $scope.date = 123423536434;
   *   <date>{{date}}</date>
   *
   *   // $scope.date = newDate(2015,10,27);
   *   <div date>{{date}}</div>
   *   <div date>{{date.getTime()}}</div>
   *
   *   //to update view when $scope.date is changed use one like
   *   <date ng-model=date></date>
   *   <span date=date></span>
   *   <td date ng-model=date></td>
   *
   * </pre>
   */
  .directive('date', function ($filter, $interpolate, $parse, eventBus) {
    return {
      restrict: 'EA',

      link: function (scope, elem, attrs) {

        var dateValue;
        var model = attrs.date || attrs.ngModel;

        if (model) {
          scope.$watch(
            function () {
              return $parse(model)(scope);
            },
            function onChange(newVal) {
              dateValue = newVal;
              formatDate(dateValue);
            });

        } else {
          var inner = $interpolate(elem.html())(scope);
          var parsed = $parse(inner)();
          dateValue = new Date(parsed);

          formatDate(dateValue);

        }
        eventBus.onMsg('$localeChangeSuccess', function () {
          formatDate(dateValue);
        }, scope);

        function formatDate (dateValue) {
          var html = $filter('date')(dateValue);
          elem.text(html);
        }
      }
    };
  })

  /**
   * @ngdoc directive
   * @name time
   * @restrict EA
   *
   * @description
   * Formats date long value and javascript Date() to human
   * readable time format based on current locale configuration
   *
   * Example usages:
   *
   * <pre>
   *
   *   // $scope.date = 123423536434;
   *   <time>{{date}}</time>
   *
   *   // $scope.date = newDate(2015,10,27,15,30);
   *   <div time>{{date}}</div>
   *   <div time>{{date.getTime()}}</div>
   *
   *   //to update view when $scope.date is changed use one like
   *   <time ng-model=date></date-time>
   *   <span time=date></span>
   *   <td time ng-model=date></td>
   *
   * </pre>
   */
  .directive('time', function ($filter, $interpolate, $parse, eventBus) {
    return {
      restrict: 'EA',

      link: function (scope, elem, attrs) {

        var dateValue;
        var model = attrs.time || attrs.ngModel;

        if (model) {
          scope.$watch(
            function () {
              return $parse(model)(scope);
            },
            function onChange(newVal) {
              formatTime(newVal);
            });

        } else {
          var inner = $interpolate(elem.html())(scope);
          var parsed = $parse(inner)();
          dateValue = new Date(parsed);

          formatTime(dateValue);
        }

        eventBus.onMsg('$localeChangeSuccess', function () {
          formatTime(dateValue);
        }, scope);

        function formatTime (dateValue) {
          var html = $filter('date')(dateValue, 'shortTime');
          elem.text(html);
        }
      }

    };
  })

  /**
   * @ngdoc directive
   * @name datePicker
   * @restrict E
   *
   * @description
   * Pick date from dropdown calendar
   * 
   * @example
   * // $scope.today = new Date(2015,10,22);
   * <date-picker
   * ng-model="today"
   * on-date-changed="onDateChanged(newDate)" or on-date-changed="onDateChanged(newDate, newDateAsMillis)"
   * on-init="loadTodayOrders()"
   * trim-to-start="true"
   * current-text="Pick today" // if not present current translation is used
   * custom-style="width: 100px">
   * </date-picker>
   *
   * @param {String} [name] name of the field in a form
   * @param {Date|String} ngModel binded date
   * @param {Function} [onDateChanged] called on date changed. Has two params 'newDate' , newDateAsMillis
   * @param {Function} [onInit] called on initialization
   * @param {String} [currentText] is the today button text
   * @param {Number} [setDateAsMillis] is ngModel transformed to milliseconds
   * @param {boolean} [trimToStart] if 'true' ngModel is set to 00:00 local time
   * @param {String} [customStyle] adds style to the template
   */
    .directive('datePicker', function ($filter, eventBus) {
        return {
            restrict: 'E',
            scope: {
                id: '@',
                name: '@',
                ngModel: '=?',
                onDateChanged: '&',
                onInit: '&',
                currentText:'@',
                setDateAsMillis: "=?",
                trimToStart: "=?",
                trimToEnd: "=?",
                customStyle: '@',
                dateFormat: '@',
                startingDay: '@'
            },
            templateUrl: 'common/date-time/ui-date-picker.tpl.html',

            link: function ($scope, elem, attr) {
                $scope.onInit();

                attr.$observe('disabled', function (isDisabled) {
                    $scope.disabled = isDisabled;
                });

                $scope.status = {
                    opened: false
                };

                $scope.open = function () {
                    $scope.status.opened = true;
                };

                var trimToStart = function (date) {
                    date.setHours(0,0,0,0);
                };
                var trimToEnd = function (date) {
                    date.setHours(23,59,59,999);
                };

                if($scope.trimToStart===true){
                    trimToStart($scope.ngModel);
                }

                if($scope.trimToEnd===true){
                    trimToEnd($scope.ngModel);
                }

                $scope.dateChanged = function (newDate) {
                    $scope.ngModel = newDate;
                    if($scope.trimToStart===true){
                        trimToStart(newDate);
                    }

                    if($scope.trimToEnd===true){
                        trimToEnd(newDate);
                    }

                    var newDateAsMillis = newDate ? newDate.getTime() : "";

                    $scope.onDateChanged({newDate: newDate, newDateAsMillis: newDateAsMillis});

                    if(newDate){
                        $scope.setDateAsMillis = newDate.getTime();
                    }
                };

                $scope.datePickerOptions = {
                    dateOptions : {
                        startingDay: angular.isDefined(attr.startingDay)? attr.startingDay : 1, //default monday
                        showWeeks: false,
                        datepickerMode: angular.isDefined(attr.monthSelectMode) ? "'month'" : "'day'",
                        minMode: angular.isDefined(attr.monthSelectMode) ? "month" : "day"
                    },
                    format: getDateFormat(),
                    datePickerModel: $scope.ngModel
                };

                $scope.lastDateValue = undefined;
                $scope.$watch('ngModel', function(value){
                    $scope.lastDateValue = value;
                    if (angular.isDefined($scope.datePickerOptions)) {
                        $scope.datePickerOptions.datePickerModel = value;
                    }
                });

                $scope.currentText = $filter('translate')('BUTTON.TODAY');

                $scope.getStyle = function () {
                    var style = "cursor: pointer;background-color : #fff;";

                    if (angular.isDefined($scope.customStyle)) {
                        style = style + $scope.customStyle;
                    }

                    var styles = style.replace(/ /g,"").split(";");
                    var stylesObj = {};
                    angular.forEach(styles, function (stylePair) {
                        var parts = stylePair.split(":");
                        if (parts && parts[0] && parts[1]) {
                            stylesObj[parts[0]] = parts[1];
                        }
                    });

                    return stylesObj;
                };

                eventBus.onMsg('$localeChangeSuccess', function () {
                    if(angular.isDefined($scope.lastDateValue)){
                        $scope.datePickerOptions.datePickerModel = new Date($scope.lastDateValue);
                    }
                }, $scope);

                function getDateFormat() {
                    if (angular.isDefined(attr.dateFormat)){
                        return attr.dateFormat;
                    }

                    if (angular.isDefined(attr.monthSelectMode)){
                        return 'MMM yyyy';
                    }

                    return 'dd/MM/yyyy';
                }
            }
        };
    })
  // .directive('datePicker', function ($filter, eventBus) {
  //   return {
  //     restrict: 'E',
  //     scope: {
  //       id: '@',
  //       name: '@',
  //       ngModel: '=',
  //       onDateChanged: '&',
  //       onInit: '&',
  //       currentText:'@',
  //       setDateAsMillis: "=",
  //       trimToStart: "=",
  //       customStyle: '@',
  //       dateFormat: '@',
  //       startingDay: '@'
  //     },
  //     templateUrl: 'common/date-time/ui-date-picker.tpl.html',
  //
  //     link: function ($scope, elem, attr) {
  //       $scope.onInit();
  //
  //       attr.$observe('disabled', function (isDisabled) {
  //         $scope.disabled = isDisabled;
  //       });
  //
  //       $scope.status = {
  //         opened: false
  //       };
  //
  //       $scope.open = function () {
  //         $scope.status.opened = true;
  //       };
  //
  //       var trimToStart = function (date) {
  //         date.setHours(0,0,0,0);
  //       };
  //
  //       if($scope.trimToStart===true){
  //         trimToStart($scope.ngModel);
  //       }
  //
  //       $scope.dateChanged = function (newDate) {
  //         $scope.ngModel = newDate;
  //         if($scope.trimToStart===true){
  //           trimToStart(newDate);
  //         }
  //
  //         var newDateAsMillis = newDate ? newDate.getTime() : "";
  //
  //         $scope.onDateChanged({newDate: newDate, newDateAsMillis: newDateAsMillis});
  //
  //         if(newDate){
  //           $scope.setDateAsMillis = newDate.getTime();
  //         }
  //       };
  //
  //       $scope.datePickerOptions = {
  //         dateOptions : {
  //           startingDay: angular.isDefined(attr.startingDay)? attr.startingDay : 1, //default monday
  //           showWeeks: false,
  //           datepickerMode: angular.isDefined(attr.monthSelectMode) ? "'month'" : "'day'",
  //           minMode: angular.isDefined(attr.monthSelectMode) ? "month" : "day"
  //         },
  //         format: getDateFormat(),
  //         datePickerModel: new Date()
  //       };
  //
  //       console.log('!!!', $scope.ngModel);
  //       console.log('!!!', $scope.datePickerOptions.datePickerModel);
  //
  //       $scope.lastDateValue = undefined;
  //       $scope.$watch('ngModel', function(value, v){
  //         console.log('changeeeed', v, value);
  //         $scope.lastDateValue = value;
  //         if (angular.isDefined($scope.datePickerOptions)) {
  //           $scope.datePickerOptions.datePickerModel = value;
  //         }
  //       });
  //
  //       $scope.currentText = $filter('translate')('BUTTON.TODAY');
  //
  //       $scope.getStyle = function () {
  //         var style = "cursor: pointer;background-color : #fff;";
  //
  //         if (angular.isDefined($scope.customStyle)) {
  //           style = style + $scope.customStyle;
  //         }
  //
  //         var styles = style.replace(/ /g,"").split(";");
  //         var stylesObj = {};
  //         angular.forEach(styles, function (stylePair) {
  //           var parts = stylePair.split(":");
  //           if (parts && parts[0] && parts[1]) {
  //             stylesObj[parts[0]] = parts[1];
  //           }
  //         });
  //
  //         return stylesObj;
  //       };
  //
  //       eventBus.onMsg('$localeChangeSuccess', function () {
  //         if(angular.isDefined($scope.lastDateValue)){
  //           $scope.datePickerOptions.datePickerModel = new Date($scope.lastDateValue);
  //         }
  //       }, $scope);
  //
  //       function getDateFormat() {
  //         if (angular.isDefined(attr.dateFormat)){
  //           return attr.dateFormat;
  //         }
  //
  //         if (angular.isDefined(attr.monthSelectMode)){
  //           return 'MMM yyyy';
  //         }
  //
  //         return 'dd/MM/yyyy';
  //       }
  //     }
  //   };
  // })

  /**
   * @ngdoc directive
   * @name simpleTimeAgo
   * @restrict EA
   *
   * @description
   * Formats date long value and javascript Date() to human
   * readable time format based on current locale configuration
   * or time passed since then comparing the current date.
   *
   * Example usages:
   *
   * <pre>
   *
   *   // $scope.date = 123423536434;
   *   <time>{{date}}</time>
   *
   *
   * </pre>
   */
  .directive('simpleTimeAgo', function ($locale, $parse, amMoment, CurrentDate) {
    return {
      restrict: 'EA',
      template: '<span am-time-ago="dateValue" ng-hide="inDateTimeMode"></span> ' +
                '<span date-time="dateValue" ng-show="inDateTimeMode"></span>',

      link: function (scope, elem, attrs) {

        amMoment.changeLocale($locale.id);

        var model = attrs.dateTime || attrs.ngModel;
        var timePeriod = attrs.timePeriod;
        var now = CurrentDate.get();
        var timePassedInDays = 0;
        var millis;
        var diff;

        scope.inDateTimeMode = false;

        scope.$watch(
          function () {
            return $parse(model)(scope);
          },
          function onChange(newVal) {
            scope.dateValue = newVal;

            millis = now - newVal;
            diff = new moment.duration(millis);
            timePassedInDays = diff.asDays();
            scope.inDateTimeMode = timePassedInDays > timePeriod;
          });

      }
    };
  });