'use strict';

/**
 * @ngdoc filter
 * @name chemiatriaApp.filter:bigNumber
 * @function
 * @description
 * # bigNumber
 * Filter in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .filter('bigNumber', function () {
    return function (input) {
    	var str = String(input);
    	var parts = str.split('.');
    	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	return parts.join('.');
      
    };
  });
