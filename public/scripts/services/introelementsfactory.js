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
    var elementsArray = [{name: 'hydrogen', symbol: 'H', family: 'non-metal', location: '1', charge: 1, valenceE: 1},
      {name: 'helium', symbol: 'He', family: 'noble gas', location: '2', charge: 0, valenceE: 2},
      {name: 'lithium', symbol: 'Li', family: 'alkali metal', location: '3', charge: 1, valenceE: 1},
      {name: 'beryllium', symbol: 'Be', family: 'alkaline earth metal', location: '4', charge: 2, valenceE: 2},
      {name: 'boron', symbol: 'B', family: 'non-metal', location: '5', charge: 3, valenceE: 3},
      {name: 'carbon', symbol: 'C', family: 'non-metal', location: '6', charge: 0, valenceE: 4},
      {name: 'nitrogen', symbol: 'N', family: 'non-metal', location: '7', charge: -3, valenceE: 5},
      {name: 'oxygen', symbol: 'O', family: 'chalcogen', location: '8', charge: -2, valenceE: 6},
      {name: 'fluorine', symbol: 'F', family: 'halogen', location: '9', charge: -1, valenceE: 7},
      {name: 'bromine', symbol: 'Br', family: 'halogen', location: 'Hal', charge: -1, valenceE: 7},
      {name: 'iodine', symbol: 'I', family: 'halogen', location: 'Hal', charge: -1, valenceE: 7},
      {name: 'sodium', symbol: 'Na', family: 'alkali metal', location: '11', charge: 1, valenceE: 1},
      {name: 'magnesium', symbol: 'Mg', family: 'alkaline earth metal', location: '12', charge: 2, valenceE: 2},
      {name: 'aluminum', symbol: 'Al', family: 'post-transition metal', location: '13', charge: 3, valenceE: 3},
      {name: 'silicon', symbol: 'Si', family: 'non-metal', location: '14', charge: 4, valenceE: 4},
      {name: 'phosphorus', symbol: 'P', family: 'non-metal', location: '15', charge: -3, valenceE: 5},
      {name: 'sulfur', symbol: 'S', family: 'chalcogen', location: '16', charge: -2, valenceE: 6},
      {name: 'chlorine', symbol: 'Cl', family: 'halogen', location: '17', charge: -1, valenceE: 7},
      {name: 'argon', symbol: 'Ar', family: 'noble gas', location: 'NG', charge: 0, valenceE: 8},
      {name: 'potassium', symbol: 'K', family: 'alkali metal', location: '19', charge: 1, valenceE: 1},
      {name: 'calcium', symbol: 'Ca', family: 'alkaline earth metal', location: '20', charge: 2, valenceE: 2},
      {name: 'titanium', symbol: 'Ti', family: 'transition metal', location: 'ETM', charge: 4},
      {name: 'iron', symbol: 'Fe', family: 'transition metal', location: 'MTM', charge: [3, 2]},
      {name: 'copper', symbol: 'Cu', family: 'coinage metal', location: 'CM', charge: [2, 1]},
      {name: 'mercury', symbol: 'Hg', family: 'transition metal', location: 'LTM', charge: [2, 1]},
      {name: 'silver', symbol: 'Ag', family: 'coinage metal', location: 'CM', charge: [2, 1]},
      {name: 'gold', symbol: 'Au', family: 'coinage metal', location: 'CM', charge: [3, 1]},
      {name: 'tin', symbol: 'Sn', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
      {name: 'lead', symbol: 'Pb', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
      ];

    var charges = [[{alt: 1, correct: 'correct', message: '', op: 'equals'}, {alt: -1, correct: 'close', message: 'Possible, in special circumstances', op: 'equals'}, 
    {alt: 1, correct: 'knownWrong', message: 'H only has one electron to lose, so it can\'t have a charge above +1', op: 'greater'},
    {alt: -1, correct: 'knownWrong', message: 'It would be almost impossible to add more than 1 electron to H', op: 'less'}],
    [{alt: 0, correct: 'correct', message: 'Noble gases pretty much never have charge. ', op: 'equals'}, {alt: 0, correct: 'knownWrong', message: 'Noble gases pretty much never have charge', op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ' op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 3, correct: 'correct', message: 'Boron often has a +3 charge. ', op: 'equals'}, {alt: 0, correct: 'close', message: 'Like carbon, boron forms many compounds in which it shares electrons. '}],
    [{alt: 0, correct: 'correct', message: 'Carbon usually shares electrons, rather than forming ions', op: 'equals'}, {alt: 0, correct: 'knownWrong', message: 'Carbon usually shares electrons, and rarely forms ions. ', op: 'notEqual'}],
    [{alt: -3, correct: 'correct', message: 'When nitrogen forms an ion, it\'s usually -3 charge. ', op: 'equals'}, {alt: -3, correct: 'close', message: 'In more complicated situations, N can have many different charges. ', op: 'notEqual'}],
    [{alt: -2, correct: 'correct', message: 'O almost always has a -2 charge. ', op: 'equals'}, {alt: -2, correct: 'knownWrong', message: 'O almost always has a -2 charge. ' op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'F always has a -1 charge. ', op: 'equals'}, {alt: -1, correct: 'knownWrong', message: 'F almost always has a -1 charge. ' op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Halogens almost always have a -1 charge. ', op: 'equals'}, {alt: -1, correct: 'knownWrong', message: 'Halogens almost always have a -1 charge. ' op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Halogens almost always have a -1 charge. ', op: 'equals'}, {alt: -1, correct: 'knownWrong', message: 'Halogens almost always have a -1 charge. ' op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ' op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 3, correct: 'correct', message: 'Aluminum always has +3 charge. ', op: 'equals'}, {alt: 3, correct: 'knownWrong', message: 'Aluminum always has +3 charge. ', op: 'notEqual'}],
    [{alt: 4, correct: 'correct', message: 'Si often has a 4+ charge when it occurs in rocks. ', op: 'equals'}, {alt: 0, correct: 'close', message: 'Si doesn\'t share electrons as much as C. ', op: 'equals'}],
    [{alt: -3, correct: 'correct', message: 'When P forms an ion, it\'s usually -3 charge. ', op: 'equals'}, {alt: -3, correct: 'close', message: 'In more complicated situations, P can have many different charges. ', op: 'notEqual'}],
    [{alt: -2, correct: 'correct', message: 'S usually has a -2 charge. ', op: 'equals'}, {alt: -2, correct: 'knownWrong', message: 'In more complicated situations, s can have many different charges. ' op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Cl almost always has a -1 charge. ', op: 'equals'}, {alt: -1, correct: 'knownWrong', message: 'Cl almost always has a -1 charge. ' op: 'notEqual'}],
    [{alt: 0, correct: 'correct', message: 'Noble gases pretty much never have charge. ', op: 'equals'}, {alt: 0, correct: 'knownWrong', message: 'Noble gases pretty much never have charge', op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ' op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 4, correct: 'correct', message: 'Ti usually has a 4+ charge. ', op: 'equals'}, {alt: 0, correct: 'close', message: 'Transition elements often have multiple charges, but Ti is usually +4. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 3, correct: 'correct', message: 'Fe usually has a 3+ or 2+ charge. ', op: 'equals'}, {alt: 2, correct: 'correct', message: 'Fe usually has a 3+ or 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Fe can have a range of charges, but is +2 or +3 normally. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 2, correct: 'correct', message: 'Cu usually has a 1+ or 2+ charge. ', op: 'equals'}, {alt: 1, correct: 'correct', message: 'Cu usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Cu rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 2, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, {alt: 1, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Hg rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Ag usually has a 1+ charge. ', op: 'equals'}, {alt: 2, correct: 'close', message: 'Ag occasionally has a 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Ag rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Au usually has a 1+ or +3 charge. ', op: 'equals'}, {alt: 3, correct: 'close', message: 'Au usually has a 1+ or 3+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Ag rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, {alt: 2, correct: 'close', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, {alt: 2, correct: 'close', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}]];

    var families = ['halogen', 'chalcogen', 'alkali metal', 'alkaline earth metal',
      'noble gas', 'post-transition metal', 'coinage metal', 'transition metal', 'non-metal'];

    return {
      //returns an array of qID that includes fields starting at position 2 in qID (no type, subtype)
      // use flags to control prompts
      getQuestion : function(type_id, type, subtype, idArray, flags) {
        //get type name from VocabListService

        var qToReturn = {type: type, type_id: type_id, subtype: subtype, qHint: ['Sorry, no hints yet. ']};
        qToReturn.factOrSkill = 'fact';
        qToReturn.qID = idArray[0];

        var answerArray, prompt;
        var idParseArray = QIDService.parseID(idArray[0]);
        var index = idParseArray[3];
        var element = elementsArray[index];
        

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
            var which = Math.floor(Math.random() * 2);
            qToReturn.qAnswerFormat = 'ptable';
            qToReturn.qAnswer = [{alt: element.location, correct: 'correct'}];
            if (which) {
              qToReturn.qPrompt = element.name;
            }
            else {
              qToReturn.qPrompt = element.symbol;
            }

            qToReturn.qText = 'Select the location of ' + qPrompt + ' in the Periodic Table';
            qToReturn.instructions = 'Either click inside the correct box, or enter the correct box\'s label. Then hit return/enter. ' +
              'If you don\'t know the answer, you can enter 0. The correct answer will be displayed and you\'ll see it again soon. ';
            
            qToReturn.responseToWrong = ['Try again: ', 
            'Location of "' + qToReturn.qPrompt + '" is "' + qToReturn.qAnswer[0].alt + '." We\'ll come back to it.'];

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
            var which = Math.floor(Math.random() * 2);
            var which2 = Math.floor(Math.random() * 2);


            qToReturn.qAnswerFormat = 'small-text-box';

            //ask student to give a reasonable charge
            if (which) {
              qToReturn.qAnswer = charges[index];

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
              var answerDetailToReturn = {answer: givenAnswer, messageSent: '', correct: ''};
              //console.log('correct is: ', correctAnswer);
              //console.log('correct length: ', correctAnswer.length);
              //console.log('given is: ', givenAnswer);

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
                      if (Number(givenAnswer) === Number(correctAnswer[i].alt)) {
                        answerDetailToReturn.correct = correctAnswer[i].correct;
                        if (correctAnswer[i].message) answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';
                      }
                    break;
                    case 'greater': 
                      if (Number(givenAnswer) > Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';
                      }
                    break;
                    case 'less': 
                      if (Number(givenAnswer) < Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';
                      }
                    break;
                    case 'notEqual': 
                      if (Number(givenAnswer) !== Number(correctAnswer[i].alt)) {
                          answerDetailToReturn.correct = correctAnswer[i].correct;
                          if (correctAnswer[i].message) answerDetailToReturn.messageSent = correctAnswer[i].message + ' ';
                      }
                    break;
                  }
                  if (answerDetailToReturn.correct) break;
                }

                if (!answerDetailToReturn.correct) {
                  if (givenAnswer.isNaN) {
                      answerDetailToReturn.correct = 'formatError';
                      answerDetailToReturn.messageSent = 'Answer should be a number. ';
                  }
                  else if (givenAnswer % 1 !== 0) {
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


            // ask student if a given charge is reasonable
            else {
              var chargesArray = [-3, -2, -1, +1, +2, +3, +4, +5];
              qToReturn.qAnswerFormat = 'small-text-box';
              qToReturn.qPrompt = chargesArray[Math.floor(Math.random(8))];
              if (which2) {
                qToReturn.qText = 'Is ' + String(qToReturn.qPrompt) + ' a reasonable charge for ' + element.name + '?';
              }
              else {
                qToReturn.qText = 'Is ' + String(qToReturn.qPrompt) + ' a reasonable charge for ' + element.symbol + '?';
              }
              for (var i = 0; i < charges[index].length; i++) {
                if (Number(charges[index][i].alt) === Number(qToReturn.qPrompt) && charges[index][i].correct === 'correct') {
                  
                }
              }

            }

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
