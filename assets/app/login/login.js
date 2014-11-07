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
	$scope.username = localStorage.getItem("username");
	$scope.password = localStorage.getItem("password");
	if(localStorage.getItem("remember") == "true"){
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
			if(data.sts == 2){
				alert('用户名不存在，请先注册！');
				return;
			}
			if(data.sts == 0){
				localStorage.setItem("username",username);
				//alert('---remember2---'+remember);
				if(remember){
					localStorage.setItem("password",password);
					localStorage.setItem("remember",remember);
				}else{
					localStorage.setItem("password","");
					localStorage.setItem("remember",false);
				}
				$scope.resetLogin({name: username,id: data.userid});
				/* 显示layout部分*/
				$scope.$parent.j_islogin = true;
				$location.path('/');
			}else{
				alert('密码不正确！');
			}
		})
		.error(function (data) {
			alert('Login, we got a problem!');
		});
	};
}]);
