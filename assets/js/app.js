'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
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
  $routeProvider.when('/index', {templateUrl: 'partials/index.html', controller: 'MyCtrl1'});
  $routeProvider.when('/logout', {templateUrl: 'partials/logout.html', controller: 'logoutCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/register.html', controller: 'regCtrl'});
  $routeProvider.when('/userinfo', {templateUrl: 'partials/userinfo.html', controller: 'userinfoCtrl'});
  $routeProvider.when('/changeP', {templateUrl: 'partials/changeP.html', controller: 'userinfoCtrl'});
  $routeProvider.when('/user/address', {templateUrl: 'partials/address.html', controller: 'addressCtrl'});
  $routeProvider.when('/cart', {templateUrl: 'partials/cart.html', controller: 'cartCtrl'});
  $routeProvider.when('/order', {templateUrl: 'partials/order.html', controller: 'orderCtrl'});
  $routeProvider.when('/pro_a', {templateUrl: 'partials/product_a.html', controller: ''});
  $routeProvider.when('/pro_b', {templateUrl: 'partials/product_b.html', controller: ''});
  $routeProvider.when('/goods/c1', {templateUrl: 'partials/goods/c1.html', controller: 'goodsCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
  $routeProvider.otherwise({redirectTo: '/index'});
}]); 
