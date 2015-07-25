'use strict';

/**
 * @ngdoc service
 * @name chemiatriaApp.SessionLog
 * @description
 * # SessionLog
 * Service in the chemiatriaApp.
 */

 //status: doesn't seem to be doing anything; must test this and it's connection	
angular.module('chemiatriaApp')
  .service('SessionLog', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //eventObj has fields time, type (question posted, answer given, button push, frustrated, bug report, hint given?)
    // 		whichButton (I'm frustrated, Report a bug, Cancel bug report, Done viewing response, later maybe hint, others?)
    var log = {};
    log.history = [];

    this.openSession = function(username) {
    	//log.username = username;
    	log.startTime = Date.now();
        var action = {};
        action.type = 'session started';
        action.time = log.startTime;
        postToDB(action);
    	return log;
    };
    this.addEvent = function(eventObj) {
    	eventObj.time = Date.now();
    	log.history.push(eventObj);
        var action = {};
        action.type = eventObj.type;
        action.detail = JSON.stringify(eventObj.detail);
        action.whichButton = eventObj.whichButton;
        action.description = eventObj.description;
        action.time = eventObj.time;
        postToDB(action);
    	return log.history.length;
    };
    this.closeSession = function() {
    	log.endTime = Date.now();
        var action = {};
        action.type = 'session ended';
        action.time = log.endTime;
        postToDB(action);
    	return log;
    };

    var postToDB = function(action) {
        // make http post call w/ data
        $http.post('api/student/actions', action).then(function(d) {
            if (d.data) {
                console.log(d.data);
                log.username = d.data;
                //console.log('updated w/ states_id: ', studyArray[index], 'index should be ', d.data[1]);
            }
        }, function(errResponse) {
            console.error(errResponse.data);
        });
    }
  }]);
