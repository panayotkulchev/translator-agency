angular.module('i18n', [
  'pascalprecht.translate'
])

        .config(function i18nConfig($translateProvider) {

          $translateProvider
                  .translations('en', {
                    TRANSLATORS:{
                      NAME: "Name",
                      PERMANENT_ADDRESS: "Permanent address",
                      "CURRENT_ADDRESS": "Current address"
                    },
                    HEADLINE: 'Hello there, This is my awesome app!',
                    INTRO_TEXT: 'And it has i18n support!'
                  })
                  .translations('bg', {
                    TRANSLATORS:{
                      "LISTS": "Списъци",
                      "ADD": "Добавяне",
                      NAME: "Име: ",
                      PERMANENT_ADDRESS: "Постоянен адрес: ",
                      "CURRENT_ADDRESS": "Настоящ адрес",
                      "PHONES": "Телефон: ",
                      "LANGUAGES": "Езици: ",
                      "EDUCATION": "Образование",
                      "LANGUAGES_EDUCATION": "Езици/ Образование",
                      "EMAIL": "Е-мейл: ",
                      "SKYPE": "Скайп: ",
                      "EID": "ЕГН: ",
                      "DOCUMENTS": "Данни лична карта:",
                      "IBAN": "Банкова сметка",
                      "OPTIONS": "Опции",
                      "FULL_INFO": "Подробно",
                      "EDIT": "Редакция",
                      "DELETE": "Изтриване",
                      "LEGAL_SIGN": "Заклет/Любим",
                      "FILTER": "Филтър: ",
                      "ONLY_LEGALS": "само заклети",
                      "SEARCH": "Търсене",
                      "SEARCH_TOOLTIP": "Намерете всички преводачи за съотвения език",
                      "RESULTS": "Резултати: ",
                      "TOOLTIP_LEGAL": "заклет",
                      "TOOLTIP_FAVORITE": "любим"
                    },

                    HEADLINE: 'Hey, das ist meine großartige App!',
                    INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!'
                  });
          $translateProvider.preferredLanguage('bg');
          $translateProvider.useSanitizeValueStrategy(null);
        });
