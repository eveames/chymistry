'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.IntroElementsFactory
 * @description
 * # IntroElementsFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('IntroElementsFactory', ['QIDService', 'ElementsListService', 'RandomFactory', function (QIDService, ElementsListService, RandomFactory) {
    // Service logic
    // ...

    //subtypes: nameSymbol, whereInTable, charge, family 

    return {
      //returns an array of qID that includes fields starting at position 2 in qID (no type, subtype)
      // use flags to control prompts
      getQuestion : function(type_id, type, subtype, idArray) {
        //get type name from VocabListService

        var qToReturn = {type: type, type_id: type_id, subtype: subtype, qHint: ['Sorry, no hints yet. ']};
        qToReturn.factOrSkill = 'fact';
        qToReturn.qID = idArray[0];

        var answerArray, prompt;
        var idParseArray = QIDService.parseID(idArray[0]);
        var index = idParseArray[3];
        var elementObj = ElementsListService.getEntry(index);
        var element = elementObj.element;
        var charges = elementObj.charges;
        
        var which;

        switch (subtype) {

          case 'nameSymbol':
            qToReturn.qAnswerFormat = 'small-text-box';
            //choose which is given:
            which = Math.floor(Math.random() * 2);

            if (which) {
              answerArray = [{alt: element.name, correct: 'correct'}];
              prompt = element.symbol;
              qToReturn.qText = 'Enter the corresponding element name:\n' + prompt;
            }
            else {
              answerArray = [{alt: element.symbol, correct: 'correct'}];
              prompt = element.name;
              qToReturn.qText = 'Enter the corresponding element symbol:\n' + prompt;
            }
              
            //console.log('entry.alternates is:', entry.alternates);

            //statement below not working
            
            //console.log('answerArray:', answerArray);
            qToReturn.qAnswer = answerArray;   
            qToReturn.qPrompt = prompt;
            qToReturn.qID = idArray[0];
            qToReturn.qHint = ['sorry, no hints available yet'];
            qToReturn.instructions = 'If you don\'t know the answer, enter 0 (zero). ' +
            'The answer will be displayed, and you\'ll see it again soon. ' +
            'Answers are case-sensitive. Use all lower-case for names and correct capitalization for symbols. ' +
            'Spelling counts. ';
            //console.log(qToReturn);
            qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
              var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: '', correct: ''};
              //console.log('correct is: ', correctAnswer);
              //console.log('correct length: ', correctAnswer.length);
              //console.log('given is: ', givenAnswer);

              //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
              //check for no answer
              if (!givenAnswer.answer) {
                answerDetailToReturn.correct = 'noAnswer';
                answerDetailToReturn.messageSent = 'If you don\'t know the answer, enter zero. ';
              }
              else if (Number(givenAnswer.answer) === 0) {
                answerDetailToReturn.correct = 'dontKnow';
              }
              else {
                for (var i = 0; i < correctAnswer.length ; i++){
                  //console.log('i is ', i);
                  if (givenAnswer.answer === correctAnswer[i].alt) {
                    answerDetailToReturn.correct = correctAnswer[i].correct;
                    if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                    break;
                  }
                  else if (givenAnswer.answer.toLowerCase() === correctAnswer[i].alt.toLowerCase()) {
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

          qToReturn.responseToWrong = ['Try again: ', 
            'Answer to "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

            break;
          case 'whereInTable':
            which = Math.floor(Math.random() * 2);
            qToReturn.qAnswerFormat = 'ptable';
            qToReturn.qAnswer = [{alt: element.location, correct: 'correct'}];
            if (which) {
              qToReturn.qPrompt = element.name;
            }
            else {
              qToReturn.qPrompt = element.symbol;
            }

            qToReturn.qText = 'Select the location of ' + qToReturn.qPrompt + ' in the Periodic Table';
            qToReturn.instructions = 'Either click inside the correct box, or enter the correct box\'s label (not case-sensitive). Then hit return/enter. ' +
              'If you don\'t know the answer, you can enter 0. The correct answer will be displayed and you\'ll see it again soon. ';
            
            qToReturn.responseToWrong = ['Try again: ', 
            'Location of "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

            qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
              var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: '', correct: ''};
              //console.log('correct is: ', correctAnswer);
              //console.log('correct length: ', correctAnswer.length);
              //console.log('given is: ', givenAnswer);

              //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
              //check for no answer
              if (!givenAnswer.answer) {
                answerDetailToReturn.correct = 'noAnswer';
                answerDetailToReturn.messageSent = 'If you don\'t know the answer, enter zero. ';
              }
              else if (Number(givenAnswer.answer) === 0) {
                answerDetailToReturn.correct = 'dontKnow';
              }
              else {
                for (var i = 0; i < correctAnswer.length ; i++){
                  //console.log('i is ', i);
                  
                  if (givenAnswer.toLowerCase() === correctAnswer[i].alt.toLowerCase()) {
                    if (correctAnswer[i].correct === 'correct') {
                      answerDetailToReturn.correct = 'correct';
                      answerDetailToReturn.messageSent = '';
                      break;
                    } 
                  }
                }
                if (!answerDetailToReturn.correct) {
                  answerDetailToReturn.correct = 'unknownWrong';
                  answerDetailToReturn.messageSent = '';
                }
              }

              //console.log(answerDetailToReturn.detail);
              return answerDetailToReturn;
            };
            break;
          case 'charge':
            which = Math.floor(Math.random() * 2);
            var which2 = Math.floor(Math.random() * 2);


            qToReturn.qAnswerFormat = 'small-text-box';

            //ask student to give a reasonable charge
            if (which) {
              qToReturn.qAnswer = charges;

              if (which2) {
                qToReturn.qPrompt = element.name;
              }
              else {
                qToReturn.qPrompt = element.symbol;
              }
            
              qToReturn.qText = 'Enter a reasonable charge for ' + qToReturn.qPrompt;
              qToReturn.instructions = '';
              qToReturn.responseToWrong = ['Try again: ', 
              'A reasonable charge for "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

              qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
              var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: '', correct: ''};
              //console.log('correct is: ', correctAnswer);
              //console.log('correct length: ', correctAnswer.length);
              //console.log('given is: ', givenAnswer);

              // catch x-, x+ syntax
              var regex = /(\d+)([+-])/;
              givenAnswer = givenAnswer.answer.replace(regex, '$2$1');
              console.log('given answer after regex', givenAnswer);

              //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
              //check for no answer
              if (!givenAnswer) {
                answerDetailToReturn.correct = 'noAnswer';
                answerDetailToReturn.messageSent = 'Enter an integer.';
              }
              
              else {
                for (var i = 0; i < correctAnswer.length ; i++){
                  //console.log('i is ', i);
                  
                  switch(correctAnswer[i].op) {
                    case 'equals':
                      if (Number(givenAnswer.answer) === Number(correctAnswer[i].alt)) {
                        answerDetailToReturn.correct = correctAnswer[i].correct;
                        if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                      }
                    break;
                    case 'greater': 
                      if (Number(givenAnswer.answer) > Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                      }
                    break;
                    case 'less': 
                      if (Number(givenAnswer.answer) < Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                      }
                    break;
                    case 'notEqual': 
                      if (Number(givenAnswer.answer) !== Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                      }
                    break;
                  }
                  if (answerDetailToReturn.correct) {break;}
                }
                console.log('checkMethod after for', answerDetailToReturn.correct);

                if (!answerDetailToReturn.correct) {
                  if (givenAnswer.answer.isNaN) {
                      answerDetailToReturn.correct = 'formatError';
                      answerDetailToReturn.messageSent = 'Answer should be a number. ';
                  }
                  else if (Number(givenAnswer.answer) % 1 !== 0) {
                      answerDetailToReturn.correct = 'formatError';
                      answerDetailToReturn.messageSent = 'Answer should be an integer. ';
                  }     
                }
              }
              if (!answerDetailToReturn.correct) {
                answerDetailToReturn.correct = 'unknownWrong';
                answerDetailToReturn.messageSent = '';
              }
              return answerDetailToReturn;
            };
          }


            // ask student if a given charge is reasonable
            else {
              var chargesArray = ['-3', '-2', '-1', '+1', '+2', '+3', '+4', '+5'];
              qToReturn.qAnswerFormat = 'small-text-box';
              qToReturn.qPrompt = chargesArray[RandomFactory.getRandomDigit(8, 0)];
              if (which2) {
                qToReturn.qText = 'Is ' + String(qToReturn.qPrompt) + ' a reasonable charge for ' + element.name + '?';
              }
              else {
                qToReturn.qText = 'Is ' + String(qToReturn.qPrompt) + ' a reasonable charge for ' + element.symbol + '?';
              }
              qToReturn.instructions = 'Enter y or n. By reasonable charge, I mean one of the two most common charges '+
                'when the given element forms single-atom ions under normal circumstances. If the element does not form ' +
                'single-atom ions normally, then answer n. ';
              //set answer
              console.log(qToReturn.qText);
              console.log(charges);
              answerArray = [{}, {}];
              for (var i = 0; i < charges.length ; i++){
                  //console.log('i is ', i);
                  //bug here
                  switch(charges[i].op) {
                    case 'equals':
                      if (Number(qToReturn.qPrompt) === Number(charges[i].alt)) {
                        if(charges[i].correct === 'correct') {
                          console.log(typeof answerArray[0]);
                          if (typeof answerArray[0].alt === 'undefined') {
                            answerArray[0] = {alt: 'y', correct: 'correct', message: charges[i].message};
                          }
                        }
                        else {
                          if (typeof answerArray[1].alt === 'undefined') {
                            answerArray[1] = {alt: 'y', correct: charges[i].correct, message: charges[i].message};
                          }
                        }
                      }
                    break;
                    case 'greater': 
                      if (Number(qToReturn.qPrompt) > Number(charges[i].alt)) {
                          console.log(typeof answerArray[1]);
                          if (typeof answerArray[1].alt === 'undefined') {
                            answerArray[1] = {alt: 'y', correct: charges[i].correct, message: charges[i].message};
                          }
                      }
                    break;
                    case 'less': 
                      if (Number(qToReturn.qPrompt) < Number(charges[i].alt)) {
                          console.log(typeof answerArray[1]);
                          if (typeof answerArray[1].alt === 'undefined') {
                            answerArray[1] = {alt: 'y', correct: charges[i].correct, message: charges[i].message};
                          }
                      }
                    break;
                    case 'notEqual': 
                      if (Number(qToReturn.qPrompt) !== Number(charges[i].alt)) {
                          console.log(typeof answerArray[1]);
                          if (typeof answerArray[1].alt === 'undefined') {
                            answerArray[1] = {alt: 'y', correct: charges[i].correct, message: charges[i].message};
                          }
                      }
                    break;
                  }
                  console.log('i, answerArray: ', i, answerArray);
                  if (typeof answerArray[0].alt !== 'undefined' && typeof answerArray[1].alt !== 'undefined') {break;}
              }
              // not found, therefore correct is 'n'
              if (typeof answerArray[0].alt === 'undefined') {
                  answerArray[0] = {alt: 'n', correct: 'correct', message: ''};
              }
              //check [0] and do the opposite
              if (typeof answerArray[1].alt === 'undefined') {
                  if (answerArray[0].alt === 'y') {answerArray[1] = {alt: 'n', correct: 'knownWrong', message: ''};}
                  if (answerArray[0].alt === 'n') {answerArray[1] = {alt: 'y', correct: 'knownWrong', message: ''};}
              } 
              qToReturn.qAnswer = answerArray;
              var messageTemp = '';
              if (!answerArray[1].message && answerArray[0].message) {messageTemp = answerArray[0].message;}
              qToReturn.responseToWrong = [messageTemp + ' We\'ll come back to it. '];

              qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
                var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: '', correct: ''};
                var answerTemp;
                var yArray = ['y', 'yes', 't', 'true'];
                var nArray = ['n', 'no', 'f', 'false'];
                console.log(yArray.indexOf(givenAnswer.answer.toLowerCase()), nArray.indexOf(givenAnswer.answer.toLowerCase()));
                if (yArray.indexOf(givenAnswer.answer.toLowerCase()) > -1) {answerTemp = 'y';}
                else if (nArray.indexOf(givenAnswer.answer.toLowerCase()) > -1) {answerTemp = 'n';}
                console.log('answerTemp: ', answerTemp);
                console.log('correctAnswer:', correctAnswer);
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

            }

            break;
          case 'family':
            var families = ['halogen', 'chalcogen', 'alkali metal', 'alkaline earth metal',
              'noble gas', 'post-transition metal', 'coinage metal', 'transition metal', 'non-metal', 'metal'];

            qToReturn.qAnswerFormat = 'multiple-choice';
            which = Math.floor(Math.random() * 2);

            answerArray = [{alt: element.findex, correct: 'correct'}];
            if (index === 24) {
              answerArray[0].alt = 5;
              answerArray[0].message = 'Mercury is considered either a transition or post-transition metal. ';
              answerArray.push({alt: 7, correct: 'correct', message: 'Mercury is considered either a transition or post-transition metal. '});
            }
            if (element.findex === 0 || element.findex === 1 || element.findex === 4) {
              answerArray.push({alt: 8, correct: 'close', message: 'It is a non-metal, but be more specific!'});
            }
            else if (element.findex === 2 || element.findex === 3 || element.findex === 5 || element.findex === 6 || element.findex === 7) {
              answerArray.push({alt: 9, correct: 'close', message: 'It is a metal, but be more specific!'});
              if (element.findex === 6) {
                answerArray.push({alt: 7, correct: 'close', message: 'It is a transition metal, but be more specific!'});
              }

            }
            qToReturn.qAnswer = answerArray;
            qToReturn.instructions = 'Enter the number of your answer, or click on the answer and hit enter.' +
              'Don\'t type in the word! Make sure you choose the most specific description. ';

            if (which) {
              prompt = element.symbol;
            }
            else {
              prompt = element.name;
            }
            qToReturn.qText = 'Choose the most specific correct classification for ' + prompt;

            qToReturn.choices = families;

            qToReturn.responseToWrong = ['Try again: ', 
              'Check the periodic table! We\'ll come back to it.'];

            qToReturn.checkMethod = function(correctAnswer, givenAnswer) {
              var answerDetailToReturn = {answer: givenAnswer.answer, messageSent: '', correct: ''};
              //console.log('correct is: ', correctAnswer);
              //console.log('correct length: ', correctAnswer.length);
              //console.log('given is: ', givenAnswer);

              //set correct (correct/close/knownWrong/unknownWrong/noAnswer/formatError/dontKnow)
              //check for no answer
              if (!givenAnswer.answer) {
                answerDetailToReturn.correct = 'noAnswer';
                answerDetailToReturn.messageSent = 'Enter an integer.';
              }
              else {
                for (var i = 0; i < correctAnswer.length ; i++){
                  //console.log('i is ', i);
                  if (givenAnswer.answer === correctAnswer[i].alt) {
                    answerDetailToReturn.correct = correctAnswer[i].correct;
                    if (correctAnswer[i].message) {answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';}
                    break;
                  }
                }
                if (!answerDetailToReturn.correct) {
                  if (typeof givenAnswer.answer === 'number' && givenAnswer.answer >= 0 && givenAnswer.answer <= 9) {
                    answerDetailToReturn.correct = 'knownWrong';
                  }
                  else {
                    answerDetailToReturn.correct = 'formatError';
                    answerDetailToReturn.messageSent = 'Enter the number of the answer you choose. ';
                  }  
                }
              }
              return answerDetailToReturn;
            };
                
            break;
          default: 
            qToReturn.subtype = 'notFound';
            qToReturn.qAnswer = [0];
        }

      return qToReturn;
      }
    };
  }]);
