(function() {
    "use strict";

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);


    $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'app/views/home.html',
      })

      .state('apod', {
          url: '/apod',
          templateUrl: 'app/views/apod.html',
          controller: 'ApodCtrl',
          controllerAs: 'apod'
      })

      .state('images', {
         url: '/images',
         templateUrl: 'app/views/images.html',
         controller: 'ImagesCtrl',
         controllerAs: 'images'
      })

      .state('rover', {
          url: '/rover/:rover',
          templateUrl: 'app/views/rover.html',
          controller: 'RoverCtrl',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })

      .state('orbital', {
        url: '/orbitals',
        templateUrl: 'app/views/orbital.html',
        controller: 'OrbitalCtrl',
        controllerAs: 'orbital'
      })
      
      .state('maps', {
          url: '/maps',
          templateUrl: 'app/views/maps.html',
      })

      .state('maps.lunar', {
          url: '/lunar',
          templateUrl: 'app/views/lunar.html'
      })

      .state('maps.mars', {
          url: '/mars',
          templateUrl: 'app/views/mars-satellite.html'
      })
    });
})();
