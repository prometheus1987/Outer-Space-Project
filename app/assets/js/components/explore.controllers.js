(function() {
    "use strict";

    angular
        .module('app')
        .controller('ExploreController',

    function($http) {

        var vm = this;

        vm.retrieveApodData = retrieveApodData;
        vm.retrieveCuriosityData = retrieveCuriosityData;
        vm.retrieveOpportunityData = retrieveOpportunityData;

        vm.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        vm.apodUrl = "https://api.nasa.gov/planetary/apod?";
        vm.rover = [];
        vm.dateParams = "/photos?earth_date=";
        vm.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

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

        function retrieveApodData() {
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

        function retrieveCuriosityData() {

            vm.rover = "Curiosity";

            $http.get(vm.baseUrl + vm.rover +  vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.curiosityData =_.map(result.photos, function(photo){
                        return {
                            name: photo.camera.full_name,
                            martianSol: photo.sol,
                            earthDate: photo.earth_date,
                            totalPhotos: photo.rover.total_photos,
                            img: photo.img_src
                        }
                    });
                })
                .error(function(error){
                    console.log(error);
                });
        };

        function retrieveOpportunityData() {

            vm.rover = "Opportunity";

            $http.get(vm.baseUrl + vm.rover + vm.dateParams + date + vm.key)
                .success(function(result) {
                    vm.opportunityData =_.map(result.photos, function(photo){
                        return {
                            name: photo.camera.full_name,
                            martianSol: photo.sol,
                            earthDate: photo.earth_date,
                            totalPhotos: photo.rover.total_photos,
                            img: photo.img_src
                        }
                    });
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