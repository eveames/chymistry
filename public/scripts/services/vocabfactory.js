'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.VocabFactory
 * @description
 * # VocabFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('VocabFactory', ['QIDService', 'VocabListService', function (QIDService, VocabListService) {
    // Service logic
    // ...

    //subtypes; enter the word; multiple choice from random set of prompts; 
    //identify as example of: multiple choice from random group of words in similar group

    
    

    return {
      //returns an array of qID that includes fields starting at position 2 in qID (no type, subtype)
      // use flags to control prompts
      getQuestion : function(type_id, type, subtype, idArray, flags) {
        //get type name from VocabListService

        var qToReturn = {type: type, hasImage: false, qHint: ['Sorry, no hints for vocab yet. Enter 0 to see the answer and move on.']};
        qToReturn.factOrSkill = 'fact';
        qToReturn.instructions = 'If you don\'t know the answer, enter 0 (zero). ' +
            'The answer will be displayed, and you\'ll see it again soon. ' +
            'Answers are case-sensitive. Use all lower-case unless there is a proper name. ';
        var idParseArray = QIDService.parseID(idArray[0]);
        var word = idParseArray[2];
        //console.log('in vocabFactory:', idParseArray);
        var entry = VocabListService.getEntry(type_id, idParseArray[3]);
        if (word !== entry.word) {console.log('index does not match word');}

        //for vocab, correctAnswer is an array containing prompt and certain alternates
        qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
          var answerDetailToReturn = {answer: givenAnswer, messageSent: '', correct: ''};
          //console.log('correct is: ', correctAnswer);
          //console.log('correct length: ', correctAnswer.length);
          //console.log('given is: ', givenAnswer);

          //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
          //check for no answer
          if (!givenAnswer) {
            answerDetailToReturn.correct = 'noAnswer';
            answerDetailToReturn.messageSent = 'If you don\'t know the answer to a vocab question, enter zero. ';
          }
          else if (givenAnswer == 0) {
            answerDetailToReturn.correct = 'dontKnow';
          }
          else {
            for (var i = 0; i < correctAnswer.length ; i++){
              //console.log('i is ', i);
              if (givenAnswer === correctAnswer[i].alt) {
                answerDetailToReturn.correct = correctAnswer[i].correct;
                if (correctAnswer[i].message) answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';
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
              answerDetailToReturn.messageSent = 'I don\'t recognize your answer. Spell carefully! ';
            }
          }

          //console.log(answerDetailToReturn.detail);
          return answerDetailToReturn;
        };

         switch (subtype) {

          case 'wordRecall':
            qToReturn.qAnswerFormat = 'small-text-box';
            qToReturn.subtype = 'wordRecall';
            var answerArray = [{alt: word, correct: 'correct'}];
            //console.log('entry.alternates is:', entry.alternates);

            //statement below not working
            answerArray = answerArray.concat(entry.alternates);
            //console.log('answerArray:', answerArray);
            qToReturn.qAnswer = answerArray;   
            var prompt = entry.prompts[flags[0] || 0];
            qToReturn.qPrompt = prompt;
            qToReturn.qText = 'Enter the word or phrase that matches the prompt:\n' + prompt;
            qToReturn.qID = idArray[0];
            qToReturn.qHint = ['sorry, no hints available for vocab questions yet'];
            qToReturn.instructions +='Spelling counts. Plurals are accepted when reasonable, '+ 
              'such as key and keys. Some answers are multiple words. '+
              'All vocabulary words have multiple prompts, so give the word that seems '+
              'right even if the prompt isn\'t the same as last time.';
            //console.log(qToReturn);
            break;
          case 'defineMultipleChoice':
            
            break;
          case 'classifyExample':

            break;
          case 'classifyExampleMultipleChoice':

            break;
          default: 
            qToReturn.subtype = 'notFound';
            qToReturn.qAnswer = [0];
        }

        qToReturn.responseToWrong = ['Try again: ', 
        'Answer to "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

      return qToReturn;
      }
    };
  }]);
