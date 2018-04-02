(function() {
    "use strict";

    angular.module('app')
        .controller('HubbleCtrl', ['$http', hubbleController])
    ;

    function hubbleController($http) {
        let vm = this;
        const url = "http://webbtelescope.org/api/v3/images/all?page=1";

        vm.retrieveId = (id) => {
            $.ajax
            ({
                type: "GET",
                url: url,
                dataType: 'jsonp',
                success: function (res) {
                    vm.data = res;
                    console.log(vm.data);
                    vm.id = vm.data.find(id => vm.data.id === id);
                }
            });
            debugger;
        }

        vm.getPhotos = (id) => {
            
            vm.photoId = vm.data.find(photoId => photoId.id === id);
      
            $.ajax
            ({
                type: "GET",
                url: "http://webbtelescope.org/api/v3/image/" + vm.photoId,
                dataType: 'jsonp',
                success: function (res) {
                    let results = res;
                    vm.photos = results;
          
                }
            });
        }
    }
})();