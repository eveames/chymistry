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
  .filter('formula', ['$sce', function ($sce) {
    return function (input) {
      //expect input to be in form ABc3-3 or ABc3+3
      var str = String(input);
      str = str.replace(/([\w)\]])(\d)/g, '$1<sub>$2</sub>');
      str = str.replace(/([+])(\d+)/, '<sup>$2$1</sup>');
      str = str.replace(/([-])(\d+)/, '<sup>$2&minus;</sup>');
      str = str.replace(/(<sup>)(1)([+&])/, '$1$3');
      return $sce.trustAsHtml(str);
    };
  }]);
