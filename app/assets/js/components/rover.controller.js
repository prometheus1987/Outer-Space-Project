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
        vm.loading = false;
        vm.isRendered = false;

        vm.name = $stateParams.rover;
        vm.retrieveRoverData = retrieveRoverData;
        let dateString;

        function getDate(dateString) {

            let date = moment();
            let day = moment(dateString).format("DD");
            let month = moment(dateString).format("MM");
            let year = moment(dateString).format("YYYY");

            date = year + '-' + month + '-' + day;
            return date;
        }

        function retrieveRoverData(date) {

            let query = getDate(date);
            let queryParams = "/photos?earth_date=";
            vm.loading = true;

            // switch(vm.name) {
            //   case "spirit":
            //     queryParams = "/photos?sol=";
            //     query = Math.floor(Math.random() * 2208) + 1;
            //     break;
            // }

            $http.get(url + vm.name +  queryParams + query + "&" + key)
                .then((result) => {

                    vm.loading = false;
                    vm.isRendered = true;
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
                .catch((error) =>{
                    console.log(error);
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
    }
})();