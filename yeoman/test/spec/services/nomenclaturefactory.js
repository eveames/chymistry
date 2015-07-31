'use strict';

describe('Service: NomenclatureFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var NomenclatureFactory;
  beforeEach(inject(function (_NomenclatureFactory_) {
    NomenclatureFactory = _NomenclatureFactory_;
  }));

  it('should do something', function () {
    expect(!!NomenclatureFactory).toBe(true);
  });

});
