(function() {
    "use strict";

    // explore controller
    CosmosApp.controller('ExploreController', function($scope, $http) {

      // load particles JSON
      particlesJS.load('particles-js', 'app/assets/particles.json', function() {
          console.log('callback - particles.js config loaded');
      });

      $scope.url = "https://api.nasa.gov/planetary/apod?";
      $scope.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

      // api call for nasa apod
      $http.get($scope.url + $scope.key)
          .success(function(data) {
              $scope.title = data.title;
              $scope.hdurl = data.hdurl;
              $scope.explanation = data.explanation;
          })
          .error(function(error){
              console.log(error);
          });
    });

    CosmosApp.controller('RoverController', function($scope, $http) {

        // calculate date
        let today = new Date();
        let dd = today.getDate()-2;
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = yyyy+ '-' +mm+ '-' +dd;

        // set variables
        $scope.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        $scope.curiosity_rover = ["Curiosity"];
        $scope.opportunity_rover = ["Opportunity"];
        $scope.date_params = "/photos?earth_date=" + today;
        $scope.key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        // request for curiosity
        $http.get($scope.baseUrl + $scope.curiosity_rover +  $scope.date_params + $scope.key)
            .success(function(result) {
                $scope.curiosity_photos = result.photos;
            })
            .error(function(error){
                console.log(error);
            });

        // request for opportunity
        $http.get($scope.baseUrl + $scope.opportunity_rover + $scope.date_params + $scope.key)
            .success(function(result) {
                $scope.opportunity_photos = result.photos;
                console.log($scope.opportunity_photos.length)
            })
            .error(function(error){
                console.log(error);
            });
    });

    // art controller
    CosmosApp.controller('artController', function($scope) {
      $scope.message = 'Original Artwork';
      $scope.slides = [{
          image: 'app/assets/images/Om.jpg',
          description: 'Om'
      }, {
          image: 'app/assets/images/atalanta.jpg',
          description: 'Atalanta'
      }, {
          image: 'app/assets/images/founders.jpg',
          description: 'Founders'
      }];

      $scope.currentIndex = 0;
      $scope.setCurrentSlideIndex = function(index) {
          $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function(index) {
          return $scope.currentIndex === index;
      };

      $scope.prevSlide = function() {
          $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
      };

      $scope.nextSlide = function() {
          $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
      };
    });
})();