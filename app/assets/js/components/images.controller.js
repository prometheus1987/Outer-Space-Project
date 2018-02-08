(function() {
    "use strict";

    angular.module('app')
        .controller('ImagesCtrl', ['$http', '$uibModal', imagesController])
    ;

    function imagesController($http, $uibModal) {

        const url = "https://images-api.nasa.gov/search?q=";
        let vm = this;

        vm.noImages = false;
        vm.loading = false;

        vm.openModal = function(image) {
            $uibModal.open({
                templateUrl: 'app/views/imagesModal.html',
                controller: function ($scope, $uibModalInstance) {
                    let modalVm = this;

                    modalVm.image = image;
                    modalVm.close = function () {
                        $uibModalInstance.close();
                    }
                },
                controllerAs: 'modalCtrl',
            });
        };

        vm.search = () => {
            vm.loading = true;
            $http.get(url + vm.query)
                .then(successfulResponse, errorResponse);

            function successfulResponse(res) {
                let results = res.data.collection.items;
                vm.images = mapImages(results);

                vm.noImages = false;
                vm.loading = false;

                vm.currentPage = 0;
                vm.pageSize = 12;

            }

            function errorResponse(error) {
                vm.noImages = true;
                console.log(error);
            }

            function mapImages(results) {
                return _.map(results, function (image) {
                    return {
                        type: image.data[0].media_type,
                        title: image.data[0].title,
                        description: image.data[0].description,
                        link: image.links && image.links[0].href
                    }
                });
            }
        }
    }
})();