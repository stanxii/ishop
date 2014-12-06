'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope', '$http', '$sails', '$location', function($scope, $http, $sails, $location) {
	/* 隐藏layout部分*/
	$scope.$parent.j_islogin = false;
	$scope.username = sessionStorage.getItem("username");
	$scope.password = sessionStorage.getItem("password");
	if(sessionStorage.getItem("remember") == "true"){
		$scope.remember = true;
	}else{
		$scope.remember = false;
	}
	$scope.login = function () {
		var user = {
			username: $scope.username,
			password: $scope.password,
			remember: $scope.remember
		};
		$http.post("/auth/local/", user).success(function (data) {

			if(!data || data.success==false){
                alert("Failed Login");
            }else{
                alert("Successful login");
                sessionStorage.token = data.token;
                sessionStorage.user = JSON.stringify(data.user);

                $location.path("/");
            } 

			//test2

            //test
			$http({
				method:'get',
				url: "http://localhost:1337/user",
				headers: {'Authorization': 'Bearer '+(sessionStorage.token || '')}
			    })
			    .success(function (data){            	            
	                alert(JSON.stringify(data));
	            })
	            .error(function (err) {	            
	                alert("Authorization failed" + err);
	            });
						
		})
		.error(function (res) {
			alert('Login, we got a problem!');
		});
	};
}]);
