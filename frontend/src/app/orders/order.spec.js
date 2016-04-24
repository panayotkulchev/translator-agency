/**
 * Created by pepo on 16-3-19.
 */

describe('Orders', function () {

  beforeEach(module('ta.orders'));

  describe('orders board should', function () {

    var ordersGateway, scope, state, deferred;

    beforeEach(inject(function ($rootScope, $controller, $q) {

      scope = $rootScope.$new();
      ordersGateway = {};
      state = {};
      deferred = $q.defer();

      $controller('OrdersCtrl', {
        $scope: scope,
        $state: state,
        ordersGateway: ordersGateway
      });
    }));

    it('doesn\'t have any assertions', function () {
    });

    it('search client', function () {
      state.go = jasmine.createSpy('state.go');
      var clientId = 123;

      scope.searchClient(clientId);

      expect(state.go).toHaveBeenCalledWith('clients', {clientId: clientId});
    });

    it('edit order', function () {
      state.go = jasmine.createSpy('state.go');
      var orderId = 123;

      scope.editOrder(orderId);

      expect(state.go).toHaveBeenCalledWith('orderEditor', {orderId: orderId});
    });

    it('go to order editor', function () {
      state.go = jasmine.createSpy('state.go');

      scope.goToOrderEditor();

      expect(state.go).toHaveBeenCalledWith('orderEditor');
    });

    it('show more orders', function () {
      var filter = "OPENED";
      var offset = 10;
      var limit = 20;

      scope.orderList = [{id: 1111}, {id: 2222}];
      var response = [{id: 3333}, {id: 4444}, {id: 5555}];
      var expected = [{id: 1111}, {id: 2222}, {id: 3333}, {id: 4444}];

      scope.pager = {
        accept: jasmine.createSpy("pagerAccept"),
        pageSize: 2
      };

      ordersGateway.searchOrders = jasmine.createSpy("searchOrders").and.returnValue(deferred.promise);

      scope.showMore(filter, offset, limit);

      deferred.resolve(response);
      scope.$digest();

      expect(ordersGateway.searchOrders).toHaveBeenCalledWith(filter, offset, limit);
      expect(scope.pager.accept).toHaveBeenCalledWith(response);
      expect(scope.orderList).toEqual(expected);
    });

    it('page do not change when got error when load more orders', function () {
      var filter = "OPENED";
      var offset = 10;
      var limit = 20;

      scope.orderList = [{id: 1111}, {id: 2222}];
      var expected = [{id: 1111}, {id: 2222}];

      scope.pager = {
        rollback: jasmine.createSpy("pagerRollback"),
        pageSize: 2
      };

      ordersGateway.searchOrders = jasmine.createSpy("searchOrders").and.returnValue(deferred.promise);

      scope.showMore(filter, offset, limit);

      deferred.reject();
      scope.$digest();

      expect(ordersGateway.searchOrders).toHaveBeenCalledWith(filter, offset, limit);
      expect(scope.orderList).toEqual(expected);
    });

    it('filter value changed', function () {
      var filter = "OPENED";
      var offset = 10;
      var limit = 20;

      scope.orderList = [{id: 1111}, {id: 2222}];
      var response = [{id: 3333}, {id: 4444}, {id: 5555}];
      var expected = [{id: 3333}, {id: 4444}];

      scope.pager = {
        offset: offset,
        count: limit + 1, // count is pageSize + 1 to check if next page is available
        accept: jasmine.createSpy("pagerAccept"),
        reset: jasmine.createSpy("pagerReset"),
        pageSize: 2
      };

      ordersGateway.searchOrders = jasmine.createSpy("searchOrders").and.returnValue(deferred.promise);

      scope.onFilterChange(filter);

      deferred.resolve(response);
      scope.$digest();

      expect(scope.pager.reset).toHaveBeenCalled();
      expect(ordersGateway.searchOrders).toHaveBeenCalledWith(filter, scope.pager.offset, scope.pager.count);
      expect(scope.pager.accept).toHaveBeenCalledWith(response);
      expect(scope.orderList).toEqual(expected);
    });

  });

});