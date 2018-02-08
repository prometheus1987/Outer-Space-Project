(function() {
    "use strict";

    angular.module('app')
        .controller('HomeCtrl', [homeController])
    ;

    function homeController() {

        let vm = this;
        vm.slides = [
            {id: "1", image: 'app/assets/images/charon.jpg',text: 'Charon'},
            {id: "2", image: 'app/assets/images/antennae_galaxy.jpg', text: 'Antennae Galaxy'},
        ];
        vm.myInterval = 5000;
        vm.noWrapSlides = true;
        vm.active = 0;
    }
})();