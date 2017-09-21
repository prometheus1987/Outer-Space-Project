(function() {
    "use strict";

    angular
        .module('app')
        .controller('GalleryCtrl', ['GalleryService', galleryController]);

    function galleryController(GalleryService) {
        let vm = this;

        vm.picture = GalleryService.getPhoto();



    }
})();