'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$sails',  function($scope, $sails ) {
  }])
  .controller('MyCtrl2', ['$scope', '$sails', function($scope, $sails ) {
	  $sails.get("/bao/create")
	     .success(function (data) {
	        $scope.bars = data;
	     })
	     .error(function (data) {
	        alert('Houston, we got a problem!');
	     });

           $sails.on("message", function (message) {
	      $scope.message = message;
	      console.log(message);
	   });
	   
		/*
		if (message.verb === "create") {
	              $scope.bars.push(message.data);
		 }
		 */

  }]);
