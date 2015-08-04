'use strict';

describe('Service: ScientificNotationService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var ScientificNotationService;
  beforeEach(inject(function (_ScientificNotationService_) {
    ScientificNotationService = _ScientificNotationService_;
  }));

  it('should do something', function () {
    expect(!!ScientificNotationService).toBe(true);
  });

});
