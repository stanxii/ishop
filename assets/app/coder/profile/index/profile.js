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


    (function () {
      $sails.on("node2html.editProfile.res", function (message) {
        if (message.verb === "created") {
          $scope.bars.push(message.data);
        }
      });
    }());


	$scope.getprofile = function( ) {
    var user= JSON.parse($window.sessionStorage.getItem('user'));

    if(user && user.pid) {
      var getProfileUrl = '/profile/';
      getProfileUrl += user.pid;
      $http.get(getProfileUrl)
        .success(function (profileOk) {
          console.log('get profile ok' + profileOk);
      });
    }
  }
    $scope.getprofile();


}]);
