'use strict';

angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: 'app/index/index.html',
    controller: 'IndexCtrl'
  });
}])

.controller('IndexCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location) {
	
		$scope.username = sessionStorage.getItem("username");

		//check if user is login in session
		if($scope.username){
			$scope.$parent.j_islogin = true;
			//获取购物车信息
			
			$scope.uid = sessionStorage.getItem("uid");
			$sails.post("/cart/count",{uid: $scope.uid}).success(function (res) {
				if(res.sts == 0){
					$scope.count =  num.num ;
				}else{
					$scope.count = 0;
				}
			});
			
        };
}])

.controller('CarouselDemoCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location ) {	
		$scope.myInterval = 5000;
		var slides = $scope.slides = [];
		$scope.addSlide = function() {
			var newWidth = 600 + slides.length;
			slides.push({
			    image: 'app/img/' + slides.length + '.png',
			    text: ['小米','大锤','Lots of','Surplus'][slides.length % 4] + ' ' +
				['电视', 'C1', 'Felines', 'Cutes'][slides.length % 4],
				url: ['#/goods/mitv','#/pro_a','#','#'][slides.length % 4]
			});
		};
	    for (var i=0; i<4; i++) {
			$scope.addSlide();
	    }
}]);
