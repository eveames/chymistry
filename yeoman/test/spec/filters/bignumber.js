'use strict';

describe('Filter: bigNumber', function () {

  // load the filter's module
  beforeEach(module('chemiatriaApp'));

  // initialize a new instance of the filter before each test
  var bigNumber;
  beforeEach(inject(function ($filter) {
    bigNumber = $filter('bigNumber');
  }));

  it('should return the input prefixed with "bigNumber filter:"', function () {
    var text = 'angularjs';
    expect(bigNumber(text)).toBe('bigNumber filter: ' + text);
  });

});
