// configure our routes
CosmosApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/mothership');

    $stateProvider
    // route for the home page
        .state('home', {
            url: '/mothership',
            templateUrl : 'pages/home.html',
        })

        // route for the explore page
        .state('explore', {
            url: '/mothership&explore',
            templateUrl : 'pages/explore.html',
            controller  : 'ExploreController'
        })
        // sine wave state
        .state('explore.sine', {
            url: '/mothership&explore&sine',
            templateUrl : 'pages/explore.sine.html',
            controller : 'ExploreController'
        })
        // apod state
        .state('explore.apod', {
            url: '/mothership&explore&apod',
            templateUrl : 'pages/explore.apod.html',
            controller : 'ExploreController'
        })
        // mars rover state
        .state('explore.rover', {
            url: '/mothership&explore&rover',
            templateUrl : 'pages/explore.mars.html',
            controller : 'MarsController'
        })
        // particle state
        .state('explore.particles', {
            url: '/mothership&explore&particles',
            templateUrl : 'pages/explore.particles.html',
            controller : 'ExploreController'
        })
        // circle state
        .state('explore.circles', {
            url: '/mothership&explore&circles',
            templateUrl: 'pages/explore.circles.html',
            controller: 'ExploreController'
        })

        // route for the art page
        .state('art', {
            url: '/mothership&art',
            templateUrl : 'pages/art.html',
            controller  : 'artController'
        })

        // route for the contact page
        .state('contact', {
            url: '/mothership&contact',
            templateUrl : 'pages/contact.html'
        })
});