'use strict';

describe('Service: IntroElementsFactory', function () {

  // load the service's module
  beforeEach(module('chemiatriaApp'));

  // instantiate service
  var IntroElementsFactory;
  beforeEach(inject(function (_IntroElementsFactory_) {
    IntroElementsFactory = _IntroElementsFactory_;
  }));

  it('should do something', function () {
    expect(!!IntroElementsFactory).toBe(true);
  });

});
