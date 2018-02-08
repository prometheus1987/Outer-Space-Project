(function() {
    "use strict";

    angular.module('app')
        .factory('OrbitalService', ['$http', orbitalService]);

    function orbitalService($http) {
        let vm = this;
        vm.noData = false;
        vm.retrieveOrbitalData = retrieveOrbitalData;

        function retrieveOrbitalData(dateString) {
            
            let day = moment(dateString).format("DD");
            let month = moment(dateString).format("MM");
            let year = moment(dateString).format("YYYY");
            let date = year + '-' + month + '-' + day;

            const key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
            const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + date;

            return $http.get(url + key);
        }

        return {
            retrieveOrbitalData: retrieveOrbitalData
        };
    }

})();