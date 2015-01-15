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

	  ///////////////////////////////////////////////////////



    $scope.profile = {
      uid: "548fde8075b961b50f515fdd",
      personalInfo: {
        name: "stanhangzhou"
      },
      jobPreferences: {
        'skills': ['c', 'c++','object c', 'java', 'android', 'java script']
      },
      education: {},
      workHistory: {},
      summary: {}
    };

		//$http.post('/api/v1/profile/create', personInfo, jobPreferences, education, workHistory, summary, profile);

    $scope.saveChanges = function( ) {
      if("undefined" != $window.sessionStorage.user){
        var user= JSON.parse($window.sessionStorage.user);
      }

      //$http.post('/api/v1/profile/create', personInfo, jobPreferences, education, workHistory, summary, profile);
      $http.post('/api/v1/profile/edit', {profile: $scope.profile});
    }

		//$http.get('/profile/');

		console.log('kkkk');

}]);
