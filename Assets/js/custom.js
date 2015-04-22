// create the module and name it scotchApp
var CosmosApp = angular.module('CosmosApp', ['ngRoute']);

    // configure our routes
    CosmosApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the projects page
            .when('/projects', {
                templateUrl : 'pages/projects.html',
                controller  : 'projectsController'
            })

            // route for the writing page
            .when('/writing', {
                templateUrl : 'pages/writing.html',
                controller  : 'writingController'
            })

            // route for the art page
            .when('/art', {
                templateUrl : 'pages/art.html',
                controller  : 'artController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
        });

        // create the controller and inject Angular's $scope
    CosmosApp.controller('mainController', function($scope) {
        $scope.message = 'You are transmitting... We are receiving you...';
    });

    CosmosApp.controller('aboutController', function($scope) {
        $scope.message = 'A Work in Progress.';
    });

    CosmosApp.controller('projectsController', function($scope) {
        $scope.message = 'Look! I am a projects page.';
    });

    CosmosApp.controller('writingController', function($scope) {
        $scope.message = 'Look! I am a writing page.';
    });

    CosmosApp.controller('artController', function($scope) {
        $scope.message = 'Look! I am an art page.';
    });

    CosmosApp.controller('contactController', function($scope) {
        $scope.message = 'We know where to find you. We will be in touch.';
    });