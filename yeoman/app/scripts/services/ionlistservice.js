'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.IonListService
 * @description
 * # IonListService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('IonListService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var polyanionsList = [{name: 'hydroxide', formula: 'OH-1', charge: -1, acid: '', level: 1},
    {name: 'nitrate', formula: 'NO3-1', charge: -1, acid: 'nitric', level: 1, 
		alts: [{name: 'nitrite', formula: 'NO2-1', correct: 'close'}]},
    {name: 'sulfate', formula: 'SO4-2', charge: -2, acid: 'sulfuric', level: 1,
		alts: [{name: 'sulfite', formula: 'SO3-2', correct: 'close'},
		{name: 'bisulfate', formula: 'HSO4-1', correct: 'close'}]},
    {name: 'carbonate', formula: 'CO3-2', charge: -2, acid: 'carbonic', level: 1,
		alts: [{name: 'bicarbonate', formula: 'HCO3-1', correct: 'close'}]},
    {name: 'phosphate', formula: 'PO4-3', charge: -3, acid: 'phosphoric', level: 1},
    {name: 'bicarbonate', formula: 'HCO3-1', charge: -1, acid: '', level: 1,
		alts: [{name: 'hydrogen carbonate', formula: 'HCO3-1', correct: 'correct'},
		{name: 'carbonate', formula: 'CO3-2', correct: 'close'}]},
    {name: 'acetate', formula: 'C2H3O2-1', charge: -1, acid: 'acetic', level: 1,
		alts: [{name: 'acetate', formula: 'CH3CO2-1', correct: 'correct'},
		{name: 'acetate', formula: 'H3CCO2-1', correct: 'correct'},
		{name: 'acetate', formula: 'CH3COO-1', correct: 'correct'},
		{name: 'acetate', formula: 'H3CCOO-1', correct: 'correct'}]},
    {name: 'cyanide', formula: 'CN-1', charge: -1, acid: 'hydrocyanic', level: 2},
    {name: 'peroxide', formula: 'O2-2', charge: -2, acid: '', level: 2},
    {name: 'perchlorate', formula: 'ClO4-1', charge: -1, acid: 'perchloric', level: 2,
		alts: [{name: 'chlorate', formula: 'ClO3-1', correct: 'close'},
		{name: 'chorite', formula: 'ClO2-1', correct: 'close'},
		{name: 'hypochlorite', formula: 'ClO-1', correct: 'close'}]},
    {name: 'chlorate', formula: 'ClO3-1', charge: -1, acid: 'chloric', level: 2,
		alts: [{name: 'perchlorate', formula: 'ClO4-1', correct: 'close'},
		{name: 'chorite', formula: 'ClO2-1', correct: 'close'},
		{name: 'hypochlorite', formula: 'ClO-1', correct: 'close'}]},
    {name: 'chlorite', formula: 'ClO2-1', charge: -1, acid: 'chlorous', level: 2,
		alts: [{name: 'chlorate', formula: 'ClO3-1', correct: 'close'},
		{name: 'perchorate', formula: 'ClO4-1', correct: 'close'},
		{name: 'hypochlorite', formula: 'ClO-1', correct: 'close'}]},
    {name: 'hypochlorite', formula: 'ClO-1', charge: -1, acid: 'hypochlorous', level: 2,
		alts: [{name: 'chlorate', formula: 'ClO3-1', correct: 'close'},
		{name: 'chorite', formula: 'ClO2-1', correct: 'close'},
		{name: 'perchlorate', formula: 'ClO4-1', correct: 'close'}]},
    {name: 'perbromate', formula: 'BrO4-1', charge: -1, acid: 'perbromic', level: 2,
		alts: [{name: 'bromate', formula: 'BrO3-1', correct: 'close'},
		{name: 'bromite', formula: 'BrO2-1', correct: 'close'},
		{name: 'hypobromite', formula: 'BrO-1', correct: 'close'}]},
    {name: 'bromate', formula: 'BrO3-1', charge: -1, acid: 'bromic', level: 2,
		alts: [{name: 'perbromate', formula: 'BrO4-1', correct: 'close'},
		{name: 'bromite', formula: 'BrO2-1', correct: 'close'},
		{name: 'hypobromite', formula: 'BrO-1', correct: 'close'}]},
    {name: 'bromite', formula: 'BrO2-1', charge: -1, acid: 'bromous', level: 2,
		alts: [{name: 'bromate', formula: 'BrO3-1', correct: 'close'},
		{name: 'perbromate', formula: 'BrO4-1', correct: 'close'},
		{name: 'hypobromite', formula: 'BrO-1', correct: 'close'}]},
    {name: 'hypobromite', formula: 'BrO-1', charge: -1, acid: 'hypobromous', level: 2,
		alts: [{name: 'bromate', formula: 'BrO3-1', correct: 'close'},
		{name: 'bromite', formula: 'BrO2-1', correct: 'close'},
		{name: 'perbromate', formula: 'BrO4-1', correct: 'close'}]},
    {name: 'periodate', formula: 'IO4-1', charge: -1, acid: 'periodic', level: 2, 
    	alts: [{name: 'iodate', formula: 'IO3-1', correct: 'close'},
		{name: 'iodite', formula: 'IO2-1', correct: 'close'},
		{name: 'hypoiodite', formula: 'IO-1', correct: 'close'}], faAlt: 'H5IO6'},
    {name: 'iodate', formula: 'IO3-1', charge: -1, acid: 'iodic', level: 2,
		alts: [{name: 'periodate', formula: 'IO4-1', correct: 'close'},
		{name: 'iodite', formula: 'IO2-1', correct: 'close'},
		{name: 'hypoiodite', formula: 'IO-1', correct: 'close'}]},
    {name: 'iodite', formula: 'IO2-1', charge: -1, acid: 'iodous', level: 2,
		alts: [{name: 'iodate', formula: 'IO3-1', correct: 'close'},
		{name: 'periodate', formula: 'IO4-1', correct: 'close'},
		{name: 'hypoiodite', formula: 'IO-1', correct: 'close'}]},
    {name: 'hypoiodite', formula: 'IO-1', charge: -1, acid: 'hypoiodous', level: 2,
		alts: [{name: 'iodate', formula: 'IO3-1', correct: 'close'},
		{name: 'iodite', formula: 'IO2-1', correct: 'close'},
		{name: 'periodate', formula: 'IO4-1', correct: 'close'}]},
    {name: 'nitrite', formula: 'NO2-1', charge: -1, acid: 'nitrous', level: 2,
		alts: [{name: 'nitrate', formula: 'NO3-1', correct: 'close'}]},
    {name: 'sulfite', formula: 'SO3-2', charge: -2, acid: 'sulfurous', level: 2,
		alts: [{name: 'sulfate', formula: 'SO4-2', correct: 'close'}]},
    {name: 'azide', formula: 'N3-1', charge: -1, acid: '', level: 2},
    {name: 'bisulfate', formula: 'HSO4-1', charge: -1, acid: '', level: 2,
		alts: [{name: 'hydrogen sulfate', formula: 'HSO4-1', correct: 'correct'},
		{name: 'sulfate', formula: 'SO4-2', correct: 'close'}]},
    ];

    var polycationsList = [{name: 'ammonium', formula: 'NH4+1', charge: 1, level: 1},
    {name: 'mercury(I)', formula: 'Hg2+2', charge: 2, level: 2}];

    var anionsList = [{name: 'chloride', formula: 'Cl-1', charge: -1, acid: 'hydrochloric', level: 1},
    {name: 'bromide', formula: 'Br-1', charge: -1, acid: 'hydrobromic', level: 1},
    {name: 'fluoride', formula: 'F-1', charge: -1, acid: 'hydrofluoric', level: 1},
    {name: 'iodide', formula: 'I-1', charge: -1, acid: 'hydroiodic', level: 1},
    {name: 'oxide', formula: 'O-2', charge: -2, acid: '', level: 1},
    {name: 'sulfide', formula: 'S-2', charge: -2, acid: 'hydrosulfuric', level: 1},
    {name: 'nitride', formula: 'N-3', charge: -3, acid: '', level: 1}];

    var cationsList = [{name: 'lithium', formula: 'Li', charge: 1, romNum: false},
    {name: 'sodium', formula: 'Na', charge: 1, romNum: false},
    {name: 'magnesium', formula: 'Mg', charge: 2, romNum: false},
    {name: 'potassium', formula: 'K', charge: 1, romNum: false},
    {name: 'calcium', formula: 'Ca', charge: 2, romNum: false},
    {name: 'strontium', formula: 'Sr', charge: 2, romNum: false},
    {name: 'cesium', formula: 'Cs', charge: 1, romNum: false},
    {name: 'barium', formula: 'Ba', charge: 2, romNum: false},
    {name: 'aluminum', formula: 'Al', charge: 3, romNum: false},
    {name: 'titanium', formula: 'Ti', charge: [3,4], romNum: true},
    {name: 'vanadium', formula: 'V', charge: [2,3,4,5], romNum: true},
    {name: 'chromium', formula: 'Cr', charge: [2,3,4,6], romNum: true},
    {name: 'manganese', formula: 'Mn', charge: [2,3,4,7], romNum: true},
    {name: 'titanium', formula: 'Ti', charge: [2,3], romNum: true},
    {name: 'cobalt', formula: 'Co', charge: [2,3], romNum: true},
    {name: 'nickel', formula: 'Ni', charge: [2,3], romNum: true},
    {name: 'platinum', formula: 'Pt', charge: [2,4], romNum: true},
    {name: 'copper', formula: 'Cu', charge: [1,2], romNum: true},
    {name: 'silver', formula: 'Ag', charge: [1], romNum: true},
    {name: 'zinc', formula: 'Zn', charge: [2], romNum: true},
    {name: 'cadmium', formula: 'Cd', charge: [2], romNum: true},
    {name: 'mercury', formula: 'Hg', charge: [2], romNum: true},
    {name: 'uranium', formula: 'U', charge: [4,6], romNum: true},
    {name: 'tin', formula: 'Sn', charge: [2,4], romNum: true},
    {name: 'lead', formula: 'Pb', charge: [2,4], romNum: true}];

    var moleculesList = [{name: 'water', formula: 'H2O'}, {name: 'ammonia', formula: 'NH3'}, 
    {name: 'methane', formula: 'CH4'}, {name: 'ozone', formula: 'O3'}];

    var completeList = [polyanionsList, polycationsList, anionsList, cationsList, moleculesList];


    this.getIDList = function(level, category, acid) {
        
        console.log('in IonListService.getIDList', level, category, acid);
        //console.log(vocabListArray);
        var map = [];

        var levelList = completeList[category].filter(function(entry) {
        	return (entry.level <= level);
        });

     	var qID;

        var idMaker = function(entry, index) {
        	console.log('entry.name in idMaker is', entry.name);
            //var numCharges = entry.charge.length;
            //var returnObj = {};
            //returnObj.word_id = entry.id;
            qID = entry.name +'-' + index + '-' + category;
          return qID;
        };

        var idMakerAcid = function(entry, index) {
            //var numCharges = entry.charge.length;
            //var returnObj = {};
            //returnObj.word_id = entry.id;
            qID = entry.acid +'acid-' + index + '-' + category;
          return qID;
        };

        if (acid) {
        	var acidList = levelList.filter(function(entry) {return entry.acid;});
        	map = acidList.map(idMakerAcid);
			return map;
        }

        else {
        	map = levelList.map(idMaker);
        
        //console.log(map);
        	return map;
        }
    };

    //also, use type here
    this.getEntry = function(category, index) {
    	return completeList[category][index];
    };
  });


