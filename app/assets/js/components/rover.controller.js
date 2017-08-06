(function() {
    "use strict";

    angular
        .module('app')
        .controller('RoverCtrl', ['$http', '$stateParams', roverController]);

    function roverController($http, $stateParams) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

        let vm = this;

        vm.noImages = false;

        vm.name = $stateParams.rover;
        vm.retrieveRoverData = retrieveRoverData;

        function retrieveRoverData() {

            let queryParams = "/photos?sol=";
            let query;

            switch(vm.name) {
              case "spirit":
                query = Math.floor(Math.random() * 2208) + 1;
                break;
              case "curiosity":
                query = Math.floor(Math.random() *  1746) + 1;
                break;
              case "opportunity":
                query = Math.floor(Math.random() *  4648) + 1;
                break;
            }

            $http.get(url + vm.name +  queryParams + query + "&" + key)
                .then(function(result) {
                    let response = result.data.photos;
                    vm.noImages = false;

                    vm.data = mapRoverPhotos(response);
                    vm.martianSol = response[0].sol;
                    vm.earthDate = response[0].earth_date;
                    vm.totalPhotos = response[0].rover.total_photos;
                    vm.landingDate = response[0].rover.landing_date;
                    vm.launchDate = response[0].rover.launch_date;
                    vm.status = response[0].rover.status;
                })
                .catch(function(error){
                    vm.noImages = true;
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
    };
})();