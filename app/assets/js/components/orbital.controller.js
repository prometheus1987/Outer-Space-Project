(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalCtrl', ['$http', orbitalController]);

            function orbitalController($http) {

                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/neo/rest/v1/";

                let vm = this;

                vm.noData = false;
                vm.retrieveOrbitalData = retrieveOrbitalData;

                function retrieveOrbitalData() {
                    function getDate() {
                        let day = moment().format("DD");
                        let month = moment().format("MM");
                        let year = moment().format("YYYY");
                        let date = year + '-' + month + '-' + day;
                        return date;
                    }

                    let date = getDate();
                    let query = "feed?start_date=" + date;

                    $http.get(url + query + "&" + key)
                        .then((data) => {
                            let response = data.data["near_earth_objects"][date];
                            vm.data = mapOrbitals(response);
                            vm.count = data.data["element_count"];
                        })
                        .catch((error) => {
                            vm.noData = true;
                        });
                }

                function mapOrbitals(data) {
                    return _.map(data, function(orbital) {
                        return {
                            name: orbital.name,
                            magnitude: orbital.absolute_magnitude_h,
                            diameterMin: orbital.estimated_diameter.kilometers.estimated_diameter_min,
                            diameterMax: orbital.estimated_diameter.kilometers.estimated_diameter_max,
                            hazardous: orbital.is_potentially_hazardous_asteroid,
                            orbitingBody: orbital.close_approach_data[0].orbiting_body,
                            approachDate: orbital.close_approach_data[0].close_approach_date,
                            distance: orbital.close_approach_data[0].miss_distance.kilometers
                        }
                    });
                }
            }
})();