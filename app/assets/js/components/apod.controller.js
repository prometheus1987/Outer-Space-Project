(function() {
  "use strict";

  angular
    .module('app')
    .controller('ApodController',

    function(apodService) {
        apodService.async().then(function (promise) {
            console.log(promise);
        })
    });


})();