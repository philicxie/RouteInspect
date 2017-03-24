'use strict';

/* Controllers */
app.controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
    $rootScope.user = {};
    $scope.authError = null;

    $scope.login = function() {
        $rootScope.user.name = 'fewjiofD';
        $state.go('app._dashboard');

        $scope.authError = null;
      //   $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      //       .then(function(response) {
      //       if ( !response.data.user ) {
      //           $scope.authError = 'Email or Password not right';
      //       }else{
      //           $state.go('app._dashboard');
      //       }
      //   }, function(x) {
      //       $scope.authError = 'Server Error';
      //   });
    };
  }])
;