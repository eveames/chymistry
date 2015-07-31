'use strict';

describe('Service: IonListService', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var IonListService;
  beforeEach(inject(function (_IonListService_) {
    IonListService = _IonListService_;
  }));

  it('should do something', function () {
    expect(!!IonListService).toBe(true);
  });

});
