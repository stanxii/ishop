'use strict';

angular.module('myApp.coder.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coder/profile', {
    templateUrl: 'app/coder/profile/profile.html',
    controller: 'CoderProfileCtrl'
  });
}])

.controller('CoderProfileCtrl', ['$scope', '$http', '$sails', '$location', function($scope, $http, $sails, $location) {
	/* 隐藏layout部分*/
}]);
