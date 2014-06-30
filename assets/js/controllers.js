'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', '$sails','socket',  function($scope, $sails, socket) {
	socket.emit('/bao/create', {
		message: 'hi there!'
	}, function (response) {
		console.log(response);
	});
  }])
  .controller('MyCtrl2', ['$scope', '$sails','socket', function($scope, $sails, socket) {
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
