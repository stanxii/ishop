'use strict';

angular.module('myApp.coder.profile.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coder/profile/edit', {
    templateUrl: 'app/coder/profile/edit/edit.html',
    controller: 'EditProfileCtrl'
  });
}])

.controller('EditProfileCtrl', ['$scope', '$http', '$sails', '$location', '$window', '$upload', 'UserService', 'AuthenticationService', 'fakeQueryService',
	function($scope, $http, $sails, $location, $window, $upload, UserService, AuthenticationService, fakeQueryService) {
	/* 隐藏layout部分*/

    $scope.saveChanges = function() {
      if($window.sessionStorage.user){
        var user= JSON.parse($window.sessionStorage.getItem('user'));

        var profile = {
          uid: user.uid,
          personalInfo: {
            name: "stanhangzhou"
          },
          jobPreferences: {
            'skills': ['c', 'c++','object c', 'java', 'android', 'java script']
          },
          education: {},
          workHistory: {},
          summary: {}
        };

        $http.post('/api/v1/profile/edit', {profile: profile});
      }else{
        console.log('profile sav change error has no user');
      }
    };

    $scope.onFileSelect = function($files) {
      for (var i = 0; i < $files.length; i++)
      {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'app/images/',
          method: 'POST',
          //headers: {'header-key': 'header-value'},
          //withCredentials: true,
          data: $scope.user.photo,
          file: file // or list of files ($files) for html5 only
          //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
          // customize file formData name ('Content-Disposition'), server side file variable name.
          //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
          // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          console.log(data);
        });
      }
    };

		//$http.get('/profile/');
		console.log('kkkk');

}]);
