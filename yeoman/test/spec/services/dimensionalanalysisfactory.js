'use strict';

describe('Service: DimensionalAnalysisFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var DimensionalAnalysisFactory;
  beforeEach(inject(function (_DimensionalAnalysisFactory_) {
    DimensionalAnalysisFactory = _DimensionalAnalysisFactory_;
  }));

  it('should do something', function () {
    expect(!!DimensionalAnalysisFactory).toBe(true);
  });

});
