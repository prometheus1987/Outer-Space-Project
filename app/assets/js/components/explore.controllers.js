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
        vm.retrieveSpiritData = retrieveSpiritData;

        vm.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        vm.apodUrl = "https://api.nasa.gov/planetary/apod?";
        vm.rover = [];
        vm.queryParams = "";
        vm.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        function getCurrentDayMonthYear() {
            var date = new Date();

            var day = date.getDate() - 1;
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            date = year + '-' + month + '-' + day;
            return date;
        }

        function getDelayedDayMonthYear() {
            var date = new Date();

            var day = date.getDate() - 2;
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            date = year + '-' + month + '-' + day;
            return date;
        }

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
        }

        function retrieveSpiritData() {
            
            vm.rover = "Spirit";
            vm.queryParams = '/photos?sol=';
            vm.query = "1";

            $http.get(vm.baseUrl + vm.rover +  vm.queryParams + vm.query + "&" + vm.key)
              .success(function(result) {
                  vm.spiritData =_.map(result.photos, function(photo){
                      return {
                          name: photo.camera.full_name,
                          img: photo.img_src,
                          martianSol:  photo.sol,
                          earthDate: photo.earth_date,
                          totalPhotos: photo.rover.total_photos
                      }
                  });
              })
              .error(function(error){
                  console.log(error);
              });
            
        }

        function retrieveCuriosityData(latestDate, pastDate) {

            var date = latestDate || getCurrentDayMonthYear();
            var previousDate = pastDate || getDelayedDayMonthYear();

            vm.rover = "Curiosity";
            vm.queryParams = "/photos?earth_date=";

            $http.get(vm.baseUrl + vm.rover +  vm.queryParams + date + "&" + vm.key)
                .success(function(result) {
                    vm.curiosityData =_.map(result.photos, function(photo){
                        return {
                            name: photo.camera.full_name,
                            img: photo.img_src,
                            martianSol:  photo.sol,
                            earthDate: photo.earth_date,
                            totalPhotos: photo.rover.total_photos
                        }
                    });
                })
                .error(function(error){
                });
        }

        function retrieveOpportunityData(latestDate, pastDate) {

            var date = latestDate || getCurrentDayMonthYear();
            var  previousDate = pastDate || getDelayedDayMonthYear();

            vm.rover = "Opportunity";
            vm.queryParams = "/photos?earth_date=";

            $http.get(vm.baseUrl + vm.rover + vm.queryParams + date + "&" + vm.key)
                .success(function(result) {
                    vm.opportunityData =_.map(result.photos, function(photo){
                        return {
                            name: photo.camera.full_name,
                            img: photo.img_src,
                            martianSol:  photo.sol,
                            earthDate: photo.earth_date,
                            totalPhotos: photo.rover.total_photos
                        }
                    });
                })
                .error(function(error){
                    // retrieveOpportunityData(previousDate);
                });

        }
    });
})();