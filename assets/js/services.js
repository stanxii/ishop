'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services') 
  .factory('socket', function ($rootScope) {
	  var socket = io.connect('http://192.168.1.249:1337');
	  return {
		  on: function (eventName, callback) {
			  socket.on(eventName, function () {
				  var args =arguments;
				  $rootScope.$apply(function () {
					  callback.apply(socket, args);
				  });
			  });
		  },
	          emit: function (eventName, data, callback) {
			  socket.emit(eventName, data, function () {
				  var args = arguments;
				  $rootScope.$apply(function () {
					  if(callback) {
						  callback.apply(socket, args);
					  }
				  });
			  });
		  }
           };
  });	


