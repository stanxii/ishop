'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngSails',
  'ngRoute',
  'myApp.index',
  'myApp.login',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$sailsProvider', function ($sailsProvider) {
	    $sailsProvider.url = 'http://192.168.1.249:1337';
		
}]). 
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index'});
}]);
