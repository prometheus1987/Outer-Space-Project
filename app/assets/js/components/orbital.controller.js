(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalController',

            function retrieveData($http) {

                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-03-09&end_date=2017-03-16&";

                let vm = this;

                vm.retrieveOrbitalData = retrieveOrbitalData;

                function retrieveOrbitalData() {
                    $http.get(url + key)
                        .success(function (data) {
                            vm.data = mapOrbitals(data["near_earth_objects"]["2017-03-09"]);
                            vm.count = data["element_count"];
                            console.log(data["near_earth_objects"]["2017-03-09"]);
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                }
            });

    function mapOrbitals(data) {
        return _.map(data, function(orbital) {
            return {
                name: orbital.name,
                magnitude: orbital.absolute_magnitude_h,
                diameterMin: orbital.estimated_diameter.kilometers.estimated_diameter_min,
                diameterMax: orbital.estimated_diameter.kilometers.estimated_diameter_max

            }
        });
    }
})();