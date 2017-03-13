'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    //$state.go('app.dashboard-v2');
    $scope.user = {};
    $scope.authError = null;

    $scope.login = function() {
        $state.go('app._dashboard');
        $scope.authError = null;
      // Try to login
        $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
            if ( !response.data.user ) {
                $scope.authError = 'Email or Password not right';
            }else{
                $state.go('app.dashboard-v2');
            }
        }, function(x) {
            $scope.authError = 'Server Error';
        });
    };
  }])
;