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

    this.setup = function() {
        // needs to be updated and tested
        var promise = $http.get('/api/student/states').then(function(response) {
            console.log('response.data is: ',response.data);
            var temp = response.data;
            for (var i = 0; i < temp.length; i++) {
                var type_id = temp[i].type_id;
                if (!vocabListArray[type_id]) vocabListArray[type_id] = [];
                vocabListArray[type_id].push(temp[i]);
                //console.log(vocabList[i].selected);
                vocabListArray[type_id].prompts = JSON.parse(vocabListArray[type_id].prompts);
                vocabListArray[type_id].alternates = JSON.parse(vocabListArray[type_id].alternates);
                //console.log(topicsList[i].subtypes);
            }
            //console.log('vocabList is: ',vocabList);
            //vocabListArray[type_id] = vocabList;
            return 'Loaded';
        }, function(errResponse) {
            console.error('Error while fetching notes');
        });
        //console.log('map is: ', map);
        return promise;
    }
    
    this.initializeStudyArray = function(studyArray) {
    	var addFields = function(element, index) {
            //all this should be imported from db
    		element.lastStudied = null;
    		element.accuracyArray = [];
    		element.rtArray = [];
    		element.priority = 1;
    		element.indexInStudyArray = index;
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
    		return element;
    	};
    		
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
    	return studyArray;
    };

  }]);
