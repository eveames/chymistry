'use strict';

/**
 * @ngdoc function
 * @name chemiatriaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chemiatriaApp
 */
angular.module('chemiatriaApp')
  .controller('MainCtrl', ['$scope', 'SessionLog', 'SessionManagerService', 'TopicsService', 'VocabListService', 'StudyArrayService', function ($scope, 
  	SessionLog, SessionManagerService, TopicsService, VocabListService, StudyArrayService) {
  	$scope.noQuestion = true;
  	$scope.session = false;
    $scope.isFrustrated = false;
    $scope.bugToReport = false;
    $scope.showResponseToFeedback = false;
    $scope.showHint = false;
    $scope.currentHint = 0;
    $scope.username = '';
    $scope.showStats = false;
    $scope.stats = {};
    $scope.frustrationDescription = '';
    $scope.bugDescription = '';
    $scope.responseType = 'alert-success';
    $scope.dataLoaded = 'alert-warning';

    //is this slowing it down? maybe use one-time data binding?
    $scope.questionsNotLoaded = 'Not yet';
    VocabListService.setup().then(function(d) {
        $scope.questionsNotLoaded = d;
        if ($scope.historyNotLoaded === 'Loaded') {
            $scope.dataLoaded = 'alert-success';
        }
    });
    $scope.historyLoaded = 'Not yet';
    StudyArrayService.setup().then(function(d) {
        $scope.historyNotLoaded = d;
        if ($scope.questionsNotLoaded === 'Loaded') {
            $scope.dataLoaded = 'alert-success';
        }
    });

    $scope.topicsList = TopicsService.getTopicsList();
    
    $scope.topicsSelected = [];
    $scope.currentQ = {};
    $scope.answer = '';
    $scope.answerDetail = {}; //used to display message
    //call services here to get db data: vocab list and states list

    $scope.startSession = function() {
    	//console.log($scope.topicsList[0].selected, $scope.topicsList[1].selected);
    	$scope.session = true;
    	$scope.noQuestion = false;
    	$scope.topicsSelected = $scope.topicsList.filter(function(entry) {
    		//if(entry.selected) {return entry;}
    		return entry.selected;
    	});
    	//console.log($scope.topicsSelected);
    	//start logging
    	SessionLog.openSession($scope.username);
    	//console.log($scope.username);
    	$scope.currentQ = SessionManagerService.openSession($scope.username, $scope.topicsSelected);
    	SessionLog.addEvent({type: 'question posted', detail: $scope.currentQ});
    	console.log('in MainCtrl: ', $scope.currentQ);
    };

    //
    $scope.handleAnswer = function() {
        $scope.showHint = false;
        $scope.currentHint = 0;
    	var responseObj = SessionManagerService.respondToResponse($scope.answer);
    	$scope.answerDetail = responseObj.answerDetail;
    	SessionLog.addEvent({type: 'answer given', detail: $scope.answerDetail});
    	$scope.answer = '';
    	if (responseObj.moveOn) {
    		$scope.currentQ = SessionManagerService.getQuestion();
    		SessionLog.addEvent({type: 'question posted', detail: $scope.currentQ});
    	}
    };
    $scope.imFrustrated = function() {
    	$scope.isFrustrated = true;
    	var eventObj = {type: 'button push', whichButton: 'I\'m frustrated'};
    	SessionLog.addEvent(eventObj);
    };
    $scope.reportBug = function(frustrated) {
    	$scope.bugToReport = true;
    	if(frustrated) {$scope.isFrustrated = false;}
    	var eventObj = {type: 'button push', whichButton: 'Report a bug'};
    	SessionLog.addEvent(eventObj);
    };
    $scope.endSession = function() {
    	//confirm intent

    	
    	//display stats
    	$scope.session = true;
    	$scope.showResponseToFeedback = false;
    	$scope.noQuestion = true;
    	$scope.isFrustrated = false;
    	$scope.bugToReport = false;
    	$scope.stats = SessionLog.closeSession();
    	$scope.showStats = true;


    	//something smart with the session log
    	$scope.session = false;
    	$scope.topicsList = TopicsService.topicsList;

    };

    $scope.giveHint = function() {
        if ($scope.showHint) {
            if ($scope.currentQ.qHint.length - 1 > $scope.currentHint) $scope.currentHint++;
        }
        else {
            $scope.showHint = true;
        }
        var eventObj = {type: 'hint given', detail: 
        {hint: $scope.currentQ.qHint[$scope.currentHint], qID: $scope.currentQ.qID}};
        SessionLog.addEvent(eventObj);
    }
    $scope.describeFrustration = function() {
    	//save description into log
    	var eventObj = {type: 'frustrated'};
    	eventObj.description = $scope.frustrationDescription;
    	SessionLog.addEvent(eventObj);
    	//say something encouraging by setting responseToFeedback and showResponseToFeedback
    	$scope.responseToFeedback = 'Thank you for sharing! I will try to improve the service based on your feedback';
    	$scope.showResponseToFeedback = true;
    	$scope.isFrustrated = false;
    	$scope.frustrationDescription = '';
    };
    $scope.describeBug = function() {
    	//save description into log
    	var eventObj = {type: 'bugReport'};
    	eventObj.description = $scope.bugDescription;
    	SessionLog.addEvent(eventObj);
    	//display thank you message with response to feedback
    	$scope.responseToFeedback = 'Thank you for sharing! I will try to improve the service based on your feedback';
    	$scope.showResponseToFeedback = true;
    	$scope.bugToReport = false;
    	$scope.bugDescription = '';
    };
    $scope.cancelDescribeBug = function() {
    	$scope.bugToReport = false;
    	var eventObj = {type: 'button push', whichButton: 'Cancel bug report'};
    	SessionLog.addEvent(eventObj);

    };
    $scope.feedbackDone = function() {
    	$scope.showResponseToFeedback = false;
    	var eventObj = {type: 'button push', whichButton: 'Done viewing response'};
    	SessionLog.addEvent(eventObj);
    	//maybe add system here for new question, etc? to deal with bugs

    };
  }]);
