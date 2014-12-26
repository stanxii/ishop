'use strict';

angular.module('myApp.coder.profile.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coder/profile/index', {
    templateUrl: 'app/coder/profile/index/profile.html',
    controller: 'CoderProfileCtrl'
  });
}])

.controller('CoderProfileCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService',
	function($scope, $http, $sails, $location, $window, UserService, AuthenticationService) {
	/* 隐藏layout部分*/

	$scope.getprofile = function getprofile() {

		var user= JSON.parse($window.sessionStorage.user);

    var personInfo = {};
    var jobPreferences = {};
    var education = {};
    var workHistory = {};
    var summary = {};
    var profile = {userid: user.id};

		$http.post('/api/v1/profile/create', personInfo, jobPreferences, education, workHistory, summary, profile);


		$http.get('/profile/');

		console.log('kkkk');
	}

}]);
