'use strict';

angular.module('myApp.login', ['ngRoute','ngMessages'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    });
  }])

  .controller('LoginCtrl', ['$scope', '$http', '$sails', '$location', '$window', 'UserService', 'AuthenticationService',
    function($scope, $http, $sails, $location, $window, UserService, AuthenticationService) {
    /* 隐藏layout部分*/
    $scope.$parent.j_islogin = false;

    $scope.signIn = function (usermail, password, role) {
              if (usermail != null && password != null && role !=null) {

                  UserService.signIn(usermail, password).success(function(data) {

                      console.log('signIn login result' + data)

                      if(data.success){
                        AuthenticationService.isAuthenticated = true;
                        $window.sessionStorage.user = JSON.stringify(data.user);
                        $window.sessionStorage.setItem('token', data.token);
                        $location.path("/coder/profile");
                      }else{
                        console.log('sigin err')
                        $location.path("/");
                      }



                      // if("coder" == data.user.role){
                      // 	$location.path("/coder/basic");
                      // }
                      // else if("hr" == data.user.role){
                      // 	$location.path("/hr/company");
                      // }
                      // else
                      // 	$location.path("/");

                  }).error(function(status, data) {
                      console.log(status);
                      console.log(data);
                  });
              }
          };
      $scope.fakeEmails = [
        'email@email.com',
        'email@gmail.com',
        'email@website.com',
        'jon@gmail.com',
        'fake@gmail.com',
        'fake@email.com'
      ];
      $scope.submitted = false;
      $scope.submit = function() {
        $scope.submitted = true;
      };
      $scope.interacted = function(field) {
        return $scope.submitted || field.$dirty;
      };
  /////////////////////////////////////////
    // $scope.login = function () {
    // 	var user = {
    // 		username: $scope.username,
    // 		password: $scope.password,
    // 		remember: $scope.remember
    // 	};
    // 	$http.post("/auth/local/", user).success(function (data) {

    // 		if(!data || data.success==false){
   //                alert("Failed Login");
   //            }else{
   //                alert("Successful login");
   //                sessionStorage.token = data.token;
   //                sessionStorage.user = JSON.stringify(data.user);

   //                $location.path("/");
   //            }

    // 		//test2

   //            //test
    // 		$http.get("http://localhost:1337/user")
    // 		    .success(function (data){
    //                 alert(JSON.stringify(data));
    //             })
    //             .error(function (err) {
    //                 alert("Authorization failed" + err);
    //             });

    // 	})
    // 	.error(function (res) {
    // 		alert('Login, we got a problem!');
    // 	});
    // };
  }]);




