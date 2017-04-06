(function() {
    "use strict";

    angular
        .module('app')
        .controller('RoverController',

    function($http, $stateParams) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

        let vm = this;

        vm.name = $stateParams.rover;
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

        function retrieveRoverData(daysSinceToday) {

            let date = getDate(daysSinceToday);

            let query = date;
            let queryParams = "/photos?earth_date=";

            switch(vm.name) {
              case "spirit":
                query = Math.floor(Math.random() * 2208) + 1 ;
                queryParams = "/photos?sol=";
                break;
              case "curiosity" || "opportunity":
                query = date;
                queryParams = "/photos?earth_date=";
                break;
            }

            $http.get(url + vm.name +  queryParams + query + "&" + key)
                .success(function(result) {
                    vm.data = mapRoverPhotos(result.photos);
                    vm.martianSol = result.photos[0].sol;
                    vm.earthDate = result.photos[0].earth_date;
                    vm.totalPhotos = result.photos[0].rover.total_photos;
                    vm.landingDate = result.photos[0].rover.landing_date;
                    vm.launchDate = result.photos[0].rover.launch_date;
                    vm.status = result.photos[0].rover.status;
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
              abbreviation: photo.camera.name,  
              img: photo.img_src
            }
          });
        }
    });
})();