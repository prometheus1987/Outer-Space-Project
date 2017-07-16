(function() {
    "use strict";

    angular.module('app')
        .factory('apodService',

        function(http) {

            const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
            const url = "https://api.nasa.gov/planetary/apod?";

            let vm = this;

            let promise = http.get(url + key)
                .then(function (data) {
                    vm.title = data.data.title;
                    vm.hdurl = data.data.hdurl;
                    vm.explanation = data.data.explanation;
                })
                .catch(function (error) {
                    console.log(error);
                });
            return promise;
        });
        return apodService;
})();