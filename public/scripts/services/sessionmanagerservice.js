'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.SessionManagerService
 * @description
 * # SessionManagerService
 * Service in the chemiatriaApp.
 */
angular.module('chemiatriaApp')
	//insert complete list of available question generator factories
	//may want to redesign as provider?
  .service('SessionManagerService', ['QuestionFactory', 'TopicsService', 'StudyArrayService', 'MetricsService',
  	function (QuestionFactory, TopicsService, StudyArrayService, MetricsService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var currentQ = {};
    var currentQResult = {};
    var sessionHistory = [];
    var learningSpeed = 1; // integer or fraction
    //var howFocused = 1; //integer or fraction
    var timeQDisplayed;
    var timeLastAction;
    var qSinceProgressReport = 0;
    var topicsList = [];
    var studyArray = [];
    var sessionStartTime;
    var studiedToday = [];
    

    var setCurrentQ = function(currentQ) {
    	currentQResult = {};
		currentQResult.type = currentQ.type;
		currentQResult.subtype = currentQ.subtype;
		currentQResult.qID = currentQ.qID;
		currentQResult.indexInStudyArray = currentQ.indexInStudyArray;
		currentQResult.answersGiven = [];
		currentQResult.hintRequests = 0;
		currentQResult.gotIt = false;
		timeQDisplayed = Date.now();
		currentQResult.timeDisplayed = timeQDisplayed;
		timeLastAction = timeQDisplayed;

    };

    var studiedThisSession = function(studyArrayItem) {
            return (studyArrayItem.lastStudied > sessionStartTime);
        };

    var selectNextQuestion = function() {
    	//reduce studyArray to next value
    	var currentTime = Date.now();
    	//var nextQ;
    	var readiest;
    	var readiestUnready;
        //console.log('in selectNextQuestion, ', studyArray);
    	for (var i = 0; i < studyArray.length; i++) {
    		if (studyArray[i].priority === 1) {
    			if (readiest) {return readiest;} 
    			else {return studyArray[i];}
    		}
    		else if (studyArray[i].priority <= currentTime) {
    			if (readiest) {
    				if (readiest.priority > studyArray[i].priority) {
    				readiest = studyArray[i];
    				}
    			}
    			else {readiest = studyArray[i];}
    		}
    		else {
    			if (readiestUnready) {
    				if (readiestUnready.priority > studyArray[i].priority) {
    					readiestUnready = studyArray[i];
    				}
    			}
    			else {readiestUnready = studyArray[i];}
    		}	 
    	}
    	if (readiest) {return readiest;}
    	else {return readiestUnready;}  	
    };

    //when does currentQ/currentQResult get reset??

    this.openSession = function(username, selectedTopics) {
    	//initialize variables if needed 
        topicsList = selectedTopics;
        sessionStartTime = Date.now();
        currentQ = {};
        sessionHistory = [];
        learningSpeed = 1; // integer or fraction
        //var howFocused = 1; //integer or fraction
        qSinceProgressReport = 0;
        studiedToday = [];
        
        studyArray = TopicsService.toStudyArray(selectedTopics);
        //console.log('selectedTopics[1]: ', selectedTopics[1]);
        studyArray = StudyArrayService.initializeStudyArray(studyArray);
        currentQ = QuestionFactory.getQuestion(selectNextQuestion());
        console.log("in openSession: ", currentQ);
        setCurrentQ(currentQ);
        //console.log('after setting question: ', studyArray[currentQ.indexInStudyArray]);
        return currentQ;
        
        //console.log('studyArray: ', studyArray);
        //console.log('sample item: ', studyArray[1]);
		

    };

    this.closeSession = function() {
        studiedToday = studyArray.filter(studiedThisSession);
        //console.log(studiedToday);

        var saved = StudyArrayService.updateAllOnDB(studiedToday);
        var questionsAnswered = sessionHistory.length;
        var stats = MetricsService.getSessionMetrics(studiedToday);
        return {saved: saved, questionsAnswered: questionsAnswered, stats: stats};
    };

    //used to change current question in main.js
    this.getQuestion = function() {
    	currentQ = QuestionFactory.getQuestion(selectNextQuestion());
    	setCurrentQ(currentQ);
		return currentQ;

    };
    this.giveHint = function() {
    	//set hintRequests, specify which hint
    	currentQResult.hintRequests++; 

    	var whichHint = Math.min(learningSpeed + currentQResult.hintRequests -2, currentQ.qHint.length -1);
    	return currentQ.qHint[whichHint];
    };

    this.respondToResponse = function(answer) {
    	console.log('answer given: ', answer);
        var answerDetail = currentQ.checkMethod(currentQ.qAnswer, answer);
    	console.log('answerDetail from checkMethod is: ',answerDetail);
    	answerDetail.timeStamp = Date.now();
        //console.log('answerDetail.timeStamp: ', answerDetail.timeStamp);
        //console.log('timeLastAction: ', timeLastAction);
    	answerDetail.timeToReply = answerDetail.timeStamp - timeLastAction;
        //console.log('timeToReply: ', answerDetail.timeToReply);
    	var correct = answerDetail.correct;
    	//console.log('correct is: ', correct);
    	var moveOn = false;

    	if (correct === 'correct') {
    		currentQResult.gotIt = true;
    		answerDetail.messageSent += ' Good job! Here\'s the next question:';
    		//console.log(answerDetail.messageSent);
    		moveOn = true;
    	}
    	else if (correct === 'dontKnow') {
    		moveOn = true;
    		answerDetail.messageSent = currentQ.responseToWrong[1];
    	}


        //may need to work on this 
    	else {
    		var previousTries = currentQResult.answersGiven.length;
    		answerDetail.messageSent += currentQ.responseToWrong[previousTries];
    		if (previousTries > 1) { moveOn = true;}

    	}
    	currentQResult.answersGiven.push(answerDetail);

    	if (moveOn) {
    		sessionHistory.push(currentQResult);
    		studyArray = StudyArrayService.update(studyArray, currentQResult);
            console.log('in SessionManagerService after update:', studyArray[currentQResult.indexInStudyArray].rtArray);
            qSinceProgressReport++;
    	}

    	var questionsAnswered;
        var showStats = false;
        var stats;
        if (qSinceProgressReport === 20) {

            showStats = true;
            studiedToday = studyArray.filter(studiedThisSession);
            stats = MetricsService.getSessionMetrics(studiedToday);
            questionsAnswered = sessionHistory.length;
            qSinceProgressReport = 0;
        }

    	return {moveOn: moveOn, answerDetail: answerDetail, showStats: showStats, stats: stats, questionsAnswered: questionsAnswered};
    };
  }]);
