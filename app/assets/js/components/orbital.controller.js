(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalCtrl', ['OrbitalService', orbitalController]);

            function orbitalController(orbitalService) {

                let vm = this;
                vm.loading = false;
                vm.orbitalData = {};
                vm.click = clickHandler;

                let day = moment().format("DD");
                let month = moment().format("MM");
                let year = moment().format("YYYY");
                let date = year + '-' + month + '-' + day;

                orbitalService.retrieveOrbitalData().then(successfulResponse, errorResponse);

                function clickHandler() {
                    vm.loading = true;
                    orbitalService.retrieveOrbitalData(vm.date).then(successfulResponse, errorResponse);
                    debugger;
                }

                function successfulResponse(res) {
                    let response = res.data["near_earth_objects"][date];
                    vm.data = mapOrbitals(response);
                    vm.count = res.data["element_count"];
                    debugger;   
                }

                function errorResponse(error) {
                    vm.loading = false;
                    vm.error = true;
                    console.log(error);
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