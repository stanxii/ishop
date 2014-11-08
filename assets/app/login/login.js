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
		$http.post("/auth/local/", user).success(function (res) {
			if(res.sts != 0){
				alert('用户名不存在，请先注册！');
				$location.path("/register");
				return;
			}
			
			if(res.sts == 0){
				sessionStorage.setItem("username",$scope.username);
				sessionStorage.setItem("uid",res.user.uid);
				//alert('---remember2---'+remember);
				if($scope.remember){					
					sessionStorage.setItem("password",$scope.password);
					sessionStorage.setItem("remember", true);
				}				
				
				//$scope.resetLogin({name: username,id: res.userid});
				/* 显示layout部分*/
				$scope.$parent.j_islogin = true;
				$location.path('/');
			}else{
				alert('密码不正确！');
			}
		})
		.error(function (res) {
			alert('Login, we got a problem!');
		});
	};
}]);
