'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.ScientificNotationService
 * @description
 * # ScientificNotationService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('ScientificNotationService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //should take number with unit, possibly in scientific notation
    //scientific notation: x.xxE(+/-)digit unit or x.xxe(+/-)digit unit
    //remove unit (and decompose if compound)

    //convert number part to numeric form
    //return array/object with number in numeric form, and units, and number of sig figs

    this.parseNumber = function(input) {
    	//console.log(input, typeof input);
    	var str = String(input);
    	var unitsArray = str.match(/ ([A-Za-z]+\^?[-+]?\d?)/g) || [];
  		//console.log(unitsArray);
    	var i, k, temp, sigFigs;
  		var numUnits = [];
  		var denomUnits = [];
  		var errorString = '';
  		if (unitsArray.length === 0) {errorString += 'No unit. ';}
    	for (i = 0; i < unitsArray.length; i++) {
    		
          temp = unitsArray[i].replace(' ', '');
          temp = temp.split('^');
          //console.log(temp);
          if (temp.length === 1) {temp.push(1);}
    		if (temp[1] < 0) {
    			for (k = 1; k <= -temp[1]; k++) {
    				//console.log(k);
                  denomUnits.push(temp[0]);
    			}
    		}
    		else {
    			for (k = 1; k <= temp[1]; k++) {
    				//console.log(k);
                  numUnits.push(temp[0]);
    			}
    		}
    	}
    	var number = str.match(/-?[\d.,]+/) || '';
    	number = String(number).replace(',', '');
    	if (number === '') {
    		errorString += 'Found no number. ';
    		number = 1;
    	}
  		console.log(number);
    	var exp = str.match(/[eE]([+-]?\d+)/);
  if (exp) {
    exp = exp[1]; }
  else {exp = 0;}
  //console.log(exp);
    	//count sig figs:
    	//is there a decimal place?
    	var point = String(number).match(/[.]/); 
  		sigFigs = String(number);
    	if (!point) {
    		sigFigs = sigFigs.replace(/0+$/, '');
    	}
    	sigFigs = sigFigs.replace('.', '');
    	sigFigs = sigFigs.replace(/^0+/, '');
    	sigFigs = sigFigs.length;
		console.log(number);
  		number = number * Math.pow(10, exp);
  		var unitsString = '';
  		for (i = 0; i < numUnits.length; i++) {
  			unitsString += ' ' + numUnits[i];
  		}
  		unitsString+= '/';
  		for (i = 0; i < denomUnits.length; i++) {
  			unitsString += ' ' + denomUnits[i];
  		}
    	return {number: number, sigFigs: sigFigs, numUnits: numUnits, denomUnits: denomUnits, unitString: unitsString, errors: errorString };
    };
  });
