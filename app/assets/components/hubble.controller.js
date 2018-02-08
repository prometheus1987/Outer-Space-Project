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

        vm.name = null;
        vm.description = null;
        vm.imageURL = null;

       // function retrieveID() {
       //      $.ajax
       //      ({
       //          type: "GET",
       //          url: url,
       //          dataType: 'jsonp',
       //          success: function (results) {
       //              vm.id = mapID(results);
       //              function mapID(results) {
       //                  return _.map(results, function (id) {
       //                      return {
       //                          id: id.id
       //                      }
       //                  });
       //              }
       //          }
       //      });
       //  }

        vm.id = 4112;
        $.ajax
        ({
            type: "GET",
            url: "http://webbtelescope.org/api/v3/image/" + vm.id,
            dataType: 'jsonp',
            success: function (results) {
                vm.name = results.name;
                vm.description = results.description;
                vm.imageURL = results.image_files[0].file_url;
                debugger;
            }
        });
    }

})();