(function() {
    "use strict";

    angular.module('app')
        .controller('ImagesCtrl', ['$http', imagesController]);

    function imagesController($http) {

        const url = "https://images-api.nasa.gov/search?q=";
        let vm = this;

        vm.search = function() {
            $http.get(url + vm.query)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                let results = res.data.collection.items;
                vm.images = mapImages(results);
            }

            function errorResponse(error) {
                console.log(error);
            }

            function mapImages(results) {
                return _.map(results, function (image) {
                    return {
                        title: image.data[0].title,
                        link: image.links[0].href
                    }
                });
            }
        }
    }
})();