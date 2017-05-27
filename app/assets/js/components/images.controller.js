(function() {
    "use strict";

    angular
        .module('app')
        .controller('ImagesController',

            function($http) {

                const url = "https://images-api.nasa.gov/";
                const queryParams = "search?q=mars";

                let vm = this;

                $http({
                    method: 'GET',
                    url: url,
                    contentType: "application/json;odata=verbose",
                    headers: {"Accept": "application/json;odata=verbose"}
                }).then(function(data) {
                    debugger;
                })
            })
})();
