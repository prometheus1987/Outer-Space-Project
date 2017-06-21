(function() {
    "use strict";

    angular
        .module('app')
        .controller('SoundsController',

            function($http) {

                let vm = this;

                vm.retrieveSoundsData = retrieveSoundsData;

                function retrieveSoundsData() {
                    $http.get("app/assets/js/sounds.json")
                        .then(function (data) {
                            let response = data.data;
                            vm.sounds = mapSounds(response.results);
                            debugger;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });

            function mapSounds(data) {
                return _.map(data, function(sound) {
                    return {
                        title: sound.title,
                        description: sound.description,
                        tag: sound.tag_list,
                        stream: sound.stream_url,
                        download: sound.download_url
                    }
                })
            }

})();