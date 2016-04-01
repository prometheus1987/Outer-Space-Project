var CosmosApp = angular.module('CosmosApp', [
    'ui.router',
    'ngAnimate'])

    // configure our routes
    CosmosApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            // route for the home page
            .state('/', {
                url: '/',
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .state('/about', {
                url: '/about',
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the projects page
            .state('/projects', {
                url: '/projects',
                templateUrl : 'pages/projects.html',
                controller  : 'projectsController'
            })

            // route for the art page
            .state('/art', {
                url: '/art',
                templateUrl : 'pages/art.html',
                controller  : 'artController'
            })

            // route for the contact page
            .state('/contact', {
                url: '/contact',
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
        });

        // create the controller and inject Angular's $scope
    CosmosApp.controller('mainController', function($scope) {
        $scope.pageClass = 'page-home';
        $scope.message = 'You are transmitting... We are receiving you...';
    });

    CosmosApp.controller('aboutController', function($scope) {
        $scope.pageClass = 'page-about';
    });

    CosmosApp.controller('projectsController', function($scope) {
        $scope.pageClass = 'page-projects';
    });

    CosmosApp.controller('artController', function($scope) {
        $scope.pageClass = 'page-art';
        $scope.message = 'Original Artwork';
        $scope.slides = [
            {image: './Assets/images/Om.jpg', description: 'Om'},
            {image: './Assets/images/atalanta.jpg', description: 'Atalanta'},
            {image: './Assets/images/founders.jpg', description: 'Founders'}
        ];

        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    });

    CosmosApp.controller('contactController', function($scope) {
        $scope.pageClass = 'page-contact';
    });