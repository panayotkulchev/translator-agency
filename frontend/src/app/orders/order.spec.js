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

    it('doesn\'t have any assertions', function(){});

    it('search client', function () {
      state.go = jasmine.createSpy('state.go');
      var clientId = 123;

      scope.searchClient(clientId);

      expect(state.go).toHaveBeenCalledWith('clients',{clientId: clientId});
    });

    it('edit order', function () {
      state.go = jasmine.createSpy('state.go');
      var orderId = 123;

      scope.editOrder(orderId);

      expect(state.go).toHaveBeenCalledWith('orderEditor',{orderId: orderId});
    });

    it('go to order editor', function () {
      state.go = jasmine.createSpy('state.go');

      scope.goToOrderEditor();

      expect(state.go).toHaveBeenCalledWith('orderEditor');
    });
  });

});