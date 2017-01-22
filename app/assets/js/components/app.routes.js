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
          controller: 'ExploreController'
      })
      // apod state
      .state('explore.apod', {
          url: '&apod',
          templateUrl: 'app/views/explore.apod.html',
          controller: 'ExploreController',
          controllerAs: 'apod'
      })
      // mars "curiosity" rover state
      .state('explore.curiosity', {
          url: '&rover=curiosity',
          templateUrl: 'app/views/mars.curiosity.html',
          controller: 'ExploreController',
          controllerAs: 'curiosity'
      })
      // mars "opportunity" rover state
      .state('explore.opportunity', {
          url: '&rover=opportunity',
          templateUrl: 'app/views/mars.opportunity.html',
          controller: 'ExploreController',
          controllerAs: 'opportunity'
      })
      // explore sounds state
      .state('explore.sounds', {
          url: '&sounds',
          templateUrl: 'app/views/explore.sounds.html',
          controller: 'ExploreController'
      })
      // route for the contact page
      .state('contact', {
          url: '/contact',
          templateUrl : 'app/views/contact.html'
      });
    });
})();
