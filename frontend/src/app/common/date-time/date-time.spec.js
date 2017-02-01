/**
 * @author Panayot Kulchev (panayotkulchev@gmail.com).
 */
describe("Date, time, date-time directives", function () {

  var $compile, $rootScope, element;
  var $locale = {};
  beforeEach(module('common'));
  beforeEach(module(function ($provide) {
    $provide.value('$locale', $locale);
  }));

  beforeEach(inject(function (_$compile_, _$rootScope_) {

    $compile = _$compile_;
    $rootScope = _$rootScope_;

    $locale.DATETIME_FORMATS = {
      mediumDate: "d.MM.y 'g'.",
      shortTime: "H:mm",
      short: 'M/d/yy h:mm a',
      AMPMS: ["AM", "PM"]
    };

  }));

  // it("transform datetime from long to human readable format - 'dd.MM.yyyy HH:mm'", function () {
  //   element = angular.element("<td date-time>1445850000000</td>");
  //   $compile(element)($rootScope);
  //
  //   $rootScope.$digest();
  //   expect(element.html()).toEqual('26.10.2015 g. 11:00');
  //
  //   $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
  //   $rootScope.$broadcast('$localeChangeSuccess');
  //   $rootScope.$digest();
  //
  //   expect(element.html()).toEqual('26.10.15 11:00');
  // });
  //
  // it("transform datetime from long to human readable format - 'dd.MM.yyyy HH:mm' used as element", function () {
  //   element = angular.element("<date-time>1445850000000</date-time>");
  //   $compile(element)($rootScope);
  //
  //   $rootScope.$digest();
  //   expect(element.html()).toEqual('26.10.2015 g. 11:00');
  //
  //   $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
  //   $rootScope.$broadcast('$localeChangeSuccess');
  //   $rootScope.$digest();
  //
  //   expect(element.html()).toEqual('26.10.15 11:00');
  // });
  //
  // it("transform datetime from long to human readable format - 'dd.MM.yyyy HH:mm' interpolating value", function () {
  //   $rootScope.date = new Date(2015, 10, 27, 14, 50);
  //   element = angular.element("<date-time>{{date}}</date-time>");
  //   $compile(element)($rootScope);
  //
  //   $rootScope.$digest();
  //   expect(element.html()).toEqual('27.11.2015 g. 14:50');
  //
  //   $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
  //   $rootScope.$broadcast('$localeChangeSuccess');
  //   $rootScope.$digest();
  //
  //   expect(element.html()).toEqual('27.11.15 14:50');
  // });

  it("update view, when date is updated and directive is used as element", function () {
    $rootScope.date = new Date(2015, 10, 27, 14, 50);
    element = angular.element("<date-time ng-model = date></date-time>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('27.11.2015 g. 14:50');

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('27.11.15 14:50');

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();

    expect(element.html()).toEqual('10.10.10 10:10');
  });

  it("update view, when date is updated and directive used as attribute with value", function () {
    $rootScope.date = new Date(2015, 10, 27, 14, 50);
    element = angular.element("<span date-time = date></span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('27.11.2015 g. 14:50');

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('27.11.15 14:50');

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();

    expect(element.html()).toEqual('10.10.10 10:10');
  });

  it("update view, when date is updated and directive used as attribute", function () {
    $rootScope.date = new Date(2015, 10, 27, 14, 50);
    element = angular.element("<span date-time ng-model = date></span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('27.11.2015 g. 14:50');

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('27.11.15 14:50');

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();

    expect(element.html()).toEqual('10.10.10 10:10');
  });

  it(" element html is ignored if ng-model is used", function () {
    $rootScope.date = new Date(2015, 10, 27, 14, 50);
    $rootScope.anotherDate = new Date(2022, 1, 22, 22, 22);

    element = angular.element("<span date-time ng-model = date>{{anotherDate}}</span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('27.11.2015 g. 14:50');

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('27.11.15 14:50');

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();

    expect(element.html()).toEqual('10.10.10 10:10');
  });

  it(" element html is ignored if directive is used as attribute with value", function () {
    $rootScope.date = new Date(2015, 10, 27, 14, 50);
    $rootScope.anotherDate = new Date(2022, 1, 22, 22, 22);

    element = angular.element("<span date-time = date>{{anotherDate}}</span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('27.11.2015 g. 14:50');

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.yy";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('27.11.15 14:50');

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();

    expect(element.html()).toEqual('10.10.10 10:10');
  });

  it("transform date from long to human readable format - 'dd.MM.yyyy'", function () {
    element = angular.element("<td date>1445850000000</td>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual("26.10.2015 g.");
  });

  it("transform date from long to human readable format - 'dd.MM.yyyy' used as element", function () {
    element = angular.element("<date>1445850000000</date>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('26.10.2015 g.');
  });

  it("transform date from Date object to human readable format - 'dd.MM.yyyy' when interpolating value", function () {
    $rootScope.date = new Date(2015, 10, 26);
    element = angular.element("<td date>{{date}}</td>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('26.11.2015 g.');
  });

  it("update view, when 'date' directive is used as element", function () {
    $rootScope.date = new Date(2015, 9, 26);
    element = angular.element("<date ng-model=date><date>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();
    expect(element.html()).toEqual("26.10.2015 g.");

    $rootScope.date = new Date(2010, 9, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual("10.10.2010 g.");
  });

  it("update view, when 'date' directive is used as attribute", function () {
    $rootScope.date = new Date(2015, 9, 26);
    element = angular.element("<span date ng-model=date><span>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();
    expect(element.html()).toEqual("26.10.2015 g.");

    $rootScope.date = new Date(2010, 9, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual("10.10.2010 g.");
  });

  it("update view, when 'date' directive is used as attribute with value", function () {
    $rootScope.date = new Date(2015, 9, 26);
    element = angular.element("<span date = date><span>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();
    expect(element.html()).toEqual("26.10.2015 g.");

    $rootScope.date = new Date(2010, 9, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual("10.10.2010 g.");
  });

  it("inner html is ignored when update date value in 'date' directive", function () {
    $rootScope.date = new Date(2015, 9, 26);
    element = angular.element("<date ng-model = date>'this text will be ignored'<date>");
    $compile(element)($rootScope);

    $rootScope.$digest();

    $locale.DATETIME_FORMATS.mediumDate = "d.MM.y 'g'.";
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();
    expect(element.html()).toEqual("26.10.2015 g.");

    $rootScope.date = new Date(2010, 9, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual("10.10.2010 g.");
  });

  it("transform time from long to human readable format - 'HH:mm'", function () {
    element = angular.element("<td time>1445850000000</td>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('11:00');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('11:00 AM');
  });

  it("transform time from long to human readable format - 'HH:mm' used as element", function () {
    element = angular.element("<time>1445850000000</time>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('11:00');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('11:00 AM');
  });

  it("transform time from Date() to human readable format - 'HH:mm' used as element", function () {

    $rootScope.date = new Date(2015, 10, 26, 15, 20);

    element = angular.element("<time>{{date}}</time>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('15:20');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(element.html()).toEqual('3:20 PM');
  });

  it("update view, when 'time' directive is used as element", function () {

    $rootScope.date = new Date(2015, 10, 26, 15, 20);

    element = angular.element("<time ng-model=date></time>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('15:20');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual('10:10 AM');
  });

  it("update view, when 'time' directive is used as attribute", function () {

    $rootScope.date = new Date(2015, 10, 26, 15, 20);

    element = angular.element("<span time ng-model=date></span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('15:20');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual('10:10 AM');
  });

  it("update view, when 'time' directive is used as attribute with value", function () {

    $rootScope.date = new Date(2015, 10, 26, 15, 20);

    element = angular.element("<span time=date></span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('15:20');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual('10:10 AM');
  });

  it("when 'time' directive is used inner html is ignored", function () {

    $rootScope.date = new Date(2015, 10, 26, 15, 20);

    element = angular.element("<span time=date>'this is ignored'</span>");
    $compile(element)($rootScope);

    $rootScope.$digest();
    expect(element.html()).toEqual('15:20');

    $locale.DATETIME_FORMATS.shortTime = 'h:mm a';
    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    $rootScope.date = new Date(2010, 9, 10, 10, 10);
    $rootScope.$digest();
    expect(element.html()).toEqual('10:10 AM');
  });
});

describe("DatePicker", function () {

  var $compile, $rootScope, element;

  beforeEach(module('common'));
  beforeEach(module('common/date-time/ui-date-picker.tpl.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.today=new Date();

    element = angular.element('<date-picker ng-model="today" on-date-changed="onDateChanged(newDate)" on-init="onInit()" trim-to-start="true" current-text="Some text"></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();
  }));

  it("should call function when date is changed", function () {

    var pickDate = new Date(2000, 3, 4);

    $rootScope.onDateChanged = function (newDate) {};
    spyOn($rootScope, 'onDateChanged');

    var isoScope = element.isolateScope();
    isoScope.dateChanged(pickDate);
    $rootScope.$digest();

    expect($rootScope.onDateChanged).toHaveBeenCalledWith(pickDate);
  });

  it("should call init function when initialized", function () {

    $rootScope.onInit = function () {};
    spyOn($rootScope, 'onInit');

    var isoScope = element.isolateScope();
    isoScope.onInit();
    $rootScope.$digest();

    expect($rootScope.onInit).toHaveBeenCalled();
  });

  it("should trim date to the beginning", function () {

    var pickDate = new Date(2000, 12, 10, 5, 5, 5);

    var isoScope = element.isolateScope();
    isoScope.dateChanged(pickDate);
    $rootScope.$digest();

    expect(isoScope.ngModel.getHours()).toEqual(0);
    expect(isoScope.ngModel.getMinutes()).toEqual(0);
    expect(isoScope.ngModel.getMilliseconds()).toEqual(0);
  });

  it("should add picker button text", function () {

    var expected = "Some text";

    var attributeCurrentText = element[0].getElementsByTagName('input')[0].getAttribute('current-text');

    expect(attributeCurrentText).toBe(expected);
  });

  it("should set default date format and week start date", function () {
    element = angular.element('<date-picker></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();

    expect(isoScope.datePickerOptions.dateOptions.startingDay).toEqual(1);
    expect(isoScope.datePickerOptions.format).toEqual('dd/MM/yyyy');
  });

  it("should set custom date format and week start date", function () {
    element = angular.element('<date-picker starting-day="4" date-format="dd-MM-yyyy"></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();

    expect(isoScope.datePickerOptions.dateOptions.startingDay).toEqual('4');
    expect(isoScope.datePickerOptions.format).toEqual('dd-MM-yyyy');
  });

  it("create ng-style object with default styles", function () {
    element = angular.element('<date-picker></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();
    var style = isoScope.getStyle();

    expect(style).toEqual({
      'cursor':'pointer',
      'background-color':'#fff'
    });
  });

  it("create ng-style object with custom styles", function () {
    element = angular.element('<date-picker custom-style="position:relative;top:0"></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();
    var style = isoScope.getStyle();

    //default
    expect(style['cursor']).toEqual('pointer');
    expect(style['background-color']).toEqual('#fff');
    //custom
    expect(style['position']).toEqual('relative');
    expect(style['top']).toEqual('0');
  });


  it("should have correct date format in month mode", function () {
    element = angular.element('<date-picker  month-select-mode></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();

    expect(isoScope.datePickerOptions.format).toEqual('MMM yyyy');
  });

  it("should set default date format", function () {
    element = angular.element('<date-picker></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();

    expect(isoScope.datePickerOptions.format).toEqual('dd/MM/yyyy');
  });

  it("should set custom date format for month mode", function () {
    element = angular.element('<date-picker month-select-mode date-format="MMM-yyyy"></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var isoScope = element.isolateScope();

    expect(isoScope.datePickerOptions.format).toEqual('MMM-yyyy');
  });

  it("should update value when locale changed", function () {
    element = angular.element('<date-picker month-select-mode date-format="MMM-yyyy"></date-picker>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var lastSelectedDate = new Date(2016, 2, 3);
    var isoScope = element.isolateScope();
    isoScope.datePickerOptions.datePickerModel = new Date(2010, 1, 1);
    isoScope.lastDateValue = lastSelectedDate;

    $rootScope.$broadcast('$localeChangeSuccess');
    $rootScope.$digest();

    expect(isoScope.datePickerOptions.datePickerModel).toEqual(lastSelectedDate);
  });
});

describe("Simple time ago directive", function () {

  var $compile, $rootScope, element;
  var $locale = {};
  var currentDate = {};
  var fakeDate = {get: function () {
    return currentDate;
  }};
  beforeEach(module('common'));
  beforeEach(module('angularMoment'));
  beforeEach(module(function ($provide) {
    $provide.value('$locale', $locale);
    $provide.value('CurrentDate', fakeDate);
  }));

  beforeEach(inject(function (_$compile_, _$rootScope_) {

    $compile = _$compile_;
    $rootScope = _$rootScope_;

    $locale.DATETIME_FORMATS = {
      mediumDate: "d.MM.y 'g'.",
      shortTime: "H:mm"
    };

  }));

  it("should display 'date-time' directive if time period is passed", function () {

    currentDate = new Date(2016, 5, 7, 0, 0);
    $rootScope.date = new Date(2016, 5, 5, 0, 0);

    element = angular.element('<simple-time-ago ng-model="date" time-period="1"></simple-time-ago>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var innerElement = element.html();

    expect($rootScope.inDateTimeMode).toBeTruthy();
    expect(innerElement).toContain('<span date-time="dateValue" ng-show="inDateTimeMode">');
    expect(innerElement).toContain('<span am-time-ago="dateValue" ng-hide="inDateTimeMode" class="ng-hide">');
  });

  it("should display 'am-time-ago' directive if period did not pass", function () {

    currentDate = new Date(2016, 5, 7, 0, 0);
    $rootScope.date = new Date(2016, 5, 5, 0, 0);

    element = angular.element('<simple-time-ago ng-model="date" time-period="3"></simple-time-ago>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var innerElement = element.html();

    expect($rootScope.inDateTimeMode).toBeFalsy();
    expect(innerElement).toContain('<span date-time="dateValue" ng-show="inDateTimeMode" class="ng-hide">');
    expect(innerElement).toContain('<span am-time-ago="dateValue" ng-hide="inDateTimeMode">');
  });

  it("should display 'date-time' directive if time period is passed used as attribute", function () {

    currentDate = new Date(2016, 5, 7, 0, 0);
    $rootScope.date = new Date(2016, 5, 5, 0, 0);

    element = angular.element('<span simple-time-ago ng-model="date" time-period="1"></span>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var innerElement = element.html();

    expect($rootScope.inDateTimeMode).toBeTruthy();
    expect(innerElement).toContain('<span date-time="dateValue" ng-show="inDateTimeMode">');
    expect(innerElement).toContain('<span am-time-ago="dateValue" ng-hide="inDateTimeMode" class="ng-hide">');
  });

  it("should display 'am-time-ago' directive if period did not pass when used as attribute", function () {

    currentDate = new Date(2016, 5, 7, 0, 0);
    $rootScope.date = new Date(2016, 5, 5, 0, 0);

    element = angular.element('<span simple-time-ago ng-model="date" time-period="3"></span>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var innerElement = element.html();

    expect($rootScope.inDateTimeMode).toBeFalsy();
    expect(innerElement).toContain('<span date-time="dateValue" ng-show="inDateTimeMode" class="ng-hide">');
    expect(innerElement).toContain('<span am-time-ago="dateValue" ng-hide="inDateTimeMode">');
  });

  it("should display 'am-time-ago' directive if time period is not added", function () {

    currentDate = new Date(2016, 5, 7, 0, 0);
    $rootScope.date = new Date(2016, 5, 5, 0, 0);

    element = angular.element('<simple-time-ago ng-model="date"></simple-time-ago>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    var innerElement = element.html();

    expect($rootScope.inDateTimeMode).toBeFalsy();
    expect(innerElement).toContain('<span date-time="dateValue" ng-show="inDateTimeMode" class="ng-hide">');
    expect(innerElement).toContain('<span am-time-ago="dateValue" ng-hide="inDateTimeMode">');
  });
});

describe("DateTime", function () {

  var DateTime;

  beforeEach(function () {
    module('common.date-time');
    inject(function (_DateTime_) {
      DateTime = _DateTime_;});
  });

  it("format date to standart date string", function () {
    var dateToFormat = new Date(2011, 7, 24);
    var formattedDate = DateTime.toYYYYMMDD(dateToFormat);

    expect(formattedDate).toBe('2011-08-24');
  });

  it("format date as long to standart date string", function () {
    var dateToFormat = new Date(2012, 7, 24).getTime();
    var formattedDate = DateTime.toYYYYMMDD(dateToFormat);

    expect(formattedDate).toBe('2012-08-24');
  });

  it("get fist day of month", function () {
    var dateToFormat = new Date(2013, 7, 24);
    var expected = new Date(2013, 7, 1, 0, 0, 0, 0);

    var firstDateOfMonth = DateTime.firstDateOfMonth(dateToFormat);

    expect(firstDateOfMonth).toEqual(expected);
  });

  it("get fist day of month using builder", function () {
    var dateToFormat = new Date(2014, 7, 24);
    var expected = new Date(2014, 7, 1, 0, 0, 0, 0);

    var firstDateOfMonth = DateTime.date(dateToFormat).firstDateOfMonth();

    expect(firstDateOfMonth).toEqual(expected);
  });

  it("get last date of month", function () {
    var dateToFormat = new Date(2015, 7, 24);
    var expected = new Date(2015, 7, 31, 23, 59, 59, 999);

    var lastDayOfMonth = DateTime.lastDateOfMonth(dateToFormat);

    expect(lastDayOfMonth).toEqual(expected);
  });

  it("get last date of month using builder", function () {
    var dateToFormat = new Date(2015, 7, 24);
    var expected = new Date(2015, 7, 31, 23, 59, 59, 999);

    var lastDayOfMonth = DateTime.date(dateToFormat).lastDateOfMonth();

    expect(lastDayOfMonth).toEqual(expected);
  });
});
