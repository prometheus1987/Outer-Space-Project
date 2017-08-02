(function() {
  "use strict";

  angular
    .module('app')
    .controller('ApodCtrl', ['ApodService', apodController]);

    function apodController(apodService) {
        let vm = this;

        vm.picture = apodService.getPhoto();

    }
})();