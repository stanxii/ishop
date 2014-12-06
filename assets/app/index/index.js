'use strict';

angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: 'app/index/index.html',
    controller: 'IndexCtrl'
  });
}])

.controller('IndexCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location) {
	
		
	$scope.logout = function () {
		sessionStorage.token=null;
        $.get("http://localhost:1337/auth/logout", function(data){
            alert("Logged out!"); 
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
