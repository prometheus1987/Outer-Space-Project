(function() {
    "use strict";

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'app/views/home.html'
      })

      .state('apod', {
          url: '/apod',
          templateUrl: 'app/views/apod.html',
          controller: 'ApodController',
          controllerAs: 'apod'
      })

      .state('rover', {
          url: '/rover/:rover',
          templateUrl: 'app/views/rover.html',
          controller: 'RoverController',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })

      .state('orbital', {
        url: '/orbitals',
        templateUrl: 'app/views/orbital.html',
        controller: 'OrbitalController',
        controllerAs: 'orbital'
      })
      
      .state('maps', {
          url: '/maps',
          templateUrl: 'app/views/lunar.html',
          controller: 'MapController',
          controllerAs: 'maps'
      })
      
      .state('sounds', {
          url: '/sounds',
          templateUrl: 'app/views/sounds.html',
          controller: 'SoundsController',
          controllerAs: 'sounds'
      })
    });
})();
