'use strict';

describe('Filter: formulaFilter', function () {

  // load the filter's module
  beforeEach(module('chemiatriaApp'));

  // initialize a new instance of the filter before each test
  var formulaFilter;
  beforeEach(inject(function ($filter) {
    formulaFilter = $filter('formulaFilter');
  }));

  it('should return the input prefixed with "formulaFilter filter:"', function () {
    var text = 'angularjs';
    expect(formulaFilter(text)).toBe('formulaFilter filter: ' + text);
  });

});
