'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.LewisAtomFactory
 * @description
 * # LewisAtomFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('LewisAtomFactory', ['RandomFactory', 'ElementsListService', function (RandomFactory, ElementsListService, subtype, idArray, flags) {
    // initialize general properties
    var selectElements = function (element) {
        return (element.family !== 'post-transition metal' && element.family !== 'coinage metal'
            && element.family !== 'transition metal');
    };

    var getDotsArray = function(dots) {
        var dotsArray = [];
        dotsArray[0] = [[0,0,0,0,0,0,0,0,0,0,0,0]];
        dotsArray[1] = [[0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0]];
        dotsArray[2] = [[0,1,0,0,1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,1,0],
            [0,0,0,0,1,0,0,1,0,0,0,0], [0,0,0,0,1,0,0,0,0,0,1,0], [0,0,0,0,0,0,0,1,0,0,1,0]];
        dotsArray[3] = [[0,1,0,0,1,0,0,1,0,0,0,0],[0,1,0,0,1,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,1,0,0,1,0],[0,0,0,0,1,0,0,1,0,0,1,0]];
        dotsArray[4] = [[0,1,0,0,1,0,0,1,0,0,1,0]];
        dotsArray[5] = [[0,1,0,0,1,0,0,1,0,1,0,1],[0,1,0,0,1,0,1,0,1,0,1,0],[0,1,0,1,0,1,0,1,0,0,1,0],[1,0,1,0,1,0,0,1,0,0,1,0]];
        dotsArray[6] = [[0,1,0,0,1,0,1,0,1,1,0,1],[0,1,0,1,0,1,0,1,0,1,0,1],[0,1,0,1,0,1,1,0,1,0,1,0],
            [1,0,1,0,1,0,0,1,0,1,0,1], [1,0,1,0,1,0,1,0,1,0,1,0], [1,0,1,1,0,1,0,1,0,0,1,0]];
        dotsArray[7] = [[0,1,0,1,0,1,1,0,1,1,0,1],[1,0,1,0,1,0,1,0,1,1,0,1],[1,0,1,1,0,1,0,1,0,1,0,1],[1,0,1,1,0,1,1,0,1,0,1,0]];
        dotsArray[8] = [[1,1,1,1,1,1,1,1,1,1,1,1]];

        var max = dotsArray[dots].length;
        var index = RandomFactory.getRandomDigit(max, 0);
        return dotsArray[dots][index];
    }

    return {
      getQuestion : function(subtype, idArray, flags) {
        var qToReturn = {type: 'LewisAtom', qHint: [], hasImage: true};
        qToReturn.factOrSkill = 'skill';
        qToReturn.qAnswerFormat = 'small-text-box';
        qToReturn.image = 'images/LewisSingle.html';

        var elementsArray = ElementsListService.getElementsArray.filter(selectElements);

        //select an element
        var index = RandomFactory.getRandomDigit(elementsArray.length -1, 0);

        var imageData = {symbol: elementsArray[index].symbol, charge: ''};
        if (elementsArray[index].symbol.length > 1) imageData.doubleL = true;
        else imageData.doubleL = false;

        //determines whether the structure shown is correct or incorrect
        var yn = Math.floor(Math.random() * 2);
        if (yn) {
            qToReturn.qAnswer = [{alt: 'y', correct: 'correct', message: ''}], {alt: 'n', correct: 'knownWrong', message: ''}]};
        }
        else {
            qToReturn.qAnswer = [{alt: 'n', correct: 'correct', message: ''}], {alt: 'y', correct: 'knownWrong', message: ''}]};
        }

        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
            var answerDetailToReturn = {answer: givenAnswer, messageSent: ''};
            var answerTemp;
            var yArray = ['y', 'yes', 't', 'true'];
            var nArray = ['n', 'no', 'f', 'false'];
            console.log(yArray.indexOf(givenAnswer.toLowerCase()), nArray.indexOf(givenAnswer.toLowerCase()));
            if (yArray.indexOf(givenAnswer.toLowerCase()) > -1) answerTemp = 'y';
            else if (nArray.indexOf(givenAnswer.toLowerCase()) > -1) answerTemp = 'n';

            if (answerTemp === correctAnswer[0].alt) {
                answerDetailToReturn.correct = 'correct';
                answerDetailToReturn.messageSent += correctAnswer[0].message;
            }
            else if (answerTemp === correctAnswer[1].alt) {
                answerDetailToReturn.correct = 'knownWrong';
                answerDetailToReturn.messageSent += correctAnswer[1].message;
            }

            else {
                answerDetailToReturn.correct = 'formatError';
                answerDetailToReturn.messageSent = 'Answer y or n. ';
            }     
          return answerDetailToReturn;
        };

        var which;
        if (elementsArray[index].charge != 0) which = Math.floor(Math.random() * 2);
        else which = 0;

        var dots;
        // atom Lewis structure
        if (which) {
            if (yn) dots = elementsArray[index].valence;
            else {
                dots = RandomFactory.getRandomExclude(8, elementsArray[index].valence);
            }
        }

        //ion Lewis structure
        else {
            var trueDots = elementsArray[index].valence - elementsArray[index].charge;
            if (yn) dots = trueDots;
            else {
                dots = RandomFactory.getRandomExclude(8, trueDots);
            }
            var tempCharge = String(elementsArray[index].charge);
            tempCharge.replace("-", "&minus;");
            imageData.charge = tempCharge;
        }

        imageData.circ = getDotsArray(dots);



        qToReturn.instructions = 'Enter y or n. ';
        if (which2) {
                qToReturn.qText = 'Is ' + String(qToReturn.qPrompt) + ' a reasonable charge for ' + element.name + '?';
              }

        

        //array holding responses, would depend on context. 
        //first element assumes it was careless error
        //second element provides hint
        
        

        var zeroString = '000000000000';
        //min inclusive, max exclusive
       

        switch(subtype) {
          case 'noDecimalPlace':
            number = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
            number += String(middleDigits);
            number += String(RandomFactory.getRandomDigit(10, 1));
            qToReturn.qAnswer = number.length;
            numZeros = RandomFactory.getRandomDigit(3, 0);
            zeros = zeroString.slice(0, numZeros);
            number += String(zeros);
            qToReturn.subtype = 'noDecimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['only count zeros in between non-zero digits'];
            qToReturn.qBackgroundText = 'If there is no decimal point, every non-zero digit and every zero between non-zero digits is significant';
            //console.log(qToReturn);
            break;
          case 'decimalPlace':
            number = String(RandomFactory.getRandomDigit(10, 1));
            //console.log(number);
            firstDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 1), 3);
            number += String(firstDigits);
            number += '.';
            //console.log(number);
            afterDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 1), 3);
            number += String(afterDigits);
            //console.log(number);
            qToReturn.qAnswer = firstDigits.length + 1 + afterDigits.length;
            qToReturn.subtype = 'decimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['Zeros at the end count if there\'s a decimal point'];
            qToReturn.qBackgroundText = 'Zeros at the end count if there\'s a decimal point';
            //console.log(qToReturn);
            break;
          case 'allAfterPoint':
            var numZerosBefore = RandomFactory.getRandomDigit(4, 0);
            var zerosBefore = zeroString.slice(0, numZerosBefore);
            var number1 = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = number1 + String(RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3));
            var numZerosAfter = RandomFactory.getRandomDigit(3, 0);
            var zerosAfter = zeroString.slice(0, numZerosAfter);
            number1 = '0.' + String(zerosBefore) + String(middleDigits) + String(zerosAfter);
            qToReturn.qAnswer = middleDigits.length + zerosAfter.length;
            qToReturn.subtype = 'allAfterPoint';
            qToReturn.qText = 'How many significant figures does ' + number1 + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number1;
            qToReturn.qHint = ['Zeros at the end count if there\'s a decimal point'];
            qToReturn.qBackgroundText = 'Zeros at the end count if there\'s a decimal point';
            break;
          case 'decimalPointNoPlaces':
            number = String(RandomFactory.getRandomDigit(10, 1));
            middleDigits = RandomFactory.getRandomString(RandomFactory.getRandomDigit(3, 0), 3);
            number += String(middleDigits);
            number += String(RandomFactory.getRandomDigit(10, 1));
            numZeros = RandomFactory.getRandomDigit(3, 1);
            zeros = zeroString.slice(0, numZeros);
            number += zeros;
            qToReturn.qAnswer = number.length;
            number += '.';
            qToReturn.subtype = 'noDecimalPlace';
            qToReturn.qText = 'How many significant figures does ' + number + ' have?';
            qToReturn.qID = 'SigFigPL-' + subtype +'-' + number;
            qToReturn.qHint = ['If there\'s a decimal point but nothing after it, all the digits are significant.'];
            qToReturn.qBackgroundText = 'If there\'s a decimal point but nothing after it, all the digits are significant.';
            break;
          default: 
            qToReturn.subtype = 'not found';
        }

        qToReturn.responseToWrong = ['Try again!', 
        'Try again, but remember: ' + qToReturn.qHint[0] + '.', 
        'Answer is ' + qToReturn.qAnswer + '. Try a new one!'];

      return qToReturn;
      }
    };
  }]);
