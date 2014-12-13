'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app/register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService',
          function($scope, $http, $sails, $location, $window, UserService, AuthenticationService) {
	
    
	$scope.register = function register(usermail, password, passwordConfirm, role) {       
            if (AuthenticationService.isAuthenticated) {

                $location.path("/coder/basic");
            }
            else {
                var role="coder";
                UserService.register(usermail, password, passwordConfirm, role).success(function(data) {
                    $location.path("/coder/basic");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
			
}]);
