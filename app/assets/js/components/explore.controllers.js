(function() {
    "use strict";

    CosmosApp.controller('ExploreController', function($scope, $http) {

        // set variables
        $scope.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
        $scope.apodURL = "https://api.nasa.gov/planetary/apod?";
        $scope.curiosityRover = ["Curiosity"];
        $scope.opportunityRover = ["Opportunity"];
        $scope.dateParams = "/photos?earth_date=";
        $scope.key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

        // calculate date for rover requests
        let today = new Date();

        let day = today.getDate()-1;
        let month = today.getMonth()+1;
        let year = today.getFullYear();

        if(day<10) {
            day='0'+day;
        }
        if(month<10) {
            month='0'+month;
        }
        today = year+ '-' +month+ '-' +day+ '&';

        // api call for nasa apod
        $scope.retrieveApodData = function() {
            $http.get($scope.apodURL + $scope.key)
                .success(function(data) {
                    $scope.title = data.title;
                    $scope.hdurl = data.hdurl;
                    $scope.explanation = data.explanation;
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for curiosity
        $scope.retrieveCuriosityData = function() {
            $http.get($scope.baseUrl + $scope.curiosityRover +  $scope.dateParams + today + $scope.key)
                .success(function(result) {
                    $scope.photos = result.photos;
                    console.log($scope.photos.length);
                })
                .error(function(error){
                    console.log(error);
                });
        };

        // request for opportunity
        $scope.retrieveOpportunityData = function() {

            $scope.delayedDateFlag = true;

            $http.get($scope.baseUrl + $scope.opportunityRover + $scope.dateParams + today + $scope.key)
                .success(function(result) {
                    $scope.photos = result.photos;
                    console.log($scope.photos.length);
                })
                .error(function(error){
                    console.log(error);
                });
        };
    });
})();