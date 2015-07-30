'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.TopicsService
 * @description
 * # TopicsService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('TopicsService', ['VocabListService', '$http', 'ElementsListService', '$resource', function (VocabListService, $http, ElementsListService, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    //level corresponds roughly to chapter location in a textbook. 
    //should let teachers set levels for their classes
    //should set topicsList by user, indicating previously studied, previously mastered, next up, etc
    //in ng-repeat, will order by level
    
    /*var topicsList = 
    [{type: 'SigFigPL', factory: 'SigFigPLFactory', listService: '', level: 1, 
    	name: 'Recognizing sig figs', selected: true,
    	subtypes: ['noDecimalPlace', 'decimalPlace', 'allAfterPoint', 'decimalPointNoPlaces'], sequenceByID: false,
    	sequenceBySubtype: true, priorityCalcAlgorithm: 'PL', type_id: 1},
      {type: 'VocabBasic', factory: 'VocabFactory', listService: 'VocabListService', subtypes: 
      ['wordRecall'], level: 1.1, name: 'Basic Vocab', selected: true, sequenceByID: true, 
      sequenceBySubtype: false, priorityCalcAlgorithm: 'fact', type_id: 2},
      {type: 'IntroElements', factory: 'IntroElementsFactory', listService: 'ElementsListService', level: 2.2, 
      name: 'Intro to Common Elements', selected: true,
      subtypes: ['nameSymbol', 'whereInTable','charge'], 
      sequenceByID: true, sequenceBySubtype: true, priorityCalcAlgorithm: 'fact', type_id: 3}];
      */
    
    
    var typeNamesList = []; 

    this.getTopicsList = function() {
        console.log('in getTopicsList function');
        //uncomment below to use server
        var topicsList = [];
        
        //$http.get('/api/student/typesList').then(function(response) {
        $resource('/typesList.json').query().$promise.then(function(response) {
            //something funny is happening with the timing here! 
            //function returns before finished, but still works
            //
        var temp = response;
        console.log('temp', temp);
        
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

        /*var temp = $resource('topicsList.json');
        for (var i = 0; i < temp.length; i++) {
            topicsList.push(temp[i]);
            console.log(topicsList[i].selected);
            topicsList[i].selected = Boolean(topicsList[i].selected);
            topicsList[i].subtypes = JSON.parse(topicsList[i].subtypes);
        }*/
        return topicsList;
    }; 

    this.getTopicName = function(type_id) {
         
    };

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
            var byID = selectedTopics[i].sequenceByID;
            var bySubtype = selectedTopics[i].sequenceBySubtype;
            var listService = selectedTopics[i].listService;
            var k, j, qID, subtypes, subtype;
    		if (byID) {
    			//console.log('about to call VocabListService');
                //console.log(selectedTopics[i]);
                switch (listService) {
                    case 'VocabListService':
                        var vocabList = VocabListService.getIDList(type_id);
                        for (k = 0; k < vocabList.length; k++) {
                            qID = type + '-all-' + vocabList[k].qID;
                            subtypes = selectedTopics[i].subtypes;
                            var word_id = vocabList[k].word_id;
                            studyArray.push({type: type, subtype: subtypes, qID: qID, word_id: word_id,
                            priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
                        }
                        break;
                    case 'ElementsListService':
                        var elementsList = ElementsListService.getIDList();
                        if (bySubtype) {
                            for (j = 0; j < selectedTopics[i].subtypes.length; j++) {
                                subtype = selectedTopics[i].subtypes[j];
                                for (k = 0; k < elementsList.length; k++) {
                                    qID = type + '-' + subtype + '-' + elementsList[k].qID;
                                    studyArray.push({type: type, subtype: [subtype], qID: qID, 
                                    priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
                                }
                            }
                        }
                        break;
                    default: 
                        console.log('listService not recognized');
                }
    			
    		}

    		else if (bySubtype) {
    			for (j = 0; j < selectedTopics[i].subtypes.length; j++) {
    			subtype = selectedTopics[i].subtypes[j]; 
    			//console.log(subtype);
    			studyArray.push({type: type, subtype: [subtype], qID: '', 
                    priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
    			}
    		}
            else {
                //subtype = selectedTopics[i].subtypes; 
                //console.log(subtype);
                studyArray.push({type: type, subtype: [], qID: '', 
                    priorityCalcAlgorithm: alg, type_id: type_id, factory: factory});
            }
    	}
    	//console.log(studyArray);
    	return studyArray;
    };

    
  }]);

