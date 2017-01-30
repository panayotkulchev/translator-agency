/**
 * @author Stefan Dimitrov (stefan.dimitrov@clouway.com).
 */

angular.module('common.paging', ['i18n'])

  /**
   * @ngdoc directive
   * @name simplePager
   * @restrict E
   * @scope
   *
   * @description
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
   *
   * @param {function(offset, limit)} onPageChange
   */
  .directive('simplePager', function () {

    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'common/paging/simple-pager.tpl.html',
      scope: {
        search: '&onPageChange',
        pageSize: '=',
        pager: '=?name',
        initialLoad: '='
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

      pager.rollback = function () {
        this.currentPage = this.oldPage;
      };

      pager.reset = function () {
        this.currentPage = 1;
        this.oldPage = 1;
        this.offset = 0;
        $scope.hasNext = false;
      };

      pager.reload = function () {
        $scope.changePage(pager.currentPage);
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

      // Should load first page initially If configured.
      if ($scope.initialLoad) {
        $scope.changePage(1);
      }

      $scope.pager = pager;

    }];

    return directive;
  })


  /**
   * @ngdoc directive
   * @name showMore
   * @restrict E
   * @module common.paging
   * @scope
   *
   * @description
   * Directive search for more results. Similar to pager that loads only next page.
   *
   * usage:
   * <code>
   * <show-more on-show-more="showMore(offset,count)"
   *            page-size="10"
   *            name="pager"
   *            initial-load="true"></show-more>
   * </code>
   *
   * @param {function(offset, count)} onShowMore function to call when show more is clicked
   * @param {Number} pageSize the number of items on a page
   * @param {Object} name
   * @param {Boolean} [initialLoad=false]
   * @param {String} [buttonClass] css classes for styling the show-more button
   */
  .directive('showMore', function () {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'common/paging/show-more.tpl.html',
      scope: {
        onShowMore: '&',
        pageSize: '=',
        pager: '=name',
        initialLoad: '=',
        buttonClass: '@'
      },
      controller: function ($scope, $q) {

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
          $scope.hasNext = false;
          pager.oldPage = pager.currentPage;
          changePage(pager, pager.currentPage + 1);
        };

        if ($scope.initialLoad) {
          changePage(pager, 1);
        }

        $scope.pager = pager;


        function changePage (pager, page) {
          pager.currentPage = page;
          pager.offset = (pager.currentPage * pager.pageSize) - pager.pageSize;
          var showMoreResult = $scope.onShowMore({
            offset: pager.offset,
            count: pager.pageSize + 1
          });

          $q.when(showMoreResult).then(function (data) {
            if (data) {
              pager.accept(data);
            }
          }, function () {
            pager.rollbackPage();
          });
        }
      }
    };
  })

;
