'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.MetricsService
 * @description
 * # MetricsService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('MetricsService', ['QIDService', function (QIDService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var plusStart = function(start) {
            return function(a,b, c) {
                if (c < start) {return 0;}
                if (isNaN(a)) {
                    console.log('NaN in rtArray');
                    a = 0;
                }
                if (isNaN(b)) {
                    console.log('NaN in rtArray');
                    b = 0;
                }
                else {return a + b;}
            };
        };

    this.getMetrics = function(studyArrayItem) {
    	var accArray = studyArrayItem.accuracyArray;
    	var rtArray = studyArrayItem.rtArray;

    	var flatRTArray = rtArray.reduce(function(a, b) {
  			return a.concat(b);
		}); 

		var lastRTArray = rtArray.reduce(function(a,b) {
			return a.concat(b.pop());
		});

    	var totalAccuracy = accArray.reduce(plusStart(0));
    	var timesStudied = accArray.length;
    	var lastMistake = Math.max(accArray.lastIndexOf(1), 
    		accArray.lastIndexOf(2), accArray.lastIndexOf(3));
    	var lastStreak = timesStudied - lastMistake;
    	var accuracyLastChunk = accArray.reduce(plusStart(timesStudied - 10));
    	var totalRT = flatRTArray.reduce(plusStart(0))/flatRTArray.length;
    	var streakRT = lastRTArray.reduce(plusStart(lastMistake+1))/lastStreak;
        //this gives the total time to right answer (adds rt for each response to one q)
    	var rtLastChunk = lastRTArray.reduce(plusStart(timesStudied - 10))/(Math.min(10, timesStudied));


    	return {
    		totalAccuracy: totalAccuracy, timesStudied: timesStudied,
    		lastStreak: lastStreak, accuracyLast10: accuracyLastChunk,
    		averageRT: totalRT, streakAverageRT: streakRT, averageRTLast10: rtLastChunk
    	};


    };

    var getQuickMetrics = function(studyArrayItem) {
        //console.log(studyArrayItem);
        var accArray = studyArrayItem.accuracyArray;
        var rtArray = studyArrayItem.rtArray;
        var timesStudied = accArray.length;
        var stage = studyArrayItem.stage;
        //calculate average accuracy last 10 (out of 10)
        //console.log('total: ', Math.min(10, timesStudied));
        //console.log('errors: ', accArray.reduce(plusStart(timesStudied - 10)));
        var chunkSize = Math.min(10, timesStudied);
        var accuracyLastChunk = 100 *(chunkSize - accArray.reduce(plusStart(timesStudied - 10)))/chunkSize;
        accuracyLastChunk = Math.max(accuracyLastChunk, 0);

        //calculate average rt last 10
        console.log('rtArray: ', rtArray);
        var lastRTArray = rtArray.reduce(function(a,b) {
            return a.concat(b.pop());
        });
        console.log('lastRTArray: ', lastRTArray);
        //this gives the total time to right answer (adds rt for each response to one q)
        var rtLastChunk = (lastRTArray.reduce(plusStart(timesStudied - 10)))/(1000 * chunkSize);

        //qualitative comment: making progress, needs work, solid, mastered
        var comment;
        if ((stage === 10) || (stage === 'review')) {
            comment = 'Mastered';
        }
        else if ((stage === 8) || (stage === 9) || (stage === 'master')) {
            comment = 'Solid';
        }
        else if (timesStudied > 25) {
            comment = 'Needs more attention';
        }
        else comment = 'Making progress';

        var label;
        
        if (studyArrayItem.priorityCalcAlgorithm === 'fact') {
            var idArray = QIDService.parseID(studyArrayItem.qID);
            label = idArray[2];
        }
        else {
            label = studyArrayItem.type + ': ' + studyArrayItem.subtype[0];
        }

        return {score: accuracyLastChunk, time: rtLastChunk, comment: comment, label: label};

    };

    this.getSessionMetrics = function(studyArray) {
        // 
        var map = studyArray.map(getQuickMetrics);
        return map;
    };

  }]);
