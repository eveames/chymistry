'use strict';

describe('Service: ElementsListService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var ElementsListService;
  beforeEach(inject(function (_ElementsListService_) {
    ElementsListService = _ElementsListService_;
  }));

  it('should do something', function () {
    expect(!!ElementsListService).toBe(true);
  });

});
