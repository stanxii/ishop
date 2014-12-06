'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app/register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope', '$http', '$sails', '$location', function($scope, $http, $sails, $location) {
	/* 隐藏layout部分*/
	/* 隐藏layout部分*/
		$scope.$parent.j_islogin = false;
		$scope.register = function () {
			var username = $scope.username;
			var password = $scope.password;
			$sails.post("/user/create", {username: username,password: password}).success(function (res) {
						//alert('---user---'+user.username);
						//successful
						if(0 == res.sts){													    
						    $location.path('/login');
						}													
						else if(1 == res.sts){
							//user exist already do not need register							
							$location.path('/login');							
						}else{
							//register error navgiate register error
							$location.path('/register');
						}
			})
			.error(function (data) {
				alert('Houston, we got a problem!');
			});
		};
	
}]);
