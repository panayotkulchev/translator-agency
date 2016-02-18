angular.module('i18n', [
    'pascalprecht.translate'
  ])

  .config(function i18nConfig($translateProvider) {
    $translateProvider.preferredLanguage('bg');
    $translateProvider.useSanitizeValueStrategy(null);
  })

  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        MENU: {
          HOME: "НАЧАЛО",
          TRANSLATORS: "ПРЕВОДАЧИ",
          LANGUAGES: "ЕЗИЦИ",
          CLIENTS: "КЛИЕНТИ",
          ORDERS: "ПОРЪЧКИ",
          LOGOUT: "Изход"
        },

        SYSTEM: {
          ERROR_500: "Системна грешка!"
        },

        BUTTON: {
          YES: "Да",
          NO: "Не",
          EDIT: "Редактирай",
          UPDATE: "Обнови",
          CANCEL: "Отмени",
          OK: "Разбрах",
          REGISTER: "Регистрирай",
          SELECT: "Избери"
        }
      })
      .translations('en', {
        MENU: {
          HOME: "HOME",
          TRANSLATORS: "TRANSLATORS",
          LANGUAGES: "LANGUAGES",
          CLIENTS: "CLIENTS",
          ORDERS: "ORDERS",
          LOGOUT: "Log out"
        },

        SYSTEM: {
          ERROR_500: "System error!"
        },

        BUTTON: {
          YES: "Yes",
          NO: "No",
          EDIT: "Edit",
          UPDATE: "Update",
          CANCEL: "Cancel",
          OK: "OK",
          REGISTER: "REGISTER",
          SELECT: "Избери"
        }
      });
  });
