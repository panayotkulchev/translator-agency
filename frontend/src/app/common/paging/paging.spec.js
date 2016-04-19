/**
 * @author Stefan Dimitrov (stefan.dimitrov@clouway.com).
 */

describe('SimplePager directive', function() {
  var $compile, $rootScope, element;

  beforeEach(module('common.paging'));
  beforeEach(module('common/paging/simple-pager.tpl.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    element = angular.element('<simple-pager></simple-pager>');
    $compile(element)($rootScope);
    $rootScope.$digest();
  }));

  it('template is shown', function() {

    var buttons = element[0].getElementsByTagName('button');

    expect(buttons.length).toBe(2);

  });

  it('should change page when nextPage is called', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.currentPage = 5;
    spyOn(isoScope,"changePage");

    isoScope.nextPage();

    expect(isoScope.changePage).toHaveBeenCalledWith(6);

  });

  it('should call changePage function when previousPage is called', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.currentPage = 3;
    spyOn(isoScope,"changePage");

    isoScope.previousPage();

    expect(isoScope.changePage).toHaveBeenCalledWith(2);

  });

  it('should reset values', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.offset = 20;
    isoScope.pager.currentPage = 5;

    isoScope.pager.reset();

    expect(isoScope.pager.offset).toBe(0);
    expect(isoScope.pager.currentPage).toBe(1);

  });

  it('should reload current page', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.offset = 20;
    isoScope.pager.currentPage = 5;

    spyOn(isoScope,"changePage");

    isoScope.pager.reload();

    expect(isoScope.changePage).toHaveBeenCalledWith(5);
    expect(isoScope.pager.offset).toBe(20);
    expect(isoScope.pager.currentPage).toBe(5);

  });

  it('should not have next page when data size is less then pageSize', function() {

    var isoScope = element.isolateScope();
    isoScope.hasNext=true;
    isoScope.pager.pageSize=3;

    isoScope.pager.accept([{dummy:'object'},{dummy:'object1'}]);

    expect(isoScope.hasNext).toBeFalsy();

  });

  it('should not have next page when data size is equal to pageSize', function() {

    var isoScope = element.isolateScope();
    isoScope.hasNext=true;
    isoScope.pager.pageSize=2;

    isoScope.pager.accept([{dummy:'object'},{dummy:'object1'}]);

    expect(isoScope.hasNext).toBeFalsy();

  });

  it('should have next page when data size is greater then pageSize', function() {

    var isoScope = element.isolateScope();
    isoScope.hasNext=false;
    isoScope.pager.pageSize=1;

    isoScope.pager.accept([{dummy:'object'},{dummy:'object1'}]);

    expect(isoScope.hasNext).toBeTruthy();

  });

  it('should have next page when accepted data length more than pageSize', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.hasNext=false;

    isoScope.pager.accept([{dummy:'object'}]);

    expect(isoScope.pager.hasNext).toBeFalsy();

  });

  it('should rollback current page', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.oldPage=3;
    isoScope.pager.currentPage=4;

    isoScope.pager.rollback();

    expect(isoScope.pager.currentPage).toBe(isoScope.pager.oldPage);

  });

  it('should not have previous page at first page', function() {

    var isoScope = element.isolateScope();

    isoScope.pager.currentPage = 1;

    var result = isoScope.hasPrevious();
    expect(result).toBeFalsy();
  });

  it('should have previous page at page greater than one ', function() {

    var isoScope = element.isolateScope();

    isoScope.pager.currentPage = 2;

    var result = isoScope.hasPrevious();
    expect(result).toBeTruthy();
  });

  it('should disable previous page button at first page', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.currentPage=1;
    isoScope.$digest();

    var attribute = element[0].getElementsByTagName('button')[0].getAttribute('disabled');
    var previousBtnIsDisabled = attribute==='disabled';

    expect(isoScope.pager.currentPage).toBe(1);
    expect(previousBtnIsDisabled).toBeTruthy();
  });

  it('should enable previous button when not on first page', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.currentPage=2;
    isoScope.$digest();

    var attributeDisable = element[0].getElementsByTagName('button')[0].getAttribute('disabled');
    var previousBtnIsEnabled = attributeDisable === null;

    expect(isoScope.pager.currentPage).toBe(2);
    expect(previousBtnIsEnabled).toBeTruthy();
  });

  it('should enable next button', function() {

    var isoScope = element.isolateScope();
    isoScope.hasNext = true;
    isoScope.$digest();

    var attributeDisable = element[0].getElementsByTagName('button')[1].getAttribute('disabled');
    var nextBtnIsEnabled = attributeDisable === null;

    expect(nextBtnIsEnabled).toBeTruthy();
  });

  it('should disable next button', function() {

    var isoScope = element.isolateScope();
    isoScope.pager.hasNext = false;
    isoScope.$digest();

    var attributeDisable = element[0].getElementsByTagName('button')[1].getAttribute('disabled');
    var nextBtnIsDisabled = attributeDisable === 'disabled';

    expect(nextBtnIsDisabled).toBeTruthy();
  });
});


