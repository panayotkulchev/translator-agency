/**
 * Created by panayot on 30.01.17.
 */
angular.module('ta.expenses', [
    'ui.router',
    'ui.bootstrap',
    'ta.http',
    'common'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('expenses', {
            url: '/expenses',
            views: {
                "main": {
                    controller: 'ExpensesCtrl as vm',
                    templateUrl: 'expenses/expenses.tpl.html'
                }
            },
            data: {pageTitle: 'Expenses'}
        })
            .state('expensesReport', {
            url: '/expensesReport',
            views: {
                "main": {
                    controller: 'ExpensesReportCtrl as vm',
                    templateUrl: 'expenses/expenses-report.tpl.html'
                }
            },
            data: {pageTitle: 'Expenses Report'}
        });
    })

    .service('expensesGateway', function (httpRequest) {
        return {
            addExpense: function (expense) {
                return httpRequest.post('/r/expenses', expense);
            },
            getReport: function (startDate, endDate){
                return httpRequest.get('/r/expenses/report/' +startDate+ '/' + endDate);
            }
        };
    })

    .controller('ExpensesCtrl', function ExpensesCtrl($scope, expensesGateway, growl) {
        var vm = this;
        vm.expenseTypes = ["Книги", "Сметки", "Кола", "Компютри", "Храна", "Гориво"];

        vm.expense = {};
        vm.expense.date = new Date();

        vm.addExpense = function (expense) {
            expensesGateway.addExpense(expense);
        };
    })

    .controller('ExpensesReportCtrl', function ExpensesCtrl($scope, expensesGateway, growl, DateTime) {
        var vm = this;

        vm.expensesList = [];

        vm.startDate = new Date();
        vm.endDate = new Date();
        vm.monthReportDate = new Date();

        vm.getPeriodReport = function(startDate, endDate){
            expensesGateway.getReport(startDate.getTime(), endDate.getTime()).then(function (expensesList) {
                vm.expensesList = expensesList;
            });
        };

        vm.getMonthlyReport = function (date) {
            var dateTime = DateTime.date(date);
            var startDate = dateTime.firstDateOfMonth();
            var endDate = dateTime.lastDateOfMonth();

            expensesGateway.getReport(startDate.getTime(), endDate.getTime()).then(function (expensesList) {
                vm.expensesList = expensesList;
            });
        };
    });