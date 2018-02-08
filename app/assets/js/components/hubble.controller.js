(function() {
    "use strict";

    angular.module('app')
        .controller('HubbleCtrl', ['$http', hubbleController])
    ;

    function hubbleController($http) {

        const url = "http://webbtelescope.org/api/v3/images/all?page=1";
        let vm = this;

        vm.noImages = false;
        vm.loading = false;

        vm.page = 1;
        vm.query = "page=" + vm.page;

    
        $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'jsonp',
            success: function(res)
            {
                let id = res.id;
                debugger;
            }
        });

    }
})();