'use strict';

describe('Service: LewisAtomFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var LewisAtomFactory;
  beforeEach(inject(function (_LewisAtomFactory_) {
    LewisAtomFactory = _LewisAtomFactory_;
  }));

  it('should do something', function () {
    expect(!!LewisAtomFactory).toBe(true);
  });

});
