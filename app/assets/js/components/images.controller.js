(function() {
    "use strict";

    angular.module('app')
        .controller('ImagesController', ['$http', imagesController]);

    function imagesController($http) {

            const url = "http://images-api.nasa.gov/search?q=jupiter";
            let vm = this;


        $http.get(url)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                let results = res.data.collection.items;
                vm.images = mapImages(results);
                console.log(results);
                debugger;
            }

            function errorResponse(error) {
                console.log(error);
            }

        function mapImages(results) {
            return _.map(results, function (image) {
                return {
                    center: image.data[0].center,
                    link: image.links[0].href
                }
            });
        }
    }
})();