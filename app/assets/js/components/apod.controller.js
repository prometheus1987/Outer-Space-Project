(function() {
  "use strict";

  angular
    .module('app')
    .controller('ApodController', ['apodService'],

        function ApodController(apodService) {

            let vm = this;

            vm.retrieveApodData = function() {
                apodService.retrieveData();
            }
        })
})();