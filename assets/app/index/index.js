'use strict';

angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: 'app/index/index.html',
    controller: 'IndexCtrl'
  });
}])

.controller('IndexCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location) {
	/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$sails.get('/user/checklogin').success(function (user) {
			//获取购物车信息
			if(user.name){
				$scope.userid = user.id;
				$sails.get("/cart/count").success(function (num) {
					if(num.sts == 0){
						$scope.count =  num.num ;
					}else{
						$scope.count = 0;
					}
				});
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});
}]);
