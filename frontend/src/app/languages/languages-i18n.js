/**
 * Created by pepo on 16-3-27.
 */
angular.module('ta.languages.i18n', [
    'i18n'
  ])
  .config(function i18n($translateProvider) {
    $translateProvider
      .translations('bg', {
        LANGUAGES: {
          ADD: "Добави",
          LANG: "Език",
          DELETE: "Изтриване",
          YES: 'Да',
          NO: 'Не',
          ACTIVE: 'Активен',
          LANGUAGES: 'Езици',
          NOMENCLATURE: 'номенклатура',
          ADDED_SUCCESSFUL: "Езикът е добавен!",
          UPDATED_SUCCESSFUL: "Езикът е редактиран!",
          DELETED_SUCCESSFUL: "Езикът е изтрит!"
        }
      })

      .translations('en', {
        LANGUAGES: {
          ADD: "Add",
          LANG: "Language",
          DELETE: "Delete",
          YES: 'Yes',
          NO: 'No',
          ACTIVE: 'Active',
          LANGUAGES: 'Languages',
          NOMENCLATURE: 'nomenclature',
          ADDED_SUCCESSFUL: "Language is added!",
          UPDATED_SUCCESSFUL: "Language is updated!!",
          DELETED_SUCCESSFUL: "Language is deleted!"
        }
      });
  });