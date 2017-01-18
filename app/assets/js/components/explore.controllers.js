(function() {
    "use strict";

    CosmosApp.controller('ExploreController', function($scope, $http) {

        $scope.url = "https://api.nasa.gov/planetary/apod?";
        $scope.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        // api call for nasa apod
        $http.get($scope.url + $scope.key)
            .success(function(data) {
                $scope.title = data.title;
                $scope.hdurl = data.hdurl;
                $scope.explanation = data.explanation;
            })
            .error(function(error){
                console.log(error);
            });

        // calculate date for rover requests
        var today = new Date();
        var opportunityLatest = new Date();

        var day = today.getDate()-1;
        var delayedDay = today.getDate()-6;
        var month = today.getMonth()+1;
        var year = today.getFullYear();

        if(day<10) {
            day='0'+day;
        }
        if(month<10) {
            month='0'+month;
        }
        today = year+ '-' +month+ '-' +day;
        opportunityLatest = year+ '-' +month+ '-' +delayedDay;

        // set variables
        $scope.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        $scope.curiosityRover = ["Curiosity"];
        $scope.opportunityRover = ["Opportunity"];
        $scope.dateParams = "/photos?earth_date=";
        $scope.key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        // request for curiosity
        $http.get($scope.baseUrl + $scope.curiosityRover +  $scope.dateParams + today + $scope.key)
            .success(function(result) {
                $scope.curiosity_photos = result.photos;
            })
            .error(function(error){

            });

        // request for opportunity
        $http.get($scope.baseUrl + $scope.opportunityRover + $scope.dateParams + opportunityLatest + $scope.key)
            .success(function(result) {
                $scope.opportunity_photos = result.photos;
            })
            .error(function(error){

            });
    });
})();