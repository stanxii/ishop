'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngSails',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$sailsProvider', function ($sailsProvider) {
	    $sailsProvider.url = 'http://192.168.1.249:1337';
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
