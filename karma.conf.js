module.exports = function(config) {
  config.set({
    basePath: 'C:/Users/HackerOne/src/Digital-Cosmos',
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/public/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/assets/js/components/app.module.js',
      'app/assets/js/components/explore.controllers.js',
      'app/assets/js/components/app.routes.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
};
    