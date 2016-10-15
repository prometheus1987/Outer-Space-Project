var CosmosApp = angular.module('CosmosApp', [
    'ui.router',
    'ngAnimate']);

    // configure our routes
    CosmosApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/mothership');

        $stateProvider
            // route for the home page
            .state('home', {
                url: '/mothership',
                templateUrl : 'app/pages/home.html',
                controller  : 'mainController'
            })

            // route for the explore page
            .state('explore', {
                url: '/mothership&explore',
                templateUrl : 'app/pages/explore.html',
                controller  : 'ExploreController'
            })
            // sine wave state
            .state('explore.sine', {
                url: '&sine',
                templateUrl : 'app/pages/explore.sine.html',
                controller : 'ExploreController'
            })
            // apod state
            .state('explore.apod', {
                url: '&apod',
                templateUrl : 'app/pages/explore.apod.html',
                controller : 'ExploreController'
            })
            // particle state
            .state('explore.particles', {
                url: '&particles',
                templateUrl : 'app/pages/explore.particles.html',
                controller : 'ExploreController'
            })

            // route for the art page
            .state('art', {
                url: '/mothership&art',
                templateUrl : 'app/pages/art.html',
                controller  : 'artController'
            })

            // route for the contact page
            .state('contact', {
                url: '/mothership&contact',
                templateUrl : 'app/pages/contact.html'
            });
        });

    // home page controller
    CosmosApp.controller('mainController', function($scope) {
        $scope.message = 'You are transmitting... We are receiving you...';
    });

    // explore controller
    CosmosApp.controller('ExploreController', function($scope, $http) {

        // load particles JSON
        particlesJS.load('particles-js', 'app/assets/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });

        // api call for nasa apod
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
            {image: 'app/assets/images/Om.jpg', description: 'Om'},
            {image: 'app/assets/images/atalanta.jpg', description: 'Atalanta'},
            {image: 'app/assets/images/founders.jpg', description: 'Founders'}
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
