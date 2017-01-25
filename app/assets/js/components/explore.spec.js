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