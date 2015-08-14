'use strict';

/**
 * @ngdoc filter
 * @name chemiatriaApp.filter:power
 * @function
 * @description
 * # power
 * Filter in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .filter('power', ['$sce', function ($sce) {
    return function (input) {
      var str = String(input);
      str = str.replace(/(\^)([-]?\d+)/g, '<sup>$2</sup>');
      str = str.replace(/(\^\+)(\d)/g, '<sup>$2</sup>');
      
      return $sce.trustAsHtml(str);
    };
  }]);
