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
          templateUrl: 'app/views/maps/maps.html',
      })

      .state('maps.lunar', {
          url: '/lunar',
          templateUrl: 'app/views/maps/lunar.html'
      })

      .state('maps.mars', {
          url: '/mars',
          templateUrl: 'app/views/maps/mars-satellite.html'
      })
      .state('maps.mars-terrain', {
          url: '/mars-terrain',
          templateUrl: 'app/views/maps/mars-terrain.html'
      })
      .state('maps.mars-curiosity', {
          url: '/mars-curiosity',
          templateUrl: 'app/views/maps/curiosity.html'
      })
      .state('maps.mars-hirise', {
          url: '/mars-hirise',
          templateUrl: 'app/views/maps/hirise-ortho.html'
      })
      .state('maps.hirise-psp', {
          url: '/mars-hirise-psp',
          templateUrl: 'app/views/maps/hirise-psp.html'
      });
    });
})();
