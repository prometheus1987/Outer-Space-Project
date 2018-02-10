// Karma configuration
// Generated on Thu Feb 08 2018 20:28:28 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    basePath: '',


    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './app/dist/libs/angular.js',
        './app/assets/components/app.module.js',
        './app/assets/components/*.js',
        './test/*.js'
    ],


    exclude: [
    ],

    preprocessors: {
        './app/assets/components/*.js': ['babel'],
        './test/*.js': ['babel']
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
