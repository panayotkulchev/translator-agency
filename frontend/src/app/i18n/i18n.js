angular.module('i18n', [
        'pascalprecht.translate'
    ])

    .config(function i18nConfig($translateProvider) {
        $translateProvider.preferredLanguage('bg');
        $translateProvider.useSanitizeValueStrategy(null);
    });
