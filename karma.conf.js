module.exports = function(config) {
  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'app/assets/js/components/app.module.js',
      'app/assets/js/components/app.routes.js',
      'app/assets/js/components/rover.controller.js',
      'app/assets/js/components/apod.controller.js',
      'app/assets/js/components/orbital.controller.js',
      'spec/rover.spec.js',
      'spec/apod.spec.js',
      'spec/orbital.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      "app/assets/js/components/*.js": ["babel"],
      "spec/*.js": ["babel"]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
};
    