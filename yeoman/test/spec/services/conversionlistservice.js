'use strict';

describe('Service: ConversionListService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var ConversionListService;
  beforeEach(inject(function (_ConversionListService_) {
    ConversionListService = _ConversionListService_;
  }));

  it('should do something', function () {
    expect(!!ConversionListService).toBe(true);
  });

});
