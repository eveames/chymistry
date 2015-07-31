'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.NomenclatureFactory
 * @description
 * # NomenclatureFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('NomenclatureFactory', ['QIDService', 'IonListService', 'formulaFilter', function (QIDService, IonListService, formulaFilter) {
    // Service logic
    // ...
    // Public API here
    return {
      
      getQuestion : function(type_id, type, subtype, idArray) {
        
        var qToReturn = {type: type, hasImage: false, qHint: ['Sorry, no hints yet. Enter 0 to see the answer and move on.']};
        qToReturn.factOrSkill = 'fact';
        var formulaEx = formulaFilter('O2-1');
        qToReturn.instructions = 'If you don\'t know the answer, enter 0 (zero). ' +
            'The answer will be displayed, and you\'ll see it again soon. ' +
            'Answers are case-sensitive. Use all lower-case for names and correct capitalization for formulas. ' +
            'To enter a formula, type it as you would write it. If there is a charge, put the +/- before the number, ' +
            'such as superoxide ('+formulaEx + '): "O2-1". You\'ll see your answer with formatting in the box. ';
        var idParseArray = QIDService.parseID(idArray[0]);
        //var name = idParseArray[2];
        var answerArray = [];
        qToReturn.qID = idArray[0];

        var which = Math.floor(Math.random() * 2);

        //console.log('in vocabFactory:', idParseArray);
        var entry = IonListService.getEntry(idParseArray[4], idParseArray[3]);
        //if (word !== entry.word) {console.log('index does not match word');}
        var i, answerObj;
        // give name, ask for formula
        if (which) {
          qToReturn.qPrompt = entry.name;
          qToReturn.qText = 'Give the formula of ' + qToReturn.qPrompt + ':';
          answerArray[0] = {alt: entry.formula, correct: 'correct', message: ''};
          qToReturn.qAnswerFormat = 'formula-box';
          if (typeof entry.alts === 'object' && entry.alts.length > 0) {
            for (i = 0; i < entry.alts.length; i++) {
              answerObj = {alt: entry.alts[i].formula, correct: entry.alts[i].correct};
              if (entry.alts[i].correct === 'close') {
                answerObj.message = 'Careful! That\'s ' + entry.alts[i].name + '.';
              }
              answerArray.push(answerObj);
            }
          }
        } 

        //give formula, ask for name
        else {
          qToReturn.qPrompt = formulaFilter(entry.formula);
          qToReturn.qText = 'Give the name of ' + qToReturn.qPrompt + ':';
          answerArray[0] = {alt: entry.name, correct: 'correct', message: ''};
          qToReturn.qAnswerFormat = 'small-text-box';
          if (typeof entry.alts === 'object' && entry.alts.length > 0) {
            for (i = 0; i < entry.alts.length; i++) {
              answerObj = {alt: entry.alts[i].name, correct: entry.alts[i].correct};
              if (entry.alts[i].correct === 'close') {
                answerObj.message = 'Careful! That\'s ' + entry.alts[i].formula + '.';
              }
              answerArray.push(answerObj);
            }
          }
        }
        qToReturn.qAnswer = answerArray;
        qToReturn.responseToWrong = ['Try again: ', 
        'Answer to "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

        // correctAnswer is an array containing prompt and certain alternates
        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
          var answerDetailToReturn = {answer: givenAnswer, messageSent: '', correct: ''};
          //console.log('correct is: ', correctAnswer);
          //console.log('correct length: ', correctAnswer.length);
          //console.log('given is: ', givenAnswer);

          //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
          //check for no answer
          if (!givenAnswer) {
            answerDetailToReturn.correct = 'noAnswer';
            answerDetailToReturn.messageSent = 'If you don\'t know the answer, enter zero. ';
          }
          else if (Number(givenAnswer) === 0) {
            answerDetailToReturn.correct = 'dontKnow';
          }
          else {
            for (var i = 0; i < correctAnswer.length ; i++){
              //console.log('i is ', i);
              if (givenAnswer === correctAnswer[i].alt) {
                answerDetailToReturn.correct = correctAnswer[i].correct;
                if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                break;
              }
              else if (givenAnswer.toLowerCase() === correctAnswer[i].alt.toLowerCase()) {
                if (correctAnswer[i].correct === 'correct') {
                  answerDetailToReturn.correct = 'formatError';
                  answerDetailToReturn.messageSent = 'Almost there, please check your capitalization. ';
                  break;
                } 
              }
            }
            if (!answerDetailToReturn.correct) {
              answerDetailToReturn.correct = 'unknownWrong';
              answerDetailToReturn.messageSent = 'I don\'t recognize your answer. Type carefully! ';
            }
          }

          //console.log(answerDetailToReturn.detail);
          return answerDetailToReturn;
        };

      return qToReturn;
      }
    };
  }]);
