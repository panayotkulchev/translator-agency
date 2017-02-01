/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',
  vendor_dir: 'vendor',
  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
    jsunit: ['src/**/*.spec.js'],

    atpl: ['src/app/**/*.tpl.html'],
    ctpl: ['src/common/**/*.tpl.html'],

    html: ['src/index.html'],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.js',
      'vendor/bootstrap/dist/js/bootstrap.js',
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-growl-v2/build/angular-growl.min.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      'vendor/bootstrap-switch/dist/js/bootstrap-switch.min.js',
      'vendor/nya-bootstrap-select/dist/js/nya-bs-select.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/angular-translate/angular-translate.min.js',
      'vendor/angular-dynamic-locale/dist/tmhDynamicLocale.js',
      'vendor/moment/moment.js',
      'vendor/angular-moment/angular-moment.js',
      'vendor/moment/locale/bg.js',
      'vendor/angular-ui-utils/keypress.js',
      'vendor/underscore/underscore.js',
      'vendor/angular-loading-bar/src/loading-bar.js',
      'vendor/angular-auto-validate/dist/jcs-auto-validate.js',
      'vendor/bootstrap-select/dist/js/bootstrap-select.min.js',
      'vendor/bootstrap-select/dist/js/i18n/defaults-bg_BG.min.js',
      "vendor/ladda/js/spin.js",
      "vendor/ladda/dist/ladda.min.js",
      "vendor/angular-ladda/dist/angular-ladda.min.js",
      "vendor/spin.js/spin.js",
      "vendor/angular-spinner/angular-spinner.js",
      'vendor/table-to-json/lib/jquery.tabletojson.min.js'
    ],
    css: [
      'vendor/boostrap/dist/css/boostrap.css',
      'vendor/nya-bootstrap-select/dist/css/nya-bs-select.min.css',
      'vendor/angular-growl-v2/build/angular-growl.min.css',
      'vendor/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
      'vendor/angular-loading-bar/src/loading-bar.css',
      'vendor/bootstrap-language/languages.css',
      'vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
      'app/common.less',
      'vendor/ladda/dist/ladda-themeless.min.css'
    ],
    fonts: [
      'vendor/components-font-awesome/fonts/*',
      'vendor/bootstrap/dist/fonts/*'
    ],
    assets: [
      'vendor/bootstrap-language/languages.png'
    ],
    locales: [
      'vendor/angular-i18n/angular-locale_bg-bg.js',
      'vendor/angular-i18n/angular-locale_en-en.js',
      'src/app/i18n/jcs-auto-validate_bg.json',
      'src/app/i18n/jcs-auto-validate_en.json'
    ]
  }
};
