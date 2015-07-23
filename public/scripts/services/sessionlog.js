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
  .service('SessionLog', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //eventObj has fields time, type (question posted, answer given, button push, frustrated, bug report, hint given?)
    // 		whichButton (I'm frustrated, Report a bug, Cancel bug report, Done viewing response, later maybe hint, others?)
    var log = {};
    log.history = [];
    this.openSession = function(username) {
    	log.username = username;
    	log.startTime = Date.now();
    	return log;
    };
    this.addEvent = function(eventObj) {
    	eventObj.time = Date.now();
    	log.history.push(eventObj);
    	return log.history.length;
    };
    this.closeSession = function() {
    	log.endTime = Date.now();
    	return log;
    };
  });
