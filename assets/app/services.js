
var appServices = angular.module('myApp.appServices', []);

appServices.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }

    return auth;
});

appServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
});


appServices.factory('UserService', function ($http) {
    return {
        signIn: function(usermail, password, confirmPassword, role) {
            return $http.post('/api/v1/account/signin', {username: usermail, password: password, confirmPassword: confirmPassword});
        },

        logOut: function() {
            return $http.get('/user/logout');
        },

        register: function(usermail, location, password, confirmPassword, role) {
            //return $http.post(options.api.base_url + '/api/v1/account/register', {usermail: usermail, password: password, passwordConfirmation: passwordConfirmation, role:role });
            return $http.post('/api/v1/account/register', {usermail: usermail, location: location, password: password, confirmPassword: confirmPassword, role:role });
        }
    }
});


appServices.factory('fakeQueryService', function($timeout, $q) {
  var FAKE_TIMEOUT = 2000;
  return function(username, fakeInvalidData) {
    var defer = $q.defer();
    $timeout(function() {
      fakeInvalidData.indexOf(username) == -1
        ? defer.resolve()
        : defer.reject();
    }, FAKE_TIMEOUT);
    return defer.promise;
  }
});

// appServices.factory('ProfileService', function ($http) {
//     return {
//         signIn: function(usermail, password,role) {
//             return $http.post('/api/v1/account/signin', {username: usermail, password: password, role:role});
//         },

//         logOut: function() {
//             return $http.get('/user/logout');
//         },

//         register: function(usermail, password, passwordConfirmation, role) {
//             //return $http.post(options.api.base_url + '/api/v1/account/register', {usermail: usermail, password: password, passwordConfirmation: passwordConfirmation, role:role });
//             return $http.post('/api/v1/account/register', {usermail: usermail, password: password, passwordConfirmation: passwordConfirmation, role:role });
//         }
//     }
// });

