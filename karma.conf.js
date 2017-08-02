module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        'dist/libs/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'app/assets/js/components/app.module.js',
        // 'app/assets/js/components/apod.service.js',
        'app/assets/js/components/orbital.controller.js',
        'spec/orbital.spec.js',
        'spec/apodService.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
        'app/assets/js/components/*.js': ['babel'],
        'spec/*.js': ['babel']
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
