'use strict';

let context = describe;

describe('ApodController', function() {
  let $controller, scope, ApodController;

  beforeEach(module('app'));
  beforeEach(angular.mock.module('ui.router'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    ApodController = $controller('ApodController', {
      $scope: scope});
  }));

  it('should be defined', function() {
    expect(ApodController).toBeDefined();
  });
});

