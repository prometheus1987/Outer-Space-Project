(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalCtrl', ['$http', orbitalController]);

            function orbitalController($http) {

                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/neo/rest/v1/";

                let vm = this;

                vm.retrieveOrbitalData = retrieveOrbitalData;

                function getDate(daysSinceToday) {
                    let day = moment().format("DD");
                    let month = moment().format("MM");
                    let year = moment().format("YYYY");
                    let date = year + '-' + month + '-' + day;
                    return date;
                }

                function retrieveOrbitalData(daysSinceToday) {

                    let date = getDate(daysSinceToday);
                    let query = "feed?start_date=";

                    $http.get(url + query + date + "&" + key)
                        .then(function(data) {
                            let response = data.data["near_earth_objects"][date];
                            vm.data = mapOrbitals(response);
                            vm.count = data.data["element_count"];
                        })
                        .catch(function (error) {
                            daysSinceToday += 1;
                            if (daysSinceToday > 7) {
                                console.error(error);
                            } else {
                                retrieveOrbitalData(daysSinceToday);
                            }
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