'use strict';

let context = describe;

describe('OrbitalController', function() {
  let $controller, scope, OrbitalController;

  beforeEach(module('app'));
  beforeEach(angular.mock.module('ui.router'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    OrbitalController = $controller('OrbitalController', {
      $scope: scope});
  }));

  it('should be defined', function() {
    expect(OrbitalController).toBeDefined();
  });
});
