'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.TopicsService
 * @description
 * # TopicsService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('TopicsService', ['VocabListService', '$http', function (VocabListService, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    //level corresponds roughly to chapter location in a textbook. 
    //should let teachers set levels for their classes
    //should set topicsList by user, indicating previously studied, previously mastered, next up, etc
    //in ng-repeat, will order by level
    
    /*this.topicsList = 
    [{type: 'SigFigPL', factory: 'SigFigPLFactory', level: 1, 
    	name: 'Recognizing sig figs', selected: true,
    	subtypes: ['noDecimalPlace', 'decimalPlace', 'allAfterPoint', 'decimalPointNoPlaces'], sequenceByID: false, priorityCalcAlgorithm: 'PL'},
      {type: 'VocabBasic', factory: 'VocabFactory', subtypes: 
      ['wordRecall'], level: 1.1,
      	name: 'Basic Vocab', selected: true, sequenceByID: true, priorityCalcAlgorithm: 'fact'}];
    */

    this.getTopicsList = function() {
        //console.log('in getTopicsList function');
        var topicsList = [];
        //console.log(topicsList);
        $http.get('/api/student/typesList').then(function(response) {
            //console.log('response.data is: ',response.data);
            var temp = response.data;
            
            for (var i = 0; i < temp.length; i++) {
                topicsList.push(temp[i]);
                //console.log(topicsList[i].selected);
                topicsList[i].selected = Boolean(topicsList[i].selected);
                topicsList[i].subtypes = JSON.parse(topicsList[i].subtypes);
                console.log(topicsList[i].subtypes);
            }
        }, function(errResponse) {
            console.error('Error while fetching notes');
        });
        //console.log(topicsList);
        return topicsList;
    } 

      	//subtypes of vocab coming soon: 'defineMultipleChoice', 'classifyExample', 
      //'classifyExampleMultipleChoice'

      //subtypes of SigFigPL coming soon

    //makes array for SessionManagerService to store sequencing data
    //holds skills by subtype and facts by qID
    this.toStudyArray = function(selectedTopics) {
    	var studyArray = [];
    	for (var i = 0; i < selectedTopics.length; i++) {
    		var type = selectedTopics[i].type;
    		var alg = selectedTopics[i].priorityCalcAlgorithm;
    		if (selectedTopics[i].sequenceByID) {
    			console.log('about to call VocabListService');
    			var vocabList = VocabListService.getIDList(type);
    			for (var k = 0; k < vocabList.length; k++) {
    				var qID = type + '-all-' + vocabList[k];
    				var subtypes = selectedTopics[i].subtypes;
    				studyArray.push({type: type, subtype: subtypes, qID: qID, priorityCalcAlgorithm: alg});
    			}
    		}
    		else {
    			for (var j = 0; j < selectedTopics[i].subtypes.length; j++) {
    			var subtype = selectedTopics[i].subtypes[j]; 
    			console.log(subtype);
    			studyArray.push({type: type, subtype: [subtype], qID: '', priorityCalcAlgorithm: alg});
    			}
    		}
    	}
    	console.log(studyArray);
    	return studyArray;
    };

    
  }]);

