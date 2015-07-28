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
      {name: 'mercury', symbol: 'Hg', family: 'transition metal', location: 'PTM', charge: [2, 1]},
      {name: 'silver', symbol: 'Ag', family: 'coinage metal', location: 'CM', charge: [2, 1]},
      {name: 'gold', symbol: 'Au', family: 'coinage metal', location: 'CM', charge: [3, 1]},
      {name: 'tin', symbol: 'Sn', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
      {name: 'lead', symbol: 'Pb', family: 'post-transition metal', location: 'PTM', charge: [2, 4], valenceE: 4},
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
    {alt: 0, correct: 'close', message: 'Cu rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 2, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 1, correct: 'correct', message: 'Hg usually has a 1+ or 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Hg rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Ag usually has a 1+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Ag occasionally has a 2+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Ag rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 1, correct: 'correct', message: 'Au usually has a 1+ or +3 charge. ', op: 'equals'}, 
    {alt: 3, correct: 'close', message: 'Au usually has a 1+ or 3+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'close', message: 'Ag rarely has a charge above 2+. ', op: 'greater'},
    {alt: 0, correct: 'knownWrong', message: 'Transition elements often have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}],
    [{alt: 4, correct: 'correct', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 2, correct: 'close', message: 'Sn and Pb usually has a 2+ or 4+ charge. ', op: 'equals'}, 
    {alt: 0, correct: 'knownWrong', message: 'Metals may have multiple charges, but always positive. ', op: 'less'}]];

    var families = ['halogen', 'chalcogen', 'alkali metal', 'alkaline earth metal',
      'noble gas', 'post-transition metal', 'coinage metal', 'transition metal', 'non-metal'];
    //initialized by getIDList function
    //referred to by getEntry function

    this.getIDList = function(type_id) {
        
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

    //also, use type here
    this.getEntry = function(index) {
        console.log('in ElementsListService getEntry');
    	return {element: elementsArray[index], charges: charges[index]};
    };

  }]);
