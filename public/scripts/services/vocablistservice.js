'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.VocabListService
 * @description
 * # VocabListService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
  .service('VocabListService', ['$http', '$resource', 'ENVIRONMENT', function ($http, $resource, ENVIRONMENT) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    //should talk to db, get vocablist for each vocab-unit (possibly do this inside method?)
    /*var vocabList = [
    {word: 'matter', prompts: ['the stuff everything is made of', 
    'stuff', 'anything that has mass and occupies space', 'the physical material of everything'], 
    alternates: []},
    {word: 'property', prompts: ['a distinguishing characteristic', 
    'something that helps us tell one material from another', 
    'a particular quality or attribute of a material'], alternates: ['properties']},
    {word: 'element', prompts: ['the fundamental types of matter', 
    'the simplest form of pure substance', 'a material that has only one type of atoms'], 
    alternates: ['elements']},
    {word: 'atom', prompts: ['the building block of everything (if you ask a chemist)',
    'tiniest chunk of an element', 'particles molecules are made of'], alternates: ['atoms']},
    {word: 'molecule', prompts: ['a small group of atoms that is strongly attached to each other',
    'the smallest bit of a compound'], alternates: ['molecules']},
    {word: 'state of matter', alternates: ['phase', 'phase of matter', 'physical state'], 
    prompts: ['whether something is a solid, liquid or gas']},
    {word: 'solid', prompts: ['something hard', 
    'a material in a state where the atoms or molecules are held in fixed positions next to each other',
    'a material which does not flow and cannot be compressed'], alternates: ['solids']},
    {word: 'liquid', prompts: ['something flowy', 
    'a material in a state in which the atoms or molecules are close together but can move around',
    'a material in a state which can flow but cannot be compressed'], alternates: ['liquids']},
    {word: 'gas', alternates: ['vapor','gases', 'vapors', 'vapour', 'vapours'], prompts: ['something airy', 
    'a material in a state in which the atoms or molecules are far apart and bouncing around rapidly',
    'a material in a state which can flow and expands to fill available space']},
    {word: 'composition', prompts: ['what kind of atoms a material is made of, and in what proportion',
    'percentage of each element in a material usually by mass', 'ratio of elements in a material, pure or impure']},
    {word: 'pure substance', alternates: ['substance', 'substances', 'pure substances'], prompts: ['has only one type of atoms or molecules',
    'a material with constant properties and composition in all samples']},
    {word: 'compound', prompts: ['a pure substance that is not a pure element',
    'a substance with a distinct ratio of different elements'], alternates: ['compounds']},
    {word: 'mixture', alternates: ['mix', 'mixes', 'mixtures'], prompts: 
    ['a combination of substances that usually has properties similar or in between compared to the properties of the pure substances',
     'a material whose composition changes from sample to sample', 'a combo of materials that is not a compound']}
    ];*/
    
    //initialized by getIDList function
    //referred to by getEntry function
    var vocabListArray = {};
    //console.log('just set vocabListArray empty: ', vocabListArray);

    this.setup = function() {
        //var vocabList = [];
        //var vocabListArray = {};
    
        //comment/uncomment line below to change to/from server
        var promise = $http.get('/api/student/vocabList/').then(function(response) {
        //var promise = $resource('/vocabList.json').query().$promise.then(function(response) {
            //console.log('response.data is: ',response.data);
            var temp = response;
            console.log('vocabListArray before setup', vocabListArray);
            for (var i = 0; i < temp.length; i++) {
                console.log('temp[i] is:', temp[i]);
                var type_id = temp[i].type_id;
                temp[i].prompts = JSON.parse(temp[i].prompts);
                temp[i].alternates = temp[i].alternates;
                if (!vocabListArray[type_id]) {vocabListArray[type_id] = [];}
                vocabListArray[type_id].push(temp[i]);
                console.log(vocabListArray[type_id]);
                //vocabListArray[type_id].prompts = JSON.parse(vocabListArray[type_id].prompts);
                //vocabListArray[type_id].alternates = JSON.parse(vocabListArray[type_id].alternates);
                //console.log(topicsList[i].subtypes);
            }
            //console.log('vocabList is: ',vocabList);
            //vocabListArray[type_id] = vocabList;
            return 'Loaded';
        }, function(errResponse) {
            console.error('Error while fetching vocab list');
        });
        //console.log('map is: ', map);
        return promise;
        
    };

    this.getIDList = function(type_id) {
        
        //console.log('in VocabListService.getIDList');
        //console.log(vocabListArray);
        var map = [];
        var idMaker = function(entry, index) {
            var numPrompts = entry.prompts.length;
            var returnObj = {};
            returnObj.word_id = entry.id;
            returnObj.qID = entry.word +'-' + index + '-' +numPrompts;
          return returnObj;
        };
        map = vocabListArray[type_id].map(idMaker);
        //console.log(map);
        return map;
    };

    //also, use type here
    this.getEntry = function(type_id, index) {
    	return vocabListArray[type_id][index];
    };
  }]);
