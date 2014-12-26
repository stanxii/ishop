'use strict';

angular.module('myApp.coder.profile.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coder/profile/edit', {
    templateUrl: 'app/coder/profile/edit/edit.html',
    controller: 'EditProfileCtrl'
  });
}])

.controller('EditProfileCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService', 'fakeQueryService',
	function($scope, $http, $sails, $location, $window, UserService, AuthenticationService, fakeQueryService) {
	/* 隐藏layout部分*/

	$scope.getprofile = function getprofile() {


    $scope.genders = [
      'Male',
      'Female'
    ];

    $http.get('./locations.json').success(function(locations) {
      $scope.locations = locations;
    });

    $scope.phoneNumberRegex = /\(\d{3}\) \d{3}-\d{4}/;

    $scope.fakeUsernames = ['angular', 'username', 'user', 'john', 'eric', 'noob', 'ng'];
    $scope.fakeEmails = [
      'email@email.com',
      'email@gmail.com',
      'email@website.com',
      'jon@gmail.com',
      'fake@gmail.com',
      'fake@email.com'
    ];

    $scope.submitted = false;
    $scope.submit = function() {
      $scope.submitted = true;
    };
    $scope.interacted = function(field) {
      return $scope.submitted || field.$dirty;
    };

    ///////////////////////////////////////////////////////
		var user= JSON.parse($window.sessionStorage.user);

    var personInfo = {};
    var jobPreferences = {};
    var education = {};
    var workHistory = {};
    var summary = {};
    var profile = {userid: user.id};

		//$http.post('/api/v1/profile/create', personInfo, jobPreferences, education, workHistory, summary, profile);


		$http.get('/profile/');

		console.log('kkkk');
	}

}]);
