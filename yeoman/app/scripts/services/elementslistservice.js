'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.ElementsListService
 * @description
 * # ElementsListService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('ElementsListService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    
    var elementsArray = [{name: 'hydrogen', symbol: 'H', family: 'non-metal', location: '1', charge: 1, valence: 1, findex: 8},
      {name: 'helium', symbol: 'He', family: 'noble gas', location: '2', charge: 0, valence: 2, findex: 4},
      {name: 'lithium', symbol: 'Li', family: 'alkali metal', location: '3', charge: 1, valence: 1, findex: 2},
      {name: 'beryllium', symbol: 'Be', family: 'alkaline earth metal', location: '4', charge: 2, valence: 2, findex: 3},
      {name: 'boron', symbol: 'B', family: 'Boron group', location: '5', charge: 3, valence: 3, findex: 8},
      {name: 'carbon', symbol: 'C', family: 'Carbon group', location: '6', charge: 0, valence: 4, findex: 8},
      {name: 'nitrogen', symbol: 'N', family: 'Nitrogen group (pnictogen)', location: '7', charge: -3, valence: 5, findex: 8}, 
      {name: 'oxygen', symbol: 'O', family: 'chalcogen', location: '8', charge: -2, valence: 6, findex: 1},
      {name: 'fluorine', symbol: 'F', family: 'halogen', location: '9', charge: -1, valence: 7, findex: 0},
      {name: 'bromine', symbol: 'Br', family: 'halogen', location: 'Hal', charge: -1, valence: 7, findex: 0},
      {name: 'iodine', symbol: 'I', family: 'halogen', location: 'Hal', charge: -1, valence: 7, findex: 0},
      {name: 'sodium', symbol: 'Na', family: 'alkali metal', location: '11', charge: 1, valence: 1, findex: 2},
      {name: 'magnesium', symbol: 'Mg', family: 'alkaline earth metal', location: '12', charge: 2, valence: 2, findex: 3},
      {name: 'aluminum', symbol: 'Al', family: 'Boron group', location: '13', charge: 3, valence: 3, findex: 9},
      {name: 'silicon', symbol: 'Si', family: 'Carbon group', location: '14', charge: 4, valence: 4, findex: 8},
      {name: 'phosphorus', symbol: 'P', family: 'Nitrogen group (pnictogen)', location: '15', charge: -3, valence: 5, findex: 8},
      {name: 'sulfur', symbol: 'S', family: 'chalcogen', location: '16', charge: -2, valence: 6, findex: 1},
      {name: 'chlorine', symbol: 'Cl', family: 'halogen', location: '17', charge: -1, valence: 7, findex: 0},
      {name: 'argon', symbol: 'Ar', family: 'noble gas', location: 'NG', charge: 0, valence: 8, findex: 4},
      {name: 'potassium', symbol: 'K', family: 'alkali metal', location: '19', charge: 1, valence: 1, findex: 2},
      {name: 'calcium', symbol: 'Ca', family: 'alkaline earth metal', location: '20', charge: 2, valence: 2, findex: 3},
      {name: 'titanium', symbol: 'Ti', family: 'transition metal', location: 'ETM', charge: 4, findex: 7},
      {name: 'iron', symbol: 'Fe', family: 'transition metal', location: 'MTM', charge: [3, 2], findex: 7},
      {name: 'copper', symbol: 'Cu', family: 'coinage metal', location: 'CM', charge: [2, 1], findex: 6},
      {name: 'mercury', symbol: 'Hg', family: '(post-)transition metal', location: 'PTM', charge: [2, 1], findex: 57},
      {name: 'silver', symbol: 'Ag', family: 'coinage metal', location: 'CM', charge: [2, 1], findex: 6},
      {name: 'gold', symbol: 'Au', family: 'coinage metal', location: 'CM', charge: [3, 1], findex: 6},
      {name: 'tin', symbol: 'Sn', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valence: 4, findex: 5},
      {name: 'lead', symbol: 'Pb', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valence: 4, findex: 5},
      ];

    var charges = [[{alt: 1, correct: 'correct', message: '', op: 'equals'}, {alt: -1, correct: 'close', message: 'Possible, but in special circumstances. ', op: 'equals'}, 
    {alt: 1, correct: 'knownWrong', message: 'H only has one electron to lose, so it can\'t have a charge above +1. ', op: 'greater'},
    {alt: -1, correct: 'knownWrong', message: 'It would be almost impossible to add more than 1 electron to H. ', op: 'less'}],
    [{alt: 0, correct: 'correct', message: 'Noble gases pretty much never have charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Noble gases pretty much never have charge. ', op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, 
    {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ', op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, 
    {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 3, correct: 'correct', message: 'Boron often has a +3 charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Like carbon, boron forms many compounds in which it shares electrons, but it does form ionic compounds also. ', op: 'equals'}],
    [{alt: 0, correct: 'correct', message: 'Carbon usually shares electrons, rather than forming ions. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Carbon usually shares electrons, and rarely forms ions. ', op: 'notEqual'}],
    [{alt: -3, correct: 'correct', message: 'When nitrogen forms an ion, it\'s usually -3 charge. ', op: 'equals'}, 
    {alt: -3, correct: 'close', message: 'In more complicated situations, N can have many different charges. ', op: 'notEqual'}],
    [{alt: -2, correct: 'correct', message: 'O almost always has a -2 charge. ', op: 'equals'}, 
    {alt: -2, correct: 'knownWrong', message: 'O almost always has a -2 charge. ', op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'F always has a -1 charge. ', op: 'equals'}, 
    {alt: -1, correct: 'knownWrong', message: 'F almost always has a -1 charge. ', op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Halogens almost always have a -1 charge. ', op: 'equals'}, 
    {alt: -1, correct: 'knownWrong', message: 'Halogens almost always have a -1 charge. ', op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Halogens almost always have a -1 charge. ', op: 'equals'}, 
    {alt: -1, correct: 'knownWrong', message: 'Halogens almost always have a -1 charge. ', op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, 
    {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ', op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, 
    {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 3, correct: 'correct', message: 'Aluminum always has +3 charge. ', op: 'equals'}, 
    {alt: 3, correct: 'knownWrong', message: 'Aluminum always has +3 charge. ', op: 'notEqual'}],
    [{alt: 4, correct: 'correct', message: 'Si often has a 4+ charge when it occurs in rocks. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Si doesn\'t share electrons as much as C. ', op: 'equals'}],
    [{alt: -3, correct: 'correct', message: 'When P forms an ion, it\'s usually -3 charge. ', op: 'equals'}, 
    {alt: -3, correct: 'close', message: 'In more complicated situations, P can have many different charges. ', op: 'notEqual'}],
    [{alt: -2, correct: 'correct', message: 'S usually has a -2 charge. ', op: 'equals'}, 
    {alt: -2, correct: 'knownWrong', message: 'In more complicated situations, s can have many different charges. ', op: 'notEqual'}],
    [{alt: -1, correct: 'correct', message: 'Cl almost always has a -1 charge. ', op: 'equals'}, 
    {alt: -1, correct: 'knownWrong', message: 'Cl almost always has a -1 charge. ', op: 'notEqual'}],
    [{alt: 0, correct: 'correct', message: 'Noble gases pretty much never have charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Noble gases pretty much never have charge. ', op: 'notEqual'}],
    [{alt: 1, correct: 'correct', message: 'Alkali metals always have +1 charge. ', op: 'equals'}, 
    {alt: 1, correct: 'knownWrong', message: 'Alkali metals always have +1 charge. ', op: 'notEqual'}],
    [{alt: 2, correct: 'correct', message: 'Alkaline earth metals always have +2 charge. ', op: 'equals'}, 
    {alt: 2, correct: 'knownWrong', message: 'Alkaline earth metals always have +2 charge. ', op: 'notEqual'}],
    [{alt: 4, correct: 'correct', message: 'Ti usually has a 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Transition elements often have multiple charges, but Ti is usually +4. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 3, correct: 'correct', message: 'Fe usually has a 3+ or 2+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'correct', message: 'Fe usually has a 3+ or 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Fe can have a range of charges, but is +2 or +3 normally. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 2, correct: 'correct', message: 'Cu usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 1, correct: 'correct', message: 'Cu usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Cu rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 2, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 1, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Hg does\'t have a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Ag usually has a 1+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'correct', message: 'Ag occasionally has a 2+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Ag rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Au usually has a 1+ or +3 charge. ', op: 'equals'}, 
    {alt: 3, correct: 'correct', message: 'Au usually has a 1+ or 3+ charge. ', op: 'equals'}, 
    {alt: 3, correct: 'close', message: 'Au rarely has a charge above 3+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}]];

    var selectElements = function (element) {
        return (element.family !== 'post-transition metal' && element.family !== 'coinage metal' && element.family !== 'transition metal');
    };
    //initialized by getIDList function
    //referred to by getEntry function

    this.getIDList = function() {
        
        //console.log('in VocabListService.getIDList');
        //console.log(vocabListArray);
        var map = [];
        var idMaker = function(entry, index) {
            var returnObj = {};
            returnObj.qID = entry.symbol +'-' + index;
          return returnObj;
        };
        map = elementsArray.map(idMaker);
        //console.log(map);
        return map;
    };

    this.getElementsArray = function() {
        return elementsArray;
    };

    //also, use type here
    this.getEntry = function(index) {
        console.log('in ElementsListService getEntry');
    	return {element: elementsArray[index], charges: charges[index]};
    };

    this.getMainGroup = function() {
      return elementsArray.filter(selectElements);
    };

  }]);
