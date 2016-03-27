/**
 * Created by pepo on 16-3-27.
 */
angular.module('ta.clients.i18n', [
    'i18n'
  ])
  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        CLIENTS: {
          CLIENTS: "Клиенти",
          NOMENCLATURE: "номенклатура",
          NEW: "Нов клиент",
          SEARCH: "Търси в списъка...",
          NAME: "Име",
          EIK: "Булстат",
          DDS: "ДДС",
          ADDRESS: "Адрес",
          MOL: "МОЛ",
          PHONE: "Телефон",
          OPTIONS: "Опции",
          EDIT: "Редакция",
          DELETE: "Изтриване",
          REGISTER: "Регистрация на клиент",
          UPDATE: "Обновяване на клиент",
          CONFIRM_DELETION: "Изтриване на клиента?"
        }
      })
      .translations('en', {
        CLIENTS: {
          CLIENTS: "Clients",
          NOMENCLATURE: "nomenclature",
          NEW: "New client",
          SEARCH: "Search in the list...",
          NAME: "Name",
          EIK: "EIK",
          DDS: "DDS",
          ADDRESS: "Address",
          MOL: "MOL",
          PHONE: "Telephone",
          OPTIONS: "Options",
          EDIT: "Edit",
          DELETE: "Delete",
          REGISTER: "Register new client",
          UPDATE: "Update client information",
          CONFIRM_DELETION: "Delete client?"
        }
      });
  });