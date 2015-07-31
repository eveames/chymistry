'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.DimensionalAnalysisFactory
 * @description
 * # DimensionalAnalysisFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('DimensionalAnalysisFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
