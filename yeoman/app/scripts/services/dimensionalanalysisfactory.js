'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.DimensionalAnalysisFactory
 * @description
 * # DimensionalAnalysisFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('DimensionalAnalysisFactory', ['powerFilter', 'RandomFactory', 'ScientificNotationService', 'bigNumberFilter',
   function (powerFilter, RandomFactory, ScientificNotationService, bigNumberFilter) {
    // Service logic
    // ...
    var zeroString = '000000000000000000000';
    // Public API here
    //subtypes: metricPrefixes, metricConversions
    return {
      getQuestion : function(type, subtype, flags) {
        var qToReturn = {type: type, subtype: subtype, qHint: [], hasImage: false};
        qToReturn.factOrSkill = 'skill';
        qToReturn.qAnswerFormat = 'dimensional-analysis';
        qToReturn.instructions = 'Enter your answer with the abbreviated form of the correct unit. Make sure to include a space before the unit. ' +
          'If you wish to use scientific notation, write "2.43e-2" for 2.43 x ' + powerFilter('10^-2') + '. ' +
          'Be careful not to include any spaces in the scientific notation! If the answer contains multiple units, ' +
          'such as ' +powerFilter('kgm^2/s^2') + ' enter it as "kg m^2 s^-2". Put spaces between each unit, and use negative exponents ' +
          'if a unit is in the denominator. If you are having trouble, use the "railroad tracks" below the answer box ' +
          'to show your work and get better feedback. Put the limiting value in the first column, with units (numerator units ' +
          'on top and denominator units on the bottom), then the conversion factors. Check that the units on top and on the bottom ' +
          'cancel out, then do the calculation by multiplying across the top and dividing by everything along the bottom, and put ' +
          'your answer in the box. ';

        //array holding responses, would depend on context. 
        //first element assumes it was careless error
        //second element provides hint
        
        switch(subtype) {
          case 'metricPrefixes':

            //show table of metric prefixes (maybe depends on flags)
            qToReturn.hasImage = true;
            qToReturn.image = '/views/dataTable.html';
            qToReturn.imageData = [['n', 'nano', powerFilter('10^-9')], ['u', 'micro', powerFilter('10^-6')],['m', 'milli', powerFilter('10^-3')],
              ['c', 'centi', powerFilter('10^-2')],['d', 'deci', powerFilter('10^-1')],['k', 'kilo', powerFilter('10^3')], 
              ['M', 'mega', powerFilter('10^6')], ['G', 'giga', powerFilter('10^9')]];

            var metricBaseUnits = [['m', 'meters'], ['L', 'liters'], ['g', 'grams'], ['s', 'seconds'], ['mol', 'moles'], ['J', 'joules'],['Pa', 'pascals'], ['Hz', 'hertz']];
            var metricPrefixes = [['n', -9, 'nano'], ['u', -6, 'micro'], ['m', -3, 'milli'],['c', -2, 'centi'],['d', -1, 'deci'],
            ['', 0, ''],['k', 3, 'kilo'],['M', 6, 'mega'],['G', 9, 'giga']];

            //choose random unit and 2 random prefixes
            var unit = metricBaseUnits[Math.floor(Math.random() * metricBaseUnits.length)];
            var startIndex = Math.floor(Math.random() * metricPrefixes.length);
            var startPrefix = metricPrefixes[startIndex];
            var endIndex = RandomFactory.getRandomNear(metricPrefixes.length, startIndex, 5);
            var endPrefix = metricPrefixes[endIndex];
            var number, middleDigits, numZeros, zeros;
            qToReturn.qPrompt = startPrefix[0] + unit[0];

            //get initial number (add zeros on reasonable end)

            //if startIndex << endIndex, start number should be very large
            if (startIndex - endIndex < -2 || endIndex > 6 || startIndex < 1) {
              //at least 5 0s on end of number
              number = String(RandomFactory.getRandomDigit(10, 1));
              middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
              number += String(middleDigits);
              if (startIndex - endIndex < -3) {numZeros = RandomFactory.getRandomDigit(9, 4);}
              else {numZeros = RandomFactory.getRandomDigit(6, 2);}
              zeros = zeroString.slice(0, numZeros);
              number += String(zeros);
            }

            //if startIndex >> endIndex, start number should be very small
            else if (startIndex - endIndex > 2 || startIndex > 6 || endIndex < 1) {
              //at least 5 0s at beginning of number
              number = String(RandomFactory.getRandomDigit(10, 1));
              middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
              number += String(middleDigits);
              if (startIndex - endIndex > 3) {numZeros = RandomFactory.getRandomDigit(9, 4);}
              else {numZeros = RandomFactory.getRandomDigit(6, 2);}
              zeros = zeroString.slice(0, numZeros);
              number = '0.' + String(zeros) + number;
            }

            else {
              number = String(RandomFactory.getRandomDigit(10, 1));
              middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
              number += String(middleDigits);
              number *= Math.pow(10, 3 - Math.floor(Math.random() * 7));
            }
            
            var sigFigs = ScientificNotationService.parseNumber(number).sigFigs;
            console.log(Math.pow(10,endPrefix[1] - startPrefix[1]));
            var answer = Number(number) / Math.pow(10,endPrefix[1] - startPrefix[1]);
            answer = answer.toPrecision(sigFigs);
            answer += ' ' + endPrefix[0]  + unit[0];
            console.log(number, typeof number);
            var alt1 = Number(number) * Math.pow(10, endPrefix[1] - startPrefix[1]);
            alt1 = alt1.toPrecision(sigFigs);
            alt1 += ' ' +  endPrefix[0] + unit[0];
            var alt2 = {alt: number + ' ' + qToReturn.qPrompt, correct: 'knownWrong', message: 'You didn\'t convert it! '};

            var answerArray = [{alt: answer, correct: 'correct', message: ''}, 
              {alt: alt1, correct: 'knownWrong', message: 'oops, you went the wrong way! '}, alt2];
            qToReturn.qText = 'Convert ' + bigNumberFilter(number) + ' ' + startPrefix[0] + unit[0] + ' to ' + endPrefix[2] + unit[1];
            
            qToReturn.qID = type + '-' + 'subtype' + '-' + qToReturn.qPrompt + endPrefix[2];
            qToReturn.qHint = [''];
            qToReturn.qBackgroundText = '';
            qToReturn.qAnswer = answerArray;
            //console.log(qToReturn);
            break;
          
          default: 
            qToReturn.subtype = 'not found';
        }

        qToReturn.responseToWrong = ['Try again!', 
        'Answer is ' + qToReturn.qAnswer[0].alt + '. Try a new one!'];
        // check the arrangement of the values in the table
        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
            var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: ''};
            console.log('correctAnswer[0]: ', correctAnswer[0]);
            console.log('correctAnswer[1]: ', correctAnswer[1]);
            var correctArray = ScientificNotationService.parseNumber(correctAnswer[0].alt);
            var altArray = ScientificNotationService.parseNumber(correctAnswer[1].alt);
            console.log('givenAnswer: ', givenAnswer);
            var givenArray = ScientificNotationService.parseNumber(givenAnswer.answer);
            var promptArray = ScientificNotationService.parseNumber(correctAnswer[2].alt);

            if (givenArray.number === correctArray.number) {
                if (givenArray.unitString === correctArray.unitString) {
                  if (givenArray.sigFigs === correctArray.sigFigs) {
                    answerDetailToReturn.correct = 'correct';
                  }
                  else {
                    answerDetailToReturn.correct = 'close';
                    answerDetailToReturn.messageSent = 'Check your sig figs! ';
                  }
                }
                else {
                  answerDetailToReturn.correct = 'close';
                  answerDetailToReturn.messageSent = 'Check your units! ';
                }
            }
            else if (givenArray.number === altArray.number){
                answerDetailToReturn.correct = correctAnswer[1].correct;
                answerDetailToReturn.messageSent = correctAnswer[1].message;
            }
            else if (givenArray.unitString !== correctArray.unitString) {
                answerDetailToReturn.correct = 'knownWrong';
                answerDetailToReturn.messageSent = 'Make sure you convert to the right unit! ';
            }
            //answerDetailToReturn.detail = {};
            else if (givenArray.errors !== '') {
              answerDetailToReturn.correct = 'formatError';
              answerDetailToReturn.messageSent = givenArray.errors;
            }     
            else {
              answerDetailToReturn.correct = 'unknownWrong';
            }

            //check the columns
            if (answerDetailToReturn.correct !== 'correct' && givenAnswer.columns[1].num) {
              var cols = givenAnswer.columns;
              var numNumber = 1;
              var denomNumber = 1;
              var temp;
              var numUnits = [];
              var denomUnits = [];
              var units;
              var toConvert = ScientificNotationService.parseNumber(cols[0].num);

              for (var i = 0; i < cols.length; i++) {
                temp = ScientificNotationService.parseNumber(cols[i].num);
                console.log(temp);
                numNumber *= temp.number;
                numUnits.concat(temp.numUnits);
                denomUnits.concat(temp.denomUnits);
                console.log(numUnits, denomUnits);
                temp = ScientificNotationService.parseNumber(cols[i].denom);
                denomNumber *= temp.number;
                numUnits.concat(temp.denomUnits);
                denomUnits.concat(temp.numUnits);
                console.log(numUnits, denomUnits);
              }
              if (numUnits.length === 0 && denomUnits.length === 0) {
                console.log(numUnits, denomUnits);
                answerDetailToReturn.messageSent += 'Include units in the "Railroad Tracks" so you can make sure they cancel. ';
                units = false;
              }
              var calcAnswer = (numNumber / denomNumber).toPrecision(correctArray.sigFigs);
              console.log(typeof calcAnswer);
              for (i = 0; i < numUnits.length; i++) {
                for (var k = 0; k < denomUnits.length; k++) {
                  if (numUnits[i] === denomUnits[k]) {
                    numUnits.splice(i, 1);
                    denomUnits.splice(k, 1);
                  }
                }
              }
              var unitStringFromRRT = numUnits.join(' ') + ' / ' + denomUnits.join(' ');
              console.log(typeof calcAnswer);
              if (unitStringFromRRT !== correctArray.unitString && units) {
                answerDetailToReturn.messageSent += 'Your units don\'t cancel correctly to get the desired unit. ';
              }
              else if (toConvert.number.toPrecision(Math.max(correctArray.sigFigs - 1,0)) !== promptArray.number.toPrecision(Math.max(correctArray.sigFigs - 1,0))) {
                answerDetailToReturn.messageSent += 'You should start with the value to convert in the first column numerator. ';
              }
              
              else if (calcAnswer !== correctArray.number.toPrecision(correctArray.sigFigs)) {
                answerDetailToReturn.messageSent += 'You seem to have a wrong number in a conversion factor. ';
              }

              else if (calcAnswer.toPrecision(Math.max(correctArray.sigFigs - 1,0)) !== givenArray.number.toPrecision(Math.max(correctArray.sigFigs - 1,0))) {
                answerDetailToReturn.messageSent += 'You seem to have made a calculator error because the answer you gave doesn\'t match your Railroad Tracks';
              }
              
            }

            else if (answerDetailToReturn.messageSent === '' && answerDetailToReturn.correct !== 'correct') {
              answerDetailToReturn.messageSent = 'Sorry, I don\'t recognize your answer. Show your calculation with the "Railroad Tracks" to get better feedback. ';
            }
          return answerDetailToReturn;
        };

      return qToReturn;
      }
    };
  }]);
