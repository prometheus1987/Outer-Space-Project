(function() {
    "use strict";

    angular
        .module('app')
        .controller('ApodCtrl', ['ApodService', apodController]);

    function apodController(apodService) {

        let vm = this;
        vm.date = getDate();
        vm.loading = false;
        vm.video = {};
        vm.picture = {};
        vm.click = clickHandler;
        apodService.getPhoto().then(successfulResponse, errorResponse);

        function getDate(dateString) {
            let date = moment();
            let day = moment(dateString).format("Do");
            let month = moment(dateString).format("MMMM");
            let year = moment(dateString).format("YYYY");

            date = month + " " + day + "," + year;
            return date;
        }


        function clickHandler() {
            vm.loading = true;
            vm.picture.show = false;
            vm.video.show = false;
            apodService.getPhoto(vm.date).then(successfulResponse, errorResponse);
        }

        function successfulResponse(res) {
            vm.picture.title = res.data.title;
            vm.picture.explanation = res.data.explanation;
            if (res.data.hdurl) {
                vm.picture.hdurl = res.data.hdurl;
                vm.video.url = null;
                vm.picture.show = true;
            }
            if (res.data.url && !res.data.hdurl) {
                const url = res.data.url.split('/')[4].split('?')[0];
                vm.video.url = url;
                vm.picture.hdurl = null;
                vm.video.show = true;
            }
            vm.loading = false;
        }
        function errorResponse(error) {
            vm.loading = false;
            vm.error = true;
            console.log(error);
        }
    }
})();