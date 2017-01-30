describe('ExploreController', function() {
  var $controller, $scope, ExploreController;

  beforeEach(module('app'));
  beforeEach(angular.mock.module('ngAnimate'));
  beforeEach(angular.mock.module('ui.router'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    ExploreController = $controller('ExploreController', {$scope});
  }));

  it('should be defined', function() {
    expect(ExploreController).toBeDefined();
  });
});

describe('APOD Request', function() {

  var $httpBackend;
  var url = "https://api.nasa.gov/planetary/apod?";

  var responseSuccess =
  {
    "date": "Today's Date",
    "explanation": "A super awesome explanation of the picture.",
    "hdurl": "An awesome image",
    "title": "Dark Side of the Moon",
  };

  beforeEach(module('app'));

  beforeEach(inject(function(_$q_, _$httpBackend_) {
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  it('should demonstrate using when (200 status)', inject(function($http) {

    $http.get(url)
      .success(function(data) {
        $scope.valid = true;
        $scope.response = data;
      })
      .error(function(data, status, headers, config) {
        $scope.valid = false;
      });

    $httpBackend
      .when('GET', 'http://localhost/foo')
      .respond(200, { foo: 'bar' });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({ foo: 'bar' });

  }));
});

