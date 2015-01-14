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

    var user= JSON.parse($window.sessionStorage.user);

    var personInfo = {};
    var jobPreferences = {};
    var education = {};
    var workHistory = {};
    var summary = {};
    var profile = {"userid": user.id};

    (function () {
      $sails.on("node2html.editProfile.res", function (message) {
        if (message.verb === "created") {
          $scope.bars.push(message.data);
        }
      });
    }());

	$scope.getprofile = function getprofile() {
		$http.post('/api/v1/profile/edit', $scope.profile);
		$http.get('/profile/');
		console.log('kkkk');
	}

}]);
