'use strict';

angular.module('myApp.admin.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/index', {
    templateUrl: 'app/admin/index/index.html',
    controller: 'AdminIndexCtrl'
  });
}])

.controller('AdminIndexCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location) {

		$scope.username = sessionStorage.getItem("username");

		//check if user is login in session

}]);
