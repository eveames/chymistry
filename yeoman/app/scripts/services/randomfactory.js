'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.RandomFactory
 * @description
 * # RandomFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('RandomFactory', function () {
    // Service logic
    // ...

    //max exclusive, min inclusive
    return {
      getRandomDigit: function(max, min) {
        return Math.floor(Math.random()* (max-min)) + min;
      },
      getRandomString : function(length, zeros) {
        var randomString = '';
        var min, max;
        if (zeros === 0) {
         min = 1;
         max = 10;
        }
        else { 
         min = 0;
         max = 10 + zeros;
        }
        for(var i =0; i < length; i++) {
         var newDigit = this.getRandomDigit(max, min);
         if (newDigit > 9) {newDigit = 0;}
          randomString += newDigit;
        }
        return randomString;
      },
      getRandomExclude: function randNum(max,excludeNum) {
        var randNumber = Math.floor(Math.random() * max);
        if(randNumber === excludeNum) {
          return randNum(max,excludeNum);
        }else{
          return randNumber;
        }
      },
      getRandomNear: function randNum(max,excludeNum, maxSeparation) {
        var randNumber = Math.floor(Math.random() * max);
        if(randNumber === excludeNum) {
          return randNum(max,excludeNum, maxSeparation);
        }
        else if (randNumber - excludeNum > maxSeparation || randNumber - excludeNum < -1 * maxSeparation) {
          return randNum(max,excludeNum, maxSeparation);
        }
        else{
          return randNumber;
        }
      }
    };
  });
