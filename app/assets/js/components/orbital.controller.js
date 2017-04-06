(function() {
  "use strict";

  angular
    .module('app')
    .controller('OrbitalController',

      function($http) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-03-09&end_date=2017-03-16&";

        let vm = this;

        vm.retrieveOrbitalData = retrieveOrbitalData;

        function retrieveOrbitalData() {
          $http.get(url + key)
            .success(function (data) {
              console.log(data["near_earth_objects"]["2017-03-09"][0]);
            })
            .error(function (error) {
              console.log(error);
            });
        }
      })
})();