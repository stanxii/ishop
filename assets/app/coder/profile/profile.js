'use strict';

angular.module('myApp.coder.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coder/profile', {
    templateUrl: 'app/coder/profile/profile.html',
    controller: 'CoderProfileCtrl'
  });
}])

.controller('CoderProfileCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService',
	function($scope, $http, $sails, $location, $window, UserService, AuthenticationService) {
	/* 隐藏layout部分*/

	$scope.getprofile = function getprofile() {

		var user= JSON.parse($window.sessionStorage.user);
		$http.post('/api/v1/profile/create', {userid: user.id});


		$http.get('/profile/');

		console.log('kkkk');
	}

}]);
