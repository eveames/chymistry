'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.VocabFactory
 * @description
 * # VocabFactory
 * Factory in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .factory('IntroElementsFactory', ['QIDService', function (QIDService) {
    // Service logic
    // ...

    //subtypes: nameSymbol, whereInTable, charge, LewisAtom, LewisIon
    var elementsArray = [{name: 'hydrogen', symbol: 'H', family: 'non-metal', location: 'H', charge: 1, valenceE: 1},
      {name: 'helium', symbol: 'He', family: 'noble gas', location: 'He', charge: 0, valenceE: 2},
      {name: 'hydrogen', symbol: 'H', family: 'non-metal', location: 'H', charge: 1, valenceE: 1},
      {name: 'lithium', symbol: 'Li', family: 'alkali metal', location: 'Li', charge: 1, valenceE: 1},
      {name: 'beryllium', symbol: 'Be', family: 'alkaline earth metal', location: 'Be', charge: 2, valenceE: 2},
      {name: 'boron', symbol: 'B', family: 'non-metal', location: 'B', charge: 3, valenceE: 3},
      {name: 'carbon', symbol: 'C', family: 'non-metal', location: 'C', charge: 0, valenceE: 4},
      {name: 'nitrogen', symbol: 'N', family: 'non-metal', location: 'N', charge: -3, valenceE: 5},
      {name: 'oxygen', symbol: 'O', family: 'chalcogen', location: 'O', charge: -2, valenceE: 6},
      {name: 'fluorine', symbol: 'F', family: 'halogen', location: 'F', charge: -1, valenceE: 7},
      {name: 'bromine', symbol: 'Br', family: 'halogen', location: 'Hal', charge: -1, valenceE: 7},
      {name: 'iodine', symbol: 'I', family: 'halogen', location: 'Hal', charge: -1, valenceE: 7},
      {name: 'sodium', symbol: 'Na', family: 'alkali metal', location: 'Na', charge: 1, valenceE: 1},
      {name: 'magnesium', symbol: 'Mg', family: 'alkaline earth metal', location: 'Mg', charge: 2, valenceE: 2},
      {name: 'aluminum', symbol: 'Al', family: 'post-transition metal', location: 'Al', charge: 3, valenceE: 3},
      {name: 'silicon', symbol: 'Si', family: 'non-metal', location: 'Si', charge: 4, valenceE: 4},
      {name: 'phosphorus', symbol: 'P', family: 'non-metal', location: 'P', charge: -3, valenceE: 5},
      {name: 'sulfur', symbol: 'S', family: 'chalcogen', location: 'S', charge: -2, valenceE: 6},
      {name: 'chlorine', symbol: 'Cl', family: 'halogen', location: 'Cl', charge: -1, valenceE: 7},
      {name: 'argon', symbol: 'Ar', family: 'noble gas', location: 'NG', charge: 0, valenceE: 8},
      {name: 'potassium', symbol: 'K', family: 'alkali metal', location: 'K', charge: 1, valenceE: 1},
      {name: 'calcium', symbol: 'Ca', family: 'alkaline earth metal', location: 'Ca', charge: 2, valenceE: 2},
      {name: 'titanium', symbol: 'Ti', family: 'transition metal', location: 'ETM', charge: 4},
      {name: 'iron', symbol: 'Fe', family: 'transition metal', location: 'MTM', charge: [3, 2]},
      {name: 'copper', symbol: 'Cu', family: 'coinage metal', location: 'CM', charge: [2, 1]},
      {name: 'mercury', symbol: 'Hg', family: 'transition metal', location: 'LTM', charge: [2, 1]},
      {name: 'silver', symbol: 'Ag', family: 'coinage metal', location: 'CM', charge: [2, 1]},
      {name: 'gold', symbol: 'Au', family: 'coinage metal', location: 'CM', charge: [3, 1]},
      {name: 'tin', symbol: 'Sn', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
      {name: 'lead', symbol: 'Pb', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
      ];

    var families = ['halogen', 'chalcogen', 'alkali metal', 'alkaline earth metal',
      'noble gas', 'post-transition metal', 'coinage metal', 'transition metal', 'non-metal'];

    return {
      //returns an array of qID that includes fields starting at position 2 in qID (no type, subtype)
      // use flags to control prompts
      getQuestion : function(type_id, type, subtype, idArray, flags) {
        //get type name from VocabListService

        var qToReturn = {type: type, type_id: type_id, subtype: subtype, qHint: ['Sorry, no hints yet. ']};
        qToReturn.factOrSkill = 'fact';

        var answerArray, prompt;
        var idParseArray = QIDService.parseID(idArray[0]);
        var index = idParseArray[3];

        switch (subtype) {

          case 'nameSymbol':
            qToReturn.qAnswerFormat = 'small-text-box';
            //choose which is given:
            var which = Math.floor(Math.random() * 2);

            if (which) {
              answerArray = [{alt: elementsArray[index].name, correct: 'correct'}];
              prompt = elementsArray[index].symbol;
              qToReturn.qText = 'Enter the corresponding element name:\n' + prompt;
            }
            else {
              answerArray = [{alt: elementsArray[index].symbol, correct: 'correct'}];
              prompt = elementsArray[index].name;
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

          qToReturn.responseToWrong = ['Try again: ', 
            'Answer to "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

            break;
          case 'whereInTable':
            
            break;
          case 'charge':

            break;
          case 'LewisAtom':

            break;
          case 'LewisIon':

            break;
          default: 
            qToReturn.subtype = 'notFound';
            qToReturn.qAnswer = [0];
        }

      return qToReturn;
      }
    };
  }]);
