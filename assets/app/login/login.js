'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService',
	function($scope, $http, $sails, $location, $window, UserService, AuthenticationService) {
	/* 隐藏layout部分*/
	$scope.$parent.j_islogin = false;
	$scope.username = sessionStorage.getItem("username");
	$scope.password = sessionStorage.getItem("password");

	////////////////////////////////////

	$scope.signIn = function signIn(usermail, password, role) {
            if (usermail != null && password != null && role !=null) {

                UserService.signIn(usermail, password, role).success(function(data) {

                    AuthenticationService.isAuthenticated = true;
                    //$window.sessionStorage.user = JSON.stringify(data.user);
                    $window.sessionStorage.user = JSON.stringify(data.user);
                    $window.sessionStorage.token = data.token;

                    if(true == data.success)
                    	$location.path("/coder/profile");
                    else
                    	$location.path("/");

                    // if("coder" == data.user.role){
                    // 	$location.path("/coder/basic");
                    // }
                    // else if("hr" == data.user.role){
                    // 	$location.path("/hr/company");
                    // }
                    // else
                    // 	$location.path("/");

                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }

	//////////////////////////////////////

	// $scope.login = function () {
	// 	var user = {
	// 		username: $scope.username,
	// 		password: $scope.password,
	// 		remember: $scope.remember
	// 	};
	// 	$http.post("/auth/local/", user).success(function (data) {

	// 		if(!data || data.success==false){
 //                alert("Failed Login");
 //            }else{
 //                alert("Successful login");
 //                sessionStorage.token = data.token;
 //                sessionStorage.user = JSON.stringify(data.user);

 //                $location.path("/");
 //            }

	// 		//test2

 //            //test
	// 		$http.get("http://localhost:1337/user")
	// 		    .success(function (data){
	//                 alert(JSON.stringify(data));
	//             })
	//             .error(function (err) {
	//                 alert("Authorization failed" + err);
	//             });

	// 	})
	// 	.error(function (res) {
	// 		alert('Login, we got a problem!');
	// 	});
	// };
}]);
