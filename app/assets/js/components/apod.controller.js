(function() {
  "use strict";

  angular
    .module('app')
    .controller('ApodController',

      function($http) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const apodUrl = "https://api.nasa.gov/planetary/apod?";

        let vm = this;

        vm.retrieveApodData = retrieveApodData;

        function retrieveApodData() {
          $http.get(apodUrl + key)
            .success(function (data) {
              vm.title = data.title;
              vm.hdurl = data.hdurl;
              vm.explanation = data.explanation;
            })
            .error(function (error) {
              console.log(error);
            });
        }
      })
})();