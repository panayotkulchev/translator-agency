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
          PRIORITY: "Приоритет",
          ATTENTION: "Внимание",
          TYPE: "ВИД",
          CHOOSE_ORDER_TYPE: "Избери вид услуга...",
          STATUS_RAW: "Приета",
          STATUS_ASSIGNED: "Възложена",
          STATUS_EXECUTED: "Изпълнена",
          STATUS_CLOSED: "Затворена"
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
          PRIORITY: "Priority",
          ATTENTION: "Attention",
          TYPE: "TYPE",
          CHOOSE_ORDER_TYPE: "Choose order type...",
          STATUS_RAW: "Raw",
          STATUS_ASSIGNED: "Assigned",
          STATUS_EXECUTED: "Executed",
          STATUS_CLOSED: "Closed"
        },
        TRANSLATION: "Translation",
        LEGALIZATION: "Legalization"
      });
  });