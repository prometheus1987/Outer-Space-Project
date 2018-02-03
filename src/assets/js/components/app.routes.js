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
          templateUrl: 'src/views/home.html',
      })

      .state('apod', {
          url: '/apod',
          templateUrl: 'src/views/apod.html',
          controller: 'ApodCtrl',
          controllerAs: 'apod'
      })

      .state('images', {
         url: '/images',
         templateUrl: 'src/views/images.html',
         controller: 'ImagesCtrl',
         controllerAs: 'images'
      })

      .state('rover', {
          url: '/rover/:rover',
          templateUrl: 'src/views/rover.html',
          controller: 'RoverCtrl',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })

      .state('orbital', {
        url: '/orbitals',
        templateUrl: 'src/views/orbital.html',
        controller: 'OrbitalCtrl',
        controllerAs: 'orbital'
      })
      
      .state('maps', {
          url: '/maps',
          templateUrl: 'src/views/maps/maps.html',
      })

      .state('maps.lunar', {
          url: '/lunar',
          templateUrl: 'src/views/maps/lunar.html'
      })

      .state('maps.mars', {
          url: '/mars',
          templateUrl: 'src/views/maps/mars-satellite.html'
      })
      .state('maps.mars-terrain', {
          url: '/mars-terrain',
          templateUrl: 'src/views/maps/mars-terrain.html'
      })
      .state('maps.mars-curiosity', {
          url: '/mars-curiosity',
          templateUrl: 'src/views/maps/curiosity.html'
      })
      .state('maps.mars-hirise', {
          url: '/mars-hirise',
          templateUrl: 'src/views/maps/hirise-ortho.html'
      })
      .state('maps.hirise-psp', {
          url: '/mars-hirise-psp',
          templateUrl: 'src/views/maps/hirise-psp.html'
      });
    });
})();
