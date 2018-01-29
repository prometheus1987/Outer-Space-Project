(function() {
    "use strict";

    angular.module('app')
        .factory('ApodService', ['$http', apodService]);

        function apodService($http) {

            let day = moment().format("DD");
            let month = moment().format("MM");
            let year = moment().format("YYYY");
            let date = year + '-' + month + '-' + day;

            function getPhoto() {

                const key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/planetary/apod?date=" + date ;
                const picture = {};

                debugger;

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