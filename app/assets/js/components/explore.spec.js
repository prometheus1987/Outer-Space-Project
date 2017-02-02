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
  var ExploreController, $scope;

  beforeEach(module('app'));
  beforeEach(inject(function(_$q_, _$controller_) {
    $q = _$q_;
    // $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    ExploreController = $controller('ExploreController', {$scope});
  }));

  var vm = this;
  // var $httpBackend;
  vm.url = "https://api.nasa.gov/planetary/apod?api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
  vm.responseSuccess =
    {
      "date": "Today's Date",
      "explanation": "A super awesome explanation of the picture.",
      "hdurl": "An awesome image",
      "title": "Dark Side of the Moon",
    };

  it('should demonstrate using when (200 status)', inject(function($http) {

    $http.get(url)
      .success(function(response) {
        valid = true;
        response = responseSuccess;
      })
      .error(function(err) {
        vm.valid = false;
      });

    // $httpBackend
    //   .when('GET', vm.url)
    //   .respond(200);

    // $httpBackend.flush();

    expect(ExploreController.valid).toBe(true);
    expect(ExploreController.response).toEqual(200);

  }));
});

