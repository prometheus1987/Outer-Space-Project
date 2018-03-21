(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalCtrl', ['OrbitalService', orbitalController]);

            function orbitalController(orbitalService) {

                let vm = this;
                vm.orbital = {};

                orbitalService.retrieveOrbitalData().then(successfulResponse);

                let day = moment().format("DD");
                let month = moment().format("MM");
                let year = moment().format("YYYY");
                let date = year + '-' + month + '-' + day;

                function successfulResponse(res) {
                    let response = res.data["near_earth_objects"][date];
                    vm.orbital = mapOrbitals(response);
                    vm.count = res.data["element_count"];
                }

                function mapOrbitals(res) {
                    return _.map(res, function(orbital) {
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