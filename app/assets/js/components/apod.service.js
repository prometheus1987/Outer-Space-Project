(function() {
    "use strict";

    angular.module('app')
        .factory('ApodService', ['$http', apodService]);

        function apodService($http) {

            function getPhoto(dateString) {

                let day = moment(dateString).format("DD");
                let month = moment(dateString).format("MM");
                let year = moment(dateString).format("YYYY");
                let date = year + '-' + month + '-' + day;

                const key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/planetary/apod?date=" + date ;

                return $http.get(url + key);

            }

            return {
                getPhoto: getPhoto
            };

        }

})();