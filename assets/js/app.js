'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'ngSails',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
 .config(['$sailsProvider', function ($sailsProvider) {
	    $sailsProvider.url = 'http://localhost:1337';
		
}]) 
 .config(['$routeProvider', function($routeProvider) {
	app.resolveScriptDeps = function(dependencies){
		return function($q,$rootScope){
			var deferred = $q.defer();
			$script(dependencies, function() {
				// all dependencies have now been loaded by $script.js so resolve the promise
				$rootScope.$apply(function()
				{
					deferred.resolve();
				});
			});
 
			return deferred.promise;
		}
	};
  $routeProvider.when('/index', {templateUrl: 'partials/index.html', controller: 'MyCtrl1'});
  $routeProvider.when('/logout', {templateUrl: 'partials/logout.html', controller: 'logoutCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/register.html', controller: 'regCtrl'});
  $routeProvider.when('/userinfo', {templateUrl: 'partials/userinfo.html', controller: 'userinfoCtrl'});
  $routeProvider.when('/changeP', {templateUrl: 'partials/changeP.html', controller: 'userinfoCtrl'});
  $routeProvider.when('/user/address', {templateUrl: 'partials/address.html', controller: 'addressCtrl'});
  $routeProvider.when('/cart', {templateUrl: 'partials/cart.html', controller: 'cartCtrl'});
  $routeProvider.when('/order', {templateUrl: 'partials/order.html', controller: 'orderCtrl'});  
  $routeProvider.when('/buy/checkout', {templateUrl: 'partials/checkout.html', controller: 'addressCtrl'});
  $routeProvider.when('/buy/confirm', {templateUrl: 'partials/confirm.html', controller: 'confirmCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
  
  $routeProvider.when('/pro_a', {templateUrl: 'partials/product_a.html', controller: ''});
  $routeProvider.when('/pro_b', {templateUrl: 'partials/product_b.html', controller: ''});
  $routeProvider.when('/goods/mobile', {
										templateUrl: 'partials/goods/buymobile.html',
										controller: 'goodsMobileCtrl', 
										resolve: {
											deps: app.resolveScriptDeps([
												'js/bp.js'
											])
										}
									}
  );
  $routeProvider.when('/static/buyTV', {templateUrl: 'partials/goods/buytv.html', controller: 'goodsTvCtrl'});
  $routeProvider.when('/goods/mitv', {templateUrl: 'partials/goods/mitv.html', controller: ''});
  $routeProvider.when('/test', {templateUrl: 'partials/test.html', controller: 'testCtrl'});
  $routeProvider.otherwise({redirectTo: '/index'});
}]); 
