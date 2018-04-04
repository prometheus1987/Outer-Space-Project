(function() {
    "use strict";

    angular.module('app')
        .controller('HubbleCtrl', [hubbleController]);

    function hubbleController() {
        let vm = this;
        const url = "http://webbtelescope.org/api/v3/images/all?page=1";

        vm.retrieveId = () => {
            $.ajax
            ({
                type: "GET",
                url: url,
                dataType: 'jsonp',
                success: function (res) {
                    vm.items = mapID(res);
                    console.log(vm.data);
                }
            });
        };

        vm.queryPhotos = (id) => {

            $.ajax
            ({
                type: "GET",
                url: "http://webbtelescope.org/api/v3/image/" + id,
                dataType: 'jsonp',
                success: function (res) {
                    debugger;
                    let images = res;
                    console.log(images);
                    return images;
                }
            });
        };

        function mapID(res) {
            return _.map(res, function (id) {
                return {
                    id: id.id,
                    name: id.name
                }
            });
        }
    }
})();