/**
 * Created by pepo on 16-3-27.
 */
angular.module('ta.orders.i18n', ['i18n'])
  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        ORDERS: {
          ORDERS: "Поръчки",
          NOMENCLATURE: "списък",
          NEW: "Нова поръчка",
          ADD: "добавяне",
          TITLE: "ЗАГЛАВИЕ",
          DESCRIPTION: "ОПИСАНИЕ",
          CLIENT: "КЛИЕНТ",
          SEARCH: "Търси",
          ADDED: "Добавена",
          UPDATED: "Редактирана",
          PRIORITY: "Приоритет",
          ATTENTION: "Внимание",
          TYPE: "ВИД",
          CHOOSE_ORDER_TYPE: "Избери вид услуга...",
          STATUS_RAW: "Приета",
          STATUS_ASSIGNED: "Възложена",
          STATUS_EXECUTED: "Изпълнена",
          STATUS_CLOSED: "Затворена",
          FILTER_OPENED: 'Отворени',
          FILTER_CLOSED: 'Затворени',
          SEARCH_CLIENT: "Търсене на клиент",
          ORDER_WAS_UPDATED: "Поръчката е обновена!",
          STATUS_WAS_UPDATED: "Статусът е обновен!",
          NAME_OR_BULSTAT: "Име/Булстат",
          NAME: "Име",
          BULSTAT: "Булстат",
          MOL: "Мол",
          ADD_COMMENT: "ДОБАВИ КОМЕНТАР"
        },
        TRANSLATION: "Превод",
        LEGALIZATION: "Легализация"
      })
      .translations('en', {
        ORDERS: {
          ORDERS: "Orders",
          NOMENCLATURE: "list",
          NEW: "New order",
          ADD: "registration",
          TITLE: "TITLE",
          DESCRIPTION: "DESCRIPTION",
          CLIENT: "CLIENT",
          SEARCH: "Search",
          ADDED: "Added",
          UPDATED: "Updated",
          PRIORITY: "Priority",
          ATTENTION: "Attention",
          TYPE: "TYPE",
          CHOOSE_ORDER_TYPE: "Choose order type...",
          STATUS_RAW: "Raw",
          STATUS_ASSIGNED: "Assigned",
          STATUS_EXECUTED: "Executed",
          STATUS_CLOSED: "Closed",
          FILTER_OPENED: 'Opened',
          FILTER_CLOSED: 'Closed',
          SEARCH_CLIENT: "Search client",
          ORDER_WAS_UPDATED: "Order updated!",
          STATUS_WAS_UPDATED: "Order status updated!",
          NAME_OR_BULSTAT: "Name/Bulstat",
          NAME: "Name",
          BULSTAT: "Bulstat",
          MOL: "Mol",
          ADD_COMMENT: "ADD COMMENT"
        },
        TRANSLATION: "Translation",
        LEGALIZATION: "Legalization"
      });
  });