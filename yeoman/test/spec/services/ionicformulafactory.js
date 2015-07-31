'use strict';

describe('Service: IonicFormulaFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var IonicFormulaFactory;
  beforeEach(inject(function (_IonicFormulaFactory_) {
    IonicFormulaFactory = _IonicFormulaFactory_;
  }));

  it('should do something', function () {
    expect(!!IonicFormulaFactory).toBe(true);
  });

});
