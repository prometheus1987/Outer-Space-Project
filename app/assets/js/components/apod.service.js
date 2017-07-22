(function() {
    "use strict";

    angular.module('app')
        .factory('ApodService', ['$http', apodService]);

        function apodService($http) {
            function getPhoto() {
                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/planetary/apod?";
                const picture = {};

                $http.get(url + key)
                    .then(successfulResponse, errorResponse);

                return picture;

                function successfulResponse(res) {
                    picture.title = res.data.title;
                    picture.hdurl = res.data.hdurl;
                    picture.explanation = res.data.explanation;
                }

                function errorResponse(error) {
                    console.log(error);
                }
            }

            return {
                getPhoto: getPhoto
            };
        }

})();