describe('ShowMore directive', function() {
  var $compile, $rootScope, element, elemScope, deferred;

  beforeEach(module('common.paging'));
  beforeEach(module('common/paging/show-more.tpl.html'));

  beforeEach(inject(function (_$compile_, _$rootScope_, $q) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    deferred = $q.defer();

    element = angular.element('<show-more on-show-more="showMore(offset, count)" page-size="2" name="pager" initial-load="true"></show-more>');
    $compile(element)($rootScope);
    $rootScope.$digest();

    elemScope = element.isolateScope();
  }));

  it('template is shown', function() {

    var buttons = element[0].getElementsByTagName('button');
    var ngClick = element[0].getElementsByTagName('button')[0].getAttribute("ng-click");

    expect(buttons.length).toBe(1);
    expect(ngClick).toBe('nextPage()');

  });

  it('should load next page', function () {
    $rootScope.showMore = jasmine.createSpy('showMore');

    elemScope.pager.currentPage = 5;
    elemScope.pager.offset = 8;
    elemScope.pager.pageSize = 2;

    elemScope.nextPage();

    expect(elemScope.pager.currentPage).toEqual(6);
    expect(elemScope.pager.offset).toEqual(10);
    expect($rootScope.showMore).toHaveBeenCalledWith(10, 3);
  });

  it('should reset values', function() {

    elemScope.pager.offset = 20;
    elemScope.pager.currentPage = 5;

    elemScope.pager.reset();

    expect(elemScope.pager.offset).toBe(0);
    expect(elemScope.pager.currentPage).toBe(1);

  });

  it('should be hidden when no next page', function() {

    elemScope.hasNext=true;
    elemScope.pager.pageSize=3;

    elemScope.pager.accept([{dummy:'object'},{dummy:'object1'}]);

    expect(elemScope.hasNext).toBe(false);

  });

  it('should be visible when has more results to show', function() {

    elemScope.hasNext=false;
    elemScope.pager.pageSize=1;

    elemScope.pager.accept([{dummy:'object'}, {dummy:'object1'}]);

    expect(elemScope.hasNext).toBe(true);

  });

  it('should rollback current page', function() {

    elemScope.pager.oldPage=3;
    elemScope.pager.currentPage=4;

    elemScope.pager.rollbackPage();

    expect(elemScope.pager.currentPage).toBe(elemScope.pager.oldPage);

  });

  it('should have next page when onShowMore has more results than page size', function () {
    $rootScope.showMore = function (offset, count) {
      return deferred.promise;
    };

    elemScope.nextPage();

    deferred.resolve(['data 1', 'data 2', 'data 3']);
    $rootScope.$digest();

    expect(elemScope.hasNext).toBe(true);
  });

  it('should not have next page when onShowMore has less results than page size', function () {
    $rootScope.showMore = function (offset, count) {
      return deferred.promise;
    };

    elemScope.nextPage();

    deferred.resolve(['data 1', 'data 2']);
    $rootScope.$digest();

    expect(elemScope.hasNext).toBe(false);
  });

  it('should rollback current page when showMore fails', function () {
    $rootScope.showMore = function (offset, count) {
      return deferred.promise;
    };

    elemScope.pager.rollbackPage = jasmine.createSpy('pager.rollbackPage');

    elemScope.nextPage();

    deferred.reject();
    $rootScope.$digest();

    expect(elemScope.pager.rollbackPage).toHaveBeenCalled();
  });

  it('should do nothing when showMore does not return anything', function () {
    $rootScope.showMore = function (offset, count) {/* dummy function */};

    spyOn(elemScope.pager, 'accept');
    spyOn(elemScope.pager, 'rollbackPage');

    elemScope.nextPage();
    $rootScope.$digest();

    expect(elemScope.pager.accept).not.toHaveBeenCalled();
    expect(elemScope.pager.rollbackPage).not.toHaveBeenCalled();
  });

});