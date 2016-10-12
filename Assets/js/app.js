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
            .state('about', {
                url: '/about',
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the projects page
            .state('explore', {
                url: '/explore',
                templateUrl : 'pages/explore.html',
                controller  : 'ExploreController'
            })

            // route for the art page
            .state('art', {
                url: '/art',
                templateUrl : 'pages/art.html',
                controller  : 'artController'
            })

            // route for the contact page
            .state('contact', {
                url: '/contact',
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
        });

    // home page controller
    CosmosApp.controller('mainController', function($scope) {
        $scope.message = 'You are transmitting... We are receiving you...';
    });

    // explore controller
    CosmosApp.controller('ExploreController', function($scope) {

        // api call
        var url = "https://api.nasa.gov/planetary/apod?api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        $.ajax({
            url: url,
            success: handleResult
        });
        function handleResult(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            if(result.media_type == "video") {
                $("#apod_img_id").css("display", "none");
                $("#apod_vid_id").attr("src", result.url);
            }
            else {
                $("#apod_vid_id").css("display", "none");
                $("#apod_img_id").attr("src", result.url);
            }
            $("#reqObject").text(url);
            $("#returnObject").text(JSON.stringify(result, null, 4));
            $("#explaination").text(result.explanation);
            $("#title").text(result.title);
        }
    });

    // art controller
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
