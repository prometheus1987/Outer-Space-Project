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
          templateUrl: '/views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
      })

      .state('apod', {
          url: '/apod',
          templateUrl: '/views/apod.html',
          controller: 'ApodCtrl',
          controllerAs: 'apod'
      })

      .state('images', {
         url: '/images',
         templateUrl: '/views/images.html',
         controller: 'ImagesCtrl',
         controllerAs: 'images'
      })

      .state('rover', {
          url: '/rover/:rover',
          templateUrl: '/views/rover.html',
          controller: 'RoverCtrl',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })

      .state('orbital', {
        url: '/orbitals',
        templateUrl: '/views/orbital.html',
        controller: 'OrbitalCtrl',
        controllerAs: 'orbital'
      })

      .state('hubble', {
          url: '/hubble',
          templateUrl: '/views/hubble.html',
          controller: 'HubbleCtrl',
          controllerAs: 'hubble'
      })
      .state('maps', {
          url: '/maps',
          templateUrl: '/views/maps/maps.html',
      })

      .state('maps.lunar', {
          url: '/lunar',
          templateUrl: '/views/maps/lunar.html'
      })

      .state('maps.mars', {
          url: '/mars',
          templateUrl: '/views/maps/mars-satellite.html'
      })
      .state('maps.mars-terrain', {
          url: '/mars-terrain',
          templateUrl: '/views/maps/mars-terrain.html'
      })
      .state('maps.mars-curiosity', {
          url: '/mars-curiosity',
          templateUrl: '/views/maps/curiosity.html'
      })
      .state('maps.mars-hirise', {
          url: '/mars-hirise',
          templateUrl: '/views/maps/hirise-ortho.html'
      })
      .state('maps.hirise-psp', {
          url: '/mars-hirise-psp',
          templateUrl: '/views/maps/hirise-psp.html'
      });
    });
})();
