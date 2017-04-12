(function() {
    "use strict";

    angular
        .module('app')
        .controller('SoundsController',

            function($http) {

                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/planetary/sounds?limit=64&";

                let vm = this;

                vm.retrieveSoundsData = retrieveSoundsData;

                function retrieveSoundsData() {
                    $http.get(url + key)
                        .success(function (data) {
                            vm.data = mapSounds(data.results);
                            vm.count = data["count"];
                            console.log(vm.data);
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                }
            });

    function mapSounds(sounds) {
        return _.map(sounds, function(sound) {
            return {
                name: sound.results.description
            }
        });
    }
})();