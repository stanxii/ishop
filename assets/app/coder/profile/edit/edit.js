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

    $scope.saveChanges = function( ) {
      if($window.sessionStorage.user){
        var user= JSON.parse($window.sessionStorage.getItem('user'));

        var profile = {
          uid: user.uid,
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

        $http.post('/api/v1/profile/edit', {profile: profile});
      }else{
        console.log('profile sav change error has no user');
      }
    }

		//$http.get('/profile/:id');

		console.log('kkkk');

}]);
