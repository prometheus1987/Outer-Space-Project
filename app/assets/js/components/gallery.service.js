(function() {
    "use strict";

    angular.module('app')
        .factory('GalleryService', ['$http', galleryService]);

    function galleryService($http) {
        function getPhoto() {
            
            const picture = {};

            $http.get(api)
                .then(successfulResponse, errorResponse);
            debugger;
            return picture;

            function successfulResponse(res) {
                console.log(res);
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