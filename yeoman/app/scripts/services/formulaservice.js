'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.FormulaService
 * @description
 * # FormulaService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('FormulaService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getSaltFormula = function(cation, anion) {
    	console.log(cation, anion);
    	var regex1 = /[\w]+/g;
    	var anArray = anion.match(regex1);
    	var catArray = cation.match(regex1);
    	console.log(catArray, anArray);
    	var anionCharge = anArray[1];
    	var cationCharge = catArray[1];
    	var anNum = cationCharge;
    	var catNum = anionCharge;
    	if (anNum % 2 === 0 && catNum % 2 === 0) {
    		anNum /= 2;
    		catNum /= 2;
    	}
    	if (anNum % 3 === 0 && catNum % 3 === 0) {
    		anNum /= 3;
    		catNum /= 3;
    	}
  		console.log(typeof anNum, anNum);
    	if (Number(anNum) === 1) {anNum = '';}
    	if (Number(catNum) === 1) {catNum = '';}

    	//check for more than 1 capital letter in anArray[0], catArray[0] to see if () needed
    	var regex2 = /[A-Z]/g;
    	var anNumEl = anArray[0].match(regex2).length;
    	var catNumEl = catArray[0].match(regex2).length;

    	var anFormula, catFormula;

    	if (anNumEl > 1 && anNum) {
    		anFormula = '(' + anArray[0] + ')';
    	}
    	else { anFormula = anArray[0];}

    	if (catNumEl > 1 && catNum) {
    		catFormula = '(' + catArray[0] + ')';
    	}
    	else { catFormula = catArray[0];}

    	var formula = catFormula + catNum + anFormula + anNum;
    	return formula;
    };
  });
