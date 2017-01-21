(function() {
    "use strict";

    angular
        .module('app')
        .controller('ExploreController',

    function($scope, $http) {

        // set variables
        var vm = this;

        vm.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        vm.apodUrl = "https://api.nasa.gov/planetary/apod?";
        $scope.asteroidUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse?";
        vm.curiosityRover = ["Curiosity"];
        vm.opportunityRover = ["Opportunity"];
        vm.dateParams = "/photos?earth_date=";
        vm.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

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
            $http.get(vm.apodUrl + vm.key)
                .success(function(data) {
                    vm.title = data.title;
                    vm.hdurl = data.hdurl;
                    vm.explanation = data.explanation;
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for curiosity data
        $scope.retrieveCuriosityData = function() {
            $http.get(vm.baseUrl + vm.curiosityRover +  vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.photos = result.photos;
                    console.log(vm.photos.length);
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for opportunity data
        $scope.retrieveOpportunityData = function() {
            $http.get(vm.baseUrl + vm.opportunityRover + vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.photos = result.photos;
                    console.log(vm.photos.length);
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