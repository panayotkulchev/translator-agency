angular.module('i18n', [
        'pascalprecht.translate'
    ])

    .config(function i18nConfig($translateProvider) {
        $translateProvider.preferredLanguage('bg');
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider
            .translations('en', {
                TRANSLATORS: {
                    NAME: "Name",
                    PERMANENT_ADDRESS: "Permanent address",
                    "CURRENT_ADDRESS": "Current address"
                },
                HEADLINE: 'Hello there, This is my awesome app!',
                INTRO_TEXT: 'And it has i18n support!'
            })
            .translations('bg', {
                TRANSLATORS: {
                    "LISTS": "Списъци",
                    "ADD": "Добавяне",
                    NAME: "Име: ",
                    PERMANENT_ADDRESS: "Постоянен адрес: ",
                    "CURRENT_ADDRESS": "Настоящ адрес",
                    "PHONES": "Телефон: ",
                    "LANGUAGES": "Езици: ",
                    "EDUCATION": "Образование",
                    "LANGUAGES_EDUCATION": "Езици",
                    "EMAIL": "Е-мейл: ",
                    "SKYPE": "Скайп: ",
                    "EID": "ЕГН: ",
                    "DOCUMENTS": "Данни лична карта:",
                    "IBAN": "Банкова сметка",
                    "OPTIONS": "Опции",
                    "FULL_INFO": "Подробно",
                    "EDIT": "Редакция",
                    "DELETE": "Изтриване",
                    "LEGAL_SIGN": "Таг",
                    "FILTER": "Филтър: ",
                    "ONLY_LEGALS": "само заклети",
                    "SEARCH": "Търсене",
                    "SEARCH_TOOLTIP": "Намерете всички преводачи за съотвения език",
                    "RESULTS": "Резултати: ",
                    "TOOLTIP_LEGAL": "заклет",
                    "TOOLTIP_FAVORITE": "любим",
                    "NO_RESULT_MESSAGE": "Няма намерени резултати!"
                },

                LANGUAGES: {
                    ADD: "Добави",
                    LANG: "Език",
                    DELETE: "Изтриване",
                    YES: 'Да',
                    NO: 'Не',
                    ACTIVE: 'Активен'
                },

                LANG_NOMENCLATURE: {
                    ALBANIAN: 'Албански',
                    ARMENIAN: 'Арменски',
                    BULGARIAN: 'Български',
                    BELGIUM: 'Белгийкси',
                    GREEK: 'Гръцки',
                    GERMAN: 'Немски',
                    DANISH: 'Датски',
                    ITALIAN: 'Италиански',
                    IRISH: 'Ирландски',
                    ENGLISH: 'Английски',
                    POLISH: 'Полски',
                    SPANISH: 'Испански',
                    SLOVAK: 'Словашки',
                    SLOVENIAN: 'Словенски',
                    SWEDISH: 'Шведски',
                    ROMANIAN: 'Румънски',
                    RUSSIAN: 'Руски',
                    TURKISH: 'Турски',
                    CHINESE: 'Китайски',
                    SERBIAN: 'Сръбски',
                    MACEDONIAN: 'Македонски'

                }

            });
    });
