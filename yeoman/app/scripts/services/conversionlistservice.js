'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.ConversionListService
 * @description
 * # ConversionListService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('ConversionListService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var type1ListF = [[{numUnitL: 'inches', numUnit: 'in', conversionNum: 12, conversionDenom: 1, denomUnitL: 'feet', denomUnit: 'ft'}, 
    {numUnitL: 'feet', numUnit: 'ft', conversionNum: 3, conversionDenom: 1, denomUnitL: 'yards', denomUnit: 'yd'},
    {numUnitL: 'yards', numUnit: 'yd', conversionNum: 1760, conversionDenom: 1, denomUnitL: 'miles', denomUnit: 'mi'}],
    [{numUnitL: 'square inches', numUnit: 'in^2', conversionNum: 144, conversionDenom: 1, denomUnitL: 'square feet', denomUnit: 'ft^2'}, 
    {numUnitL: 'square feet', numUnit: 'ft^2', conversionNum: 43560, conversionDenom: 1, denomUnitL: 'acres', denomUnit: 'ac'}],
    [{numUnitL: 'cubic inches', numUnit: 'in^3', conversionNum: 33.60, conversionDenom: 1, denomUnitL: 'pint', denomUnit: 'pt'}, 
    {numUnitL: 'pints', numUnit: 'pt', conversionNum: 2, conversionDenom: 1, denomUnitL: 'quarts', denomUnit: 'qt'},
    {numUnitL: 'quarts', numUnit: 'qt', conversionNum: 4, conversionDenom: 1, denomUnitL: 'gallons', denomUnit: 'gal'}],
    [{numUnitL: 'dollars', numUnit: '$', conversionNum: '', conversionDenom: '', denomUnitL: 'widgets', denomUnit: 'widget'}, 
    {numUnitL: 'widgets', numUnit: 'widget', conversionNum: '', conversionDenom: 1, denomUnitL: 'packages', denomUnit: 'package'},
    {numUnitL: 'packages', numUnit: 'package', conversionNum: '', conversionDenom: 1, denomUnitL: 'box', denomUnit: 'box'}],
    [{numUnitL: 'seconds', numUnit: 's', conversionNum: 60, conversionDenom: 1, denomUnitL: 'minutes', denomUnit: 'min'}, 
    {numUnitL: 'minutes', numUnit: 'min', conversionNum: 60, conversionDenom: 1, denomUnitL: 'hours', denomUnit: 'h'},
    {numUnitL: 'hours', numUnit: 'h', conversionNum: 24, conversionDenom: 1, denomUnitL: 'days', denomUnit: 'd'},
    {numUnitL: 'days', numUnit: 'd', conversionNum: 7, conversionDenom: 1, denomUnitL: 'weeks', denomUnit: 'wk'},
    {numUnitL: 'weeks', numUnit: 'wk', conversionNum: 4, conversionDenom: 1, denomUnitL: 'months', denomUnit: 'mon'},
    {numUnitL: 'months', numUnit: 'mon', conversionNum: 12, conversionDenom: 1, denomUnitL: 'years', denomUnit: 'yr'}]
    ];

    var type1List = [[{name: 'density', numUnitL: 'grams', numUnit: 'g', conversionNum: 'array', conversionDenom: 1, denomUnitL: 'milliliters', denomUnit: 'mL', 
		array: [['water', 1.0], ['air', 0.0012], ['wood', 0.7], ['ice', 0.917], ['aluminum', 2.7], ['diamond', 3.5], ['iron', 7.87],
		['gold', 19.32], ['copper', 8.94], ['mercury', 13.55], ['concrete', 2]], numPhrase: ' x g of item occupy y mL ', 
		denomPhrase: ' y mL of item mass x g ', ratioPhrase: 'the density of item is val g/mL '}],
    [{name: 'heat of fusion', numUnitL: 'kilojoules', numUnit: 'kJ', conversionNum: 'array', conversionDenom: 1, denomUnitL: 'grams', denomUnit: 'g', 
		array: [['water', 0.336], ['alcohol', 0.108], ['lead', 0.023], ['wax', 0.21]], numPhrase: ' x kJ of energy are needed to melt y g of item ', 
		denomPhrase: ' y g of item consumes x kJ of energy in melting', ratioPhrase: ' the heat of fusion (energy required for melting) of item is val kJ/g '}],
	[{name: 'heat of combustion', numUnitL: 'kilojoules', numUnit: 'kJ', conversionNum: 'array', conversionDenom: 1, denomUnitL: 'grams', denomUnit: 'g', 
		array: [['methane', 55.50], ['alcohol', 29.7], ['propane', 50.35], ['diesel', 44.8]], numPhrase: ' x kJ of energy are produced when y g of item is burned ', 
		denomPhrase: ' y g of item produces x kJ of energy when burned', ratioPhrase: ' the heat of combustion (energy produced by burning) of item is val kJ/g '}],
    ];

    this.getType1F = function() {
    	return type1ListF;
    };
    this.getType1 = function() {
    	return type1List;
    };
  });
