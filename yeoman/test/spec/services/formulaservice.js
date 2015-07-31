'use strict';

describe('Service: FormulaService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var FormulaService;
  beforeEach(inject(function (_FormulaService_) {
    FormulaService = _FormulaService_;
  }));

  it('should do something', function () {
    expect(!!FormulaService).toBe(true);
  });

});
