describe('Controller: Orbital', function() {

    beforeEach(module('app'));

    var testController;

    beforeEach(inject(function ($controller) {
        scope = {};

        OrbitalController = $controller('OrbitalController', {});

    }));

    it('should be defined', function() {
        expect(testController).toBeDefined();
        // expect(testController.model).toBeDefined();
        // expect(testController.model.name).toEqual("controllerAs vm test");
    });
});