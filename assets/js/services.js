'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
  
angular.module('myApp.services', [])
.factory('getJs', [ '$route', '$q', function( $route, $q){
        return function(){
            var delay = $q.defer(),
            load = function(){
                $.getScript('/js/bp.js',function(){               
                });
            };
            load();
            return delay.promise;  
        };
}]);
/* angular.module('myApp.services',[])
.factory('getLoginJs', ['$route', '$q', function($scope, $q){
        return function(){
            var delay = $q.defer(),
            load = function(){
                $.getScript('/htmlJs/login.js',function(){                    
                            delay.resolve();                                
                });
            };
            load();
            return delay.promise;  
        };
}]); */

