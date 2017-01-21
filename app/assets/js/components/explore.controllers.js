(function() {
    "use strict";

    CosmosApp.controller('ExploreController', function($scope, $http) {

        // set variables
        $scope.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        $scope.apodUrl = "https://api.nasa.gov/planetary/apod?";
        $scope.asteroidUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse?";
        $scope.curiosityRover = ["Curiosity"];
        $scope.opportunityRover = ["Opportunity"];
        $scope.dateParams = "/photos?earth_date=";
        $scope.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        // calculate date for rover requests
        let date = new Date();

        let day = date.getDate()-1;
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        if(day<10) {
            day='0'+day;
        }
        if(month<10) {
            month='0'+month;
        }
        date = year+ '-' +month+ '-' +day+ '&';

        // api call for nasa APOD data
        $scope.retrieveApodData = function() {
            $http.get($scope.apodUrl + $scope.key)
                .success(function(data) {
                    $scope.title = data.title;
                    $scope.hdurl = data.hdurl;
                    $scope.explanation = data.explanation;
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for curiosity data
        $scope.retrieveCuriosityData = function() {
            $http.get($scope.baseUrl + $scope.curiosityRover +  $scope.dateParams + date + $scope.key)
                .success(function(result) {
                    $scope.photos = result.photos;
                    console.log($scope.photos.length);
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for opportunity data
        $scope.retrieveOpportunityData = function() {
            $http.get($scope.baseUrl + $scope.opportunityRover + $scope.dateParams + date + $scope.key)
                .success(function(result) {
                    $scope.photos = result.photos;
                    console.log($scope.photos.length);
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for asteroid data
        $scope.retrieveAsteroidData = function() {
            $http.get($scope.asteroidUrl + $scope.key)
              .success(function(result) {
                  $scope.data = result.near_earth_objects;
                  console.log(result.near_earth_objects);
              })
        }
    });
})();