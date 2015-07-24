'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.StudyArrayService
 * @description
 * # StudyArrayService
 * Service in the chemiatriaApp.
 */

angular.module('chemiatriaApp')
  .service('StudyArrayService', ['PLPriorityService', 'FactPriorityService', '$http',  
  	function (PLPriorityService, FactPriorityService, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var historyArray = {};

    this.setup = function() {
        // needs to be updated and tested
        var promise = $http.get('/api/student/states').then(function(response) {
            //console.log('response.data is: ',response.data);
            var temp = response.data;
            for (var i = 0; i < temp.length; i++) {
                //
                var type_id = temp[i].type_id;
                //console.log('object to parse: ', temp[i]);
                //console.log(temp[i].accuracyArray);
                temp[i].accuracyArray = JSON.parse(temp[i].accuracyArray);
                //console.log(temp[i].rtArray);
                temp[i].rtArray = JSON.parse(temp[i].rtArray);
                //console.log(temp[i].subtype);
                temp[i].subtype = JSON.parse(temp[i].subtype);
                if (!historyArray[type_id]) historyArray[type_id] = [];
                historyArray[type_id].push(temp[i]);
               
                
            }
            
            return 'Loaded';
        }, function(errResponse) {
            console.error('Error while fetching states');
        });
        
        return promise;
    }
    
    this.initializeStudyArray = function(studyArray) {
    	//console.log(historyArray);
        //console.log(historyArray[1]);
        var addFields = function(element, index) {
            //all this should be imported from db

            //check for item in history array, get data from there if present
            var type_id = element.type_id;
            var match = {};
            if (historyArray[type_id]) {
                if (element.word_id) {
                    for (var i = 0; i < historyArray[type_id].length; i++) {
                        if (element.word_id === historyArray[type_id][i].word_id) {
                            match = historyArray[type_id][i];
                            break;
                        }
                    }
                }
                else {
                    for (var i = 0; i < historyArray[type_id].length; i++) {
                        if (element.subtype === historyArray[type_id][i].subtype) {
                            match = historyArray[type_id][i];
                            break;
                        }
                    }
                }
                if (Object.getOwnPropertyNames(match).length !== 0) {
                    console.log('match is: ', match);
                    element.lastStudied = match.lastStudied;
                    element.accuracyArray = match.accuracyArray;
                    element.rtArray = match.rtArray;
                    element.priority = match.priority;
                    element.states_id = match.id; 
                    element.stage = match.stage;
                }
            }
            
            if (Object.getOwnPropertyNames(match).length === 0) {
                element.lastStudied = null;
                element.accuracyArray = [];
                element.rtArray = [];
                element.priority = 1;
                switch (element.priorityCalcAlgorithm) {
                    case 'PL' :
                        element.stage = 'discovery';
                        break;
                    case 'fact' :
                     element.stage = '0';
                     break;
                    default: 
                        element.stage = 'AlgorithmRecognitionError';
                        break;
                }
            }
    		element.indexInStudyArray = index;
    		
    		return element;
    	};
    	//console.log('in initializeStudyArray');	
    	return studyArray.map(addFields);
    };

    this.update = function(studyArray, currentQResult) {
    	var index = currentQResult.indexInStudyArray;
    	studyArray[index].lastStudied = Date.now();
    	var tries = currentQResult.answersGiven.length;
    	studyArray[index].accuracyArray.push(tries - 1);
    	var qTimeArray = [];
    	for (var i = 0; i < currentQResult.answersGiven.length; i++) {
    		qTimeArray.push(currentQResult.answersGiven[i].timeToReply);
    	}
    	studyArray[index].rtArray.push(qTimeArray);
    	switch (studyArray[index].priorityCalcAlgorithm) {
    		case 'PL': 
    			studyArray[index] = PLPriorityService.update(studyArray[index]);
    			break;
    		case 'fact':
    			studyArray[index] = FactPriorityService.update(studyArray[index]);
    			break;
    		default: 
    			console.log('priorityCalcAlgorithm not recognized');
    	}
        //send studyArray[index] to db
        var stateItem = studyArray[index];
        stateItem.accuracyArray = JSON.stringify(stateItem.accuracyArray);
        stateItem.rtArray = JSON.stringify(stateItem.rtArray);
        stateItem.subtype = JSON.stringify(stateItem.subtype);
        delete stateItem.type;

        console.log('priority set? ',typeof(stateItem.priority), stateItem.priority);

        //check if state exists
        var route = 'api/student/states/';
        if (stateItem.states_id) {
            route += stateItem.states_id;
        }
        else route += 'new';

        $http.post(route, stateItem).then(function() {}, function(errResponse) {
            console.error(errResponse.data);
        });
        

    	return studyArray;
    };

  }]);
