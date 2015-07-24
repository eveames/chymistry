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
        $http.get('/api/student/typesList').then(function(response) {
            //something funny is happening with the timing here! 
            //function returns before finished, but still works
            //
        var temp = response.data;
        
        for (var i = 0; i < temp.length; i++) {
            topicsList.push(temp[i]);
            //console.log(topicsList[i].selected);
            topicsList[i].selected = Boolean(topicsList[i].selected);
            topicsList[i].subtypes = JSON.parse(topicsList[i].subtypes);
            //console.log('inside asynchRequest for: ',topicsList[i].subtypes);
        }
        //console.log('outside for before return: ',topicsList);
        }, function(errResponse) {
            console.error('Error while fetching topicsList');
        });
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
            var type_id = selectedTopics[i].id;
            var factory = selectedTopics[i].factory;
    		var alg = selectedTopics[i].priorityCalcAlgorithm;
    		if (selectedTopics[i].sequenceByID) {
    			//console.log('about to call VocabListService');
                //console.log(selectedTopics[i]);
    			var vocabList = VocabListService.getIDList(type_id);
    			for (var k = 0; k < vocabList.length; k++) {
    				var qID = type + '-all-' + vocabList[k].qID;
    				var subtypes = selectedTopics[i].subtypes;
                    var word_id = vocabList[k].word_id;
    				studyArray.push({type: type, subtype: subtypes, qID: qID, word_id: word_id,
                        priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
    			}
    		}
    		else {
    			for (var j = 0; j < selectedTopics[i].subtypes.length; j++) {
    			var subtype = selectedTopics[i].subtypes[j]; 
    			//console.log(subtype);
    			studyArray.push({type: type, subtype: [subtype], qID: '', 
                    priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
    			}
    		}
    	}
    	//console.log(studyArray);
    	return studyArray;
    };

    
  }]);

