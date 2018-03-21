(function() {
    "use strict";

    angular.module('app')
        .controller('HomeCtrl', [homeController])
    ;

    function homeController() {

        let vm = this;
        vm.slides = [
            {id: "1", image: '../assets/images/charon.jpg',text: 'Charon'},
            {id: "2", image: '../assets/images/antennae_galaxy.jpg', text: 'Antennae Galaxy'},
            {id: "3", image: '../assets/images/ghostly_glow.jpg', text: 'Ghostly Glow'},
        ];
        vm.myInterval = 5000;
        vm.noWrapSlides = true;
        vm.active = 0;
    }
})();