'use strict';

/**
 * @ngdoc overview
 * @name chemiatriaApp
 * @description
 * # chemiatriaApp
 *
 * Main module of the application.
 */
angular
  .module('chemiatriaApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable'
  ])
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/teacher', {
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
*/