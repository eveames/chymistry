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
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable'
  ])
  //change environment to production to switch to using servers
  .constant('ENVIRONMENT', 'development')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        //controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

