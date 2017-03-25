'use strict';

/* Controllers */
app.controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
    $rootScope.user = {};
    $scope.authError = null;

    $scope.login = function() {
        $http({
            method: 'POST',
            url: '/signin/checkUser',
            data: {
                account:    $scope.input.account,
                password:   $scope.input.password
            }
        }).then(function success(res) {
            if(res.data.code === 200) {
                $rootScope.user = res.data.user;
                $state.go('app._dashboard');
            } else if(res.data.code === 300) {
                $scope.authError = 'Account or Password not right';
            } else if(res.data.code === 500) {
                $scope.authError = 'Sorry, Server Error';
            } else {
                $scope.authError = 'Unknown Error';
            }
        }, function error(err) {
            $scope.authError = 'Unknown Error';
        });
    };
  }])
;