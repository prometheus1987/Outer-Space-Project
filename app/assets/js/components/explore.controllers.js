(function() {
    "use strict";

    angular
        .module('app')
        .controller('ExploreController',

    function($http, $stateParams) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        const apodUrl = "https://api.nasa.gov/planetary/apod?";

        let vm = this;

        vm.name = $stateParams.rover;
        vm.retrieveApodData = retrieveApodData;
        vm.retrieveRoverData = retrieveRoverData;

        function getDate(daysSinceToday) {
            let date = new Date();

            let day = date.getDate() - daysSinceToday;
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

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
            $http.get(apodUrl + key)
                .success(function(data) {
                    vm.title = data.title;
                    vm.hdurl = data.hdurl;
                    vm.explanation = data.explanation;
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function retrieveRoverData() {

            let daysSinceToday = 1;
            let date = getDate(daysSinceToday);

            // Defaults for Curiosity and Opportunity
            let query = date;
            let queryParams = "/photos?earth_date=";

            switch(vm.name) {
              case "spirit":
                query = "1";
                queryParams = "/photos?sol=";
                vm.launchDate = "2003-06-10";
                vm.landingDate = "2004-01-04";
                break;
              case "curiosity":
                vm.launchDate = "2011-11-26";
                vm.landingDate = "2012-08-06";
                break;
              case "opportunity":
                vm.launchDate = "2003-07-07";
                vm.landingDate = "2004-01-25";
                break;
            }

            $http.get(baseUrl + vm.name +  queryParams + query + "&" + key)
                .success(function(result) {
                    vm.data = mapRoverPhotos(result.photos);
                    vm.martianSol = result.photos[0].sol;
                    vm.earthDate = result.photos[0].earth_date;
                    vm.totalPhotos = result.photos[0].rover.total_photos;
                })
                .error(function(error){
                  daysSinceToday += 1;
                  if (daysSinceToday > 7 || vm.name === "Spirit") {
                    console.error('NO ROVER IMAGES FOUND');
                  } else {
                    retrieveRoverData(daysSinceToday);
                  }
                });
        }

        function mapRoverPhotos(photos) {
          return _.map(photos, function(photo){
            return {
              name: photo.camera.full_name,
              img: photo.img_src
            }
          });
        }
    });
})();