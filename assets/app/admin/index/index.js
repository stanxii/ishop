'use strict';

angular.module('myApp.admin.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin/index', {
    templateUrl: 'app/admin/index/index.html',
    controller: 'AdminIndexCtrl'
  });
}])

.controller('AdminIndexCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location) {

		$scope.user = sessionStorage.getItem("user");

		//check if user is login in session

}]);
