'use strict';

/**
 * @ngdoc filter
 * @name chemiatriaApp.filter:formulaFilter
 * @function
 * @description
 * # formulaFilter
 * Filter in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .filter('formulaFilter', function () {
    return function (input) {
      //expect input to be in form ABc3-3 or ABc3+3
      
      input.replace(/\w(\d)/g, '<sub>$1</sub>');
      input.replace(/([+-])(\d+)/, '<sup>$2$1<sup>');
      return 'formulaFilter filter: ' + input;
    };
  });
