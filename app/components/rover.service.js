(function() {
    "use strict";

    angular.module('app')
        .factory('RoverService', ['$http', '$stateParams', roverService]);

    function roverService($http, $stateParams) {

        function retrieveRoverData(query) {

            let vm = this;
            vm.name = $stateParams.rover;
            vm.retrieveRoverData = retrieveRoverData;

            let queryParams = "/photos?earth_date=";

            vm.loading = true;

            const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
            const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

            return $http.get(url + vm.name +  queryParams + query + "&" + key);
        }

        return {
            retrieveRoverData: retrieveRoverData
        };

    }
})();
