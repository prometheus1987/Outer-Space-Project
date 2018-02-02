(function() {
    "use strict";

    angular
        .module('app')
        .controller('ApodCtrl', ['ApodService', apodController]);

    function apodController(apodService) {

        let vm = this;
        vm.loading = false;
        vm.picture = {};
        vm.click = clickHandler;
        apodService.getPhoto().then(successfulResponse, errorResponse);

        function clickHandler() {
            vm.loading = true;
            apodService.getPhoto(vm.date).then(successfulResponse, errorResponse);
        }

        function successfulResponse(res) {
            vm.picture.title = res.data.title;
            vm.picture.hdurl = res.data.hdurl;
            vm.picture.explanation = res.data.explanation;
            vm.loading = false;
        }
        function errorResponse(error) {
            vm.loading = false;
            vm.error = true;
            console.log(error);
        }
    }
})();