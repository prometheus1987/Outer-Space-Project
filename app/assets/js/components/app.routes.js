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

      .state('explore', {
          url: '/explore',
          templateUrl: 'app/views/explore.html',
          controller: 'RoverController'
      })

      .state('explore.apod', {
          url: '&apod',
          templateUrl: 'app/views/explore.apod.html',
          controller: 'ApodController',
          controllerAs: 'apod'
      })

      .state('explore.rover', {
          url: '/rover/:rover',
          templateUrl: 'app/views/explore.rover.html',
          controller: 'RoverController',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })
      
      .state('explore.sounds', {
          url: '&sounds',
          templateUrl: 'app/views/explore.sounds.html',
          controller: 'RoverController'
      })

      .state('contact', {
          url: '/contact',
          templateUrl : 'app/views/contact.html'
      });
    });
})();
