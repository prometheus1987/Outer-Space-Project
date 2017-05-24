(function() {
    "use strict";

    angular
        .module('app')
        .controller('ImagesController',

            function get($http) {

                const url = "https://images-api.nasa.gov/";
                const queryParams = "search";

                let vm = this;
                $.ajax({
                    url: url + queryParams,
                    dataType: "jsonp",
                    jsonpCallback: "logResults"
                });


                debugger;
            })
})();
