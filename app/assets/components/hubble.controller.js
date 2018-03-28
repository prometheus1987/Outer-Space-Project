(function() {
    "use strict";

    angular.module('app')
        .controller('HubbleCtrl', ['$http', hubbleController])
    ;

    function hubbleController($http) {
        let vm = this;

        const url = "http://webbtelescope.org/api/v3/images/all?page=1";

        vm.noImages = false;
        vm.loading = false;

       vm.retrieveId = () => {
            $.ajax
            ({
                type: "GET",
                url: url,
                dataType: 'jsonp',
                success: function (res) {
                    vm.data = res;
                    console.log(vm.data);
                
                }
            });
        }

        vm.getPhotos = () => {
        
            vm.photoId = vm.data.find(photoId => data.id === id);
            $.ajax
            ({
                type: "GET",
                url: "http://webbtelescope.org/api/v3/image/" + id,
                dataType: 'jsonp',
                success: function (res) {
                    let results = res;
                    vm.photos = results;
                    debugger;
                }
            });
        }
    }
})();