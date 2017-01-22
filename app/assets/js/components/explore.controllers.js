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
        vm.asteroidUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse?";
        vm.rover = [];
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
        vm.retrieveApodData = function() {
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
        vm.retrieveCuriosityData = function() {

            vm.rover = "Curiosity";

            $http.get(vm.baseUrl + vm.rover +  vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.data = result.photos;
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for opportunity data
        vm.retrieveOpportunityData = function() {

            vm.rover = "Opportunity";

            $http.get(vm.baseUrl + vm.rover + vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.photos = result.photos;
                })
                .error(function(error){
                    console.log(error);
                });
                angular.forEach(vm.photos, function() {
                    console.log(vm.photos);
                })
        };
    });
})();