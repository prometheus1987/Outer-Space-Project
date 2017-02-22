(function() {
    "use strict";

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    // route for the home page
      .state('home', {
          url: '/',
          templateUrl: 'app/views/home.html'
      })
      // route for the explore page
      .state('explore', {
          url: '/explore',
          templateUrl: 'app/views/explore.html',
          controller: 'RoverController'
      })
      // apod state
      .state('explore.apod', {
          url: '&apod',
          templateUrl: 'app/views/explore.apod.html',
          controller: 'ApodController',
          controllerAs: 'apod'
      })
      // mars rover state
      .state('explore.rover', {
          url: '/rover/:rover',
          templateUrl: 'app/views/mars.rover.html',
          controller: 'RoverController',
          controllerAs: 'rover',
          params: {
            rover: 'curiosity'
          }
      })
      // explore sounds state
      .state('explore.sounds', {
          url: '&sounds',
          templateUrl: 'app/views/explore.sounds.html',
          controller: 'RoverController'
      })
      // route for the contact page
      .state('contact', {
          url: '/contact',
          templateUrl : 'app/views/contact.html'
      });
    });
})();
