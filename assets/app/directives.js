
var appDirectives = angular.module('myApp.appDirectives', []);

appDirectives.directive('fakeRemoteRecordValidator', ['$timeout', 'fakeQueryService', function($timeout, fakeQueryService) {
  return {
    require: 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      var seedData = scope.$eval(attrs.fakeRemoteRecordValidator);
      ngModel.$parsers.push(function(value) {
        valid(false);
        loading(true);
        fakeQueryService(value, seedData).then(
          function() {
            valid(true);
            loading(false);
          },
          function() {
            valid(false);
            loading(false);
          }
        );
        return value;
      });

      function valid(bool) {
        ngModel.$setValidity('record-taken', bool);
      }

      function loading(bool) {
        ngModel.$setValidity('record-loading', !bool);
      }
    }
  }
}]);

appDirectives.directive('matchValidator', function() {
  return {
    require: 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        ngModel.$setValidity('match', value == scope.$eval(attrs.matchValidator));
        return value;
      });
    }
  }
});

appDirectives.directive('passwordCharactersValidator', function() {
  var PASSWORD_FORMATS = [
    /[^\w\s]+/, //special characters
    /[A-Z]+/, //uppercase letters
    /\w+/, //other letters
    /\d+/ //numbers
  ];

  return {
    require: 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        var status = true;
        angular.forEach(PASSWORD_FORMATS, function(regex) {
          status = status && regex.test(value);
        });
        ngModel.$setValidity('password-characters', status);
        return value;
      });
    }
  }
});

