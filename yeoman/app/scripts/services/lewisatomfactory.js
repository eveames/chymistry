'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.LewisAtomFactory
 * @description
 * # LewisAtomFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('LewisAtomFactory', ['RandomFactory', 'ElementsListService', 'formulaFilter', function (RandomFactory, ElementsListService, formulaFilter) {
    // initialize general properties
    

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
        dotsArray[8] = [[1,0,1,1,0,1,1,0,1,1,0,1]];

        var max = dotsArray[dots].length;
        var index = RandomFactory.getRandomDigit(max, 0);
        return dotsArray[dots][index];
    };

    return {
      getQuestion : function() {
        var qToReturn = {type: 'LewisAtom', qHint: [], hasImage: true};
        qToReturn.factOrSkill = 'skill';
        qToReturn.qAnswerFormat = 'small-text-box';
        //qToReturn.image = 'images/LewisSingle.html';

        var elementsArray = ElementsListService.getMainGroup();

        //select an element
        var index = RandomFactory.getRandomDigit(elementsArray.length -1, 0);
        var element = elementsArray[index];

        var imageData = {symbol: element.symbol, charge: ''};
        if (element.symbol.length > 1) {imageData.doubleL = true;}
        else {imageData.doubleL = false;}

        //determines whether the structure shown is correct or incorrect
        var yn = Math.floor(Math.random() * 2);
        if (yn) {
            qToReturn.qAnswer = [{alt: 'y', correct: 'correct', message: ''}, {alt: 'n', correct: 'knownWrong', message: ''}];
        }
        else {
            qToReturn.qAnswer = [{alt: 'n', correct: 'correct', message: ''}, {alt: 'y', correct: 'knownWrong', message: ''}];
        }

        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
            var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: ''};
            var answerTemp;
            var yArray = ['y', 'yes', 't', 'true'];
            var nArray = ['n', 'no', 'f', 'false'];
            console.log(yArray.indexOf(givenAnswer.answer.toLowerCase()), nArray.indexOf(givenAnswer.answer.toLowerCase()));
            if (yArray.indexOf(givenAnswer.answer.toLowerCase()) > -1) {answerTemp = 'y';}
            else if (nArray.indexOf(givenAnswer.answer.toLowerCase()) > -1) {answerTemp = 'n';}

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
        console.log('element.charge before which', element.charge, typeof element.charge);
        if (Number(element.charge) !== 0){ which = Math.floor(Math.random() * 2);}
        else {which = 1;}

        var dots;
        // atom Lewis structure
        if (which) {
            if (yn) {dots = elementsArray[index].valence;}
            else {
                dots = RandomFactory.getRandomExclude(8, elementsArray[index].valence);
            }
            qToReturn.qPrompt = element.symbol;
            qToReturn.subtype = 'atom';
            imageData.charge = false;
            console.log('in if which, imageData.charge: ', imageData.charge);
        }

        //ion Lewis structure
        else {
            var trueDots = elementsArray[index].valence - elementsArray[index].charge;
            if (yn) {dots = trueDots;}
            else {
                dots = RandomFactory.getRandomExclude(8, trueDots);
            }
            var tempCharge = element.charge;
            if (tempCharge < 0) {String(tempCharge).replace('-', '&minus;'); } 
            else { tempCharge = '+' + tempCharge; } 
            qToReturn.qPrompt = element.symbol + tempCharge;
            imageData.charge = tempCharge;
            qToReturn.subtype = 'ion';
            console.log('in else which, imageData.charge: ', imageData.charge);
        }

        console.log('dots: ', dots);
        imageData.circ = getDotsArray(dots);

        qToReturn.instructions = 'Enter y or n. For ions, the charge is circled. Do not consider the position of the electrons. ';
        qToReturn.qPrompt = formulaFilter(qToReturn.qPrompt);
        qToReturn.qText = 'Is the Lewis structure shown for ' + qToReturn.qPrompt + ' correct? ';
        qToReturn.qID = 'LewisAtom-' + qToReturn.subtype +'-' + element.symbol;
        qToReturn.image = '/views/LewisSingle.html';
        qToReturn.imageData = imageData;
        console.log('qToReturn.qText: ', qToReturn.qText);
        console.log('qToReturn.imageData.charge', qToReturn.imageData.charge);


      return qToReturn;
      }
    };
  }]);
