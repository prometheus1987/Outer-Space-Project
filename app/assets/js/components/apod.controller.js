(function() {
  "use strict";

  angular
    .module('app')
    .controller('ApodController',

      function($http) {

        const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
        const url = "https://api.nasa.gov/planetary/apod?";

        let vm = this;

        vm.retrieveApodData = retrieveApodData;

        function retrieveApodData() {
          $http.get(url + key)
            .then(function (data) {
              vm.title = data.data.title;
              vm.hdurl = data.data.hdurl;
              vm.explanation = data.data.explanation;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
})();