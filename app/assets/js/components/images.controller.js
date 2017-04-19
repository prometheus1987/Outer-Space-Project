(function() {
    "use strict";

    angular
        .module('app')
        .controller('ImagesController',

            function get($http) {

                const url = "https://images-api.nasa.gov/";
                const queryParams = "search?q=mars";

                let vm = this;
                // vm.retrieveImages = retrieveImages;

                // $.ajax
                // ({
                //     type: "GET",
                //     url: url + queryParams ,
                //     success: function(result)
                //     {
                //         console.log(result);
                //     }
                // });
                // function retrieveImages() {
                //     $http.get(url + queryParams)
                //         .success(function(result) {
                //             console.log(result);
                //             debugger;
                //         })
                //         .error(function(error){
                //             console.log(error);
                //         });
                // }
            })
})();
