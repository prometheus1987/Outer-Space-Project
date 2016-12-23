// configure our routes
CosmosApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/mothership');

  $stateProvider
  // route for the home page
      .state('home', {
          url: '/mothership',
          templateUrl : 'app/views/home.html'
      })
      // route for the explore page
      .state('explore', {
          url: '/explore',
          templateUrl : 'app/views/explore.html',
          controller  : 'ExploreController'
      })
      // sine wave state
      .state('explore.sine', {
          url: '&sine',
          templateUrl : 'app/views/explore.sine.html',
          controller : 'ExploreController'
      })
      // apod state
      .state('explore.apod', {
          url: '&apod',
          templateUrl : 'app/views/explore.apod.html',
          controller : 'ExploreController'
      })
      // mars "curiosity" rover state
      .state('explore.mars', {
          url: '&rover&curiosity',
          templateUrl : 'app/views/mars.curiosity.html',
          controller : 'RoverController'
      })
      // mars "opportunity" rover state
      .state('explore.opportunity', {
          url: '&rover&opportunity',
          templateUrl : 'app/views/mars.opportunity.html',
          controller : 'RoverController'
      })

      // particle state
      .state('explore.particles', {
          url: '&particles',
          templateUrl : 'app/views/explore.particles.html',
          controller : 'ExploreController'
      })
      // circle state
      .state('explore.circles', {
          url: '&circles',
          templateUrl: 'app/views/explore.circles.html',
          controller: 'ExploreController'
      })
      // explore sounds state
      .state('explore.sounds', {
          url: '&sounds',
          templateUrl: 'app/views/explore.sounds.html',
          controller: 'ExploreController'
      })
      // route for the art page
      .state('art', {
          url: '/art',
          templateUrl : 'app/views/art.html',
          controller  : 'artController'
      })
      // route for the contact page
      .state('contact', {
          url: '/contact',
          templateUrl : 'app/views/contact.html'
      })
});
