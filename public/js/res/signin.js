'use strict';

/* Controllers */
app.controller('SigninFormController', ['$scope', '$http', '$state', '$rootScope', '$localStorage', function($scope, $http, $state, $rootScope, $localStorage) {
    $rootScope.user = {};
    $rootScope.user.notes = [];
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
                $localStorage.user = res.data.user;
                $http({
                    method: 'POST',
                    url: '/notification/getNotificationsOnUser',
                    data: {userId: res.data.user._id}
                }).then(function success(res){
                    console.log(res);
                    if(res.data.code === 200) {
                        $rootScope.user.notes = res.data.notification;
                    }
                });
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