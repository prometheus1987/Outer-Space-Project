(function() {
    "use strict";

    angular.module('app')
        .factory('RoverService', ['$http', '$stateParams', roverService]);

    function roverService($http, $stateParams) {

        function queryCameras() {
            return $http.get(__dirname + "/cameras.json");
        }

        function queryRoverData(date, camera) {

            let vm = this;
            vm.name = $stateParams.rover;
            vm.queryRoverData = queryRoverData;

            let query = "/photos?earth_date=" + date;

            vm.loading = true;

            const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
            const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";

            return $http.get(url + vm.name +  query + "&" + key);
        }

        return {
            queryCameras: queryCameras,
            queryRoverData: queryRoverData
        };

    }
})();
