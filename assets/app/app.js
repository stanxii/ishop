'use strict';


var options = {};
options.api = {};
options.api.base_url = "http://192.168.1.249:1337";

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngSails',
  'ngRoute',
  'myApp.index',
  'myApp.login',
  'myApp.register',
  'myApp.version',
  'myApp.admin.index',
  'myApp.appServices'
]).
config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}).
config(['$sailsProvider', function ($sailsProvider) {
	    $sailsProvider.url = 'http://192.168.1.249:1337';
		
}]). 
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index'});
}]).
run(function($rootScope, $location, $window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
            && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {

            $location.path("/admin/login");
        }
    });
});
