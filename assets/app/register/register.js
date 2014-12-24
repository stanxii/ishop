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

    $scope.role="coder";

	$scope.register = function register(usermail, password, passwordConfirm, role) {
            if (AuthenticationService.isAuthenticated) {

                $location.path("/coder/basic");
            }
            else {

                UserService.register(usermail, password, passwordConfirm, $scope.role).success(function(data) {
                    $location.path("/coder/basic");
                }).error(function(status, data) {
                    //user already exist in db, nav to login
                    if(1001 == data){
                            $location.path("/login");
                    }
                    console.log(status);
                    console.log(data);
                });
            }
        }

}]);

