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
            //console.log('response.data is: ', response.data);
            var temp = response.data;
            //console.log('temp is: ', temp);
            for (var key in temp) {
                //console.log('in for');
                var type_id = temp[key].type_id;
                //console.log('object to parse: ', temp[key]);
                //console.log(temp[i].accuracyArray);
                temp[key].accuracyArray = JSON.parse(temp[key].accuracyArray);
                //console.log(temp[i].rtArray);
                temp[key].rtArray = JSON.parse(temp[key].rtArray);
                //console.log(temp[i].subtype);
                temp[key].subtype = JSON.parse(temp[key].subtype);
                if (!historyArray[type_id]) historyArray[type_id] = [];
                historyArray[type_id].push(temp[key]);
                //console.log('historyArray[type_id]: ', historyArray[type_id]);
               
                
            }
            
            return 'Loaded';
        }, function(errResponse) {
            console.error('Error while fetching states');
        });
        
        return promise;
    }
    
    this.initializeStudyArray = function(studyArray) {
    	console.log(historyArray);
        console.log(historyArray[2]);
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
                        //console.log('element.subtype: ', element.subtype);
                        //console.log('historyArray.subtype: ', historyArray[type_id][i].subtype)
                        if (element.subtype[0] === historyArray[type_id][i].subtype[0]) {
                            match = historyArray[type_id][i];
                            break;
                        }
                    }
                }
                if (Object.getOwnPropertyNames(match).length !== 0) {
                    //console.log('match is: ', match);
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
    		//console.log('studyArrayelement ', element);
    		return element;
    	};
    	console.log('in initializeStudyArray');	
    	return studyArray.map(addFields);
    };

    this.update = function(studyArray, currentQResult) {
        var index = currentQResult.indexInStudyArray;
        console.log('study array item before update: ', studyArray[index]);
        console.log('currentQResult.answersGiven: ', currentQResult.answersGiven);
        //console.log('update lastStudied?', Date.now(), studyArray[index].lastStudied);
    	studyArray[index].lastStudied = Date.now();
    	var tries = currentQResult.answersGiven.length;
        //console.log('lastStudied updated? ', studyArray[index]);
    	studyArray[index].accuracyArray.push(tries - 1);
        console.log('rtArray before update: ', studyArray[index].rtArray);
    	var qTimeArray = [];
    	for (var i = 0; i < currentQResult.answersGiven.length; i++) {
    		qTimeArray.push(currentQResult.answersGiven[i].timeToReply);
    	}
        console.log('qTimeArray: ', qTimeArray);
    	studyArray[index].rtArray.push(qTimeArray);
        console.log('rtArray after update: ', studyArray[index].rtArray);
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
        /*stateItem.accuracyArray = JSON.stringify(stateItem.accuracyArray);
        stateItem.rtArray = JSON.stringify(stateItem.rtArray);
        console.log('subtype before stringify: ', studyArray[index]);
        if (stateItem.priorityCalcAlgorithm !== 'fact') {
            if (typeof(stateItem.subtype) !== 'string') {
                console.log('subtype beginning if: ', studyArray[index]);
                stateItem.subtype = stateItem.subtype[0];
                console.log('subtype end if: ', studyArray[index]);
            }
        }
        stateItem.subtype = JSON.stringify(stateItem.subtype);
        */
        console.log('checking subtype? ', studyArray[index]);

        //check if state exists
        var route = 'api/student/states/';
        console.log('states_id? :', stateItem.states_id);
        if (stateItem.states_id) {
            route += stateItem.states_id;
        }
        else route += 'new';

        $http.post(route, stateItem).then(function(d) {
            if (d.data) {
                console.log(d.data);
                studyArray[d.data[1]].states_id = Number(d.data[0]);
                console.log('updated w/ states_id: ', studyArray[index], 'index should be ', d.data[1]);
                //reverse the changes to restore study array item to original state
                /*stateItem.accuracyArray = JSON.parse(stateItem.accuracyArray);
                stateItem.rtArray = JSON.parse(stateItem.rtArray);
                stateItem.subtype = JSON.parse(stateItem.subtype);
                console.log('subtype before parse: ', studyArray[index]);
                if (stateItem.priorityCalcAlgorithm !== 'fact') {
                    if (typeof(stateItem.subtype) === 'string') {
                        console.log('reverse beginning if: ', studyArray[index]);
                        stateItem.subtype = [stateItem.subtype];
                        console.log('reverse end if: ', studyArray[index]);
                    }
                }*/
            }
        }, function(errResponse) {
            console.error(errResponse.data);
        });
        
        
        

    	return studyArray;
    };

  }]);
