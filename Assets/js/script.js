// create the module and name it scotchApp
var CosmosApp = angular.module('CosmosApp', []);

// create the controller and inject Angular's $scope
CosmosApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Hello World!';
});