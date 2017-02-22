'use strict';

let context = describe;

describe('RoverController', function() {
  let $controller, scope, RoverController;

  beforeEach(module('app'));
  beforeEach(angular.mock.module('ui.router'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    RoverController = $controller('RoverController', {
      $scope: scope});
  }));

  it('should be defined', function() {
    expect(RoverController).toBeDefined();
  });
});

