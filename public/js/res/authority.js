/**
 * Created by philic on 2017/3/22.
 */
app.controller('UserInfoCtrl', ['$http', '$scope', '$modal', function( $http, $scope, $modal){

    $scope.users = [];
    $http({
        method: 'POST',
        url: '/authority/getAllUsers',
        data: {}
    }).then(function success(res){
        res.data.map(function(item){
            $scope.users.push({
                _id: item._id,
                account: item.account,
                name: item.name,
                au_admin:   Math.round(item.auth/100)%2?true:false,
                au_manager: Math.round(item.auth/10 )%2?true:false,
                au_clerk:   Math.round(item.auth    )%2?true:false
            });
        });
    });
    $scope.addUser = function() {
        $scope.newUser = {
            name: "",
            account: "",
            au_admin: false,
            au_manager: false,
            au_clerk: false
        };
        console.log('add user click');
        var addUserModalInstance = $modal.open({
            templateUrl: 'NewUser',
            controller: 'NewUserModalCtrl',
            size: '',
            resolve: {
                newUser: function () {
                    return $scope.newUser;
                }
            }
        });
        addUserModalInstance.result.then(function (resUser){
            console.log(resUser);
        }, function(){
            console.log('dismissed');
        })
    };
    $scope.rmUser = function(userId) {
        console.log('rm user clicked' + userId);
        var rmUserModalInstance = $modal.open({
            templateUrl: 'RmUser',
            controller: 'RmUserModalCtrl',
            size: ''
        });
        rmUserModalInstance.result.then(function() {
            $http({
                method: 'POST',
                url: '/authority/rmUserById',
                data: userId
            });
        }, function() {
            console.log('dismissed');
        })
    };
    $scope.pageSync = function() {
        console.log('page sync click');
    }
}]);


app.controller('NewUserModalCtrl', ['$scope', '$modalInstance', 'newUser', function($scope, $modalInstance, newUser) {
    console.log('modal loaded');
    $scope.temNew = $scope;
    $scope.temNew.newUser = newUser;
    $scope.ok = function () {
        console.log($scope.temNew.newUser);
        $modalInstance.close($scope.temNew.newUser);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.changeAdmin = function() {
        $scope.temNew.newUser.au_admin = !$scope.temNew.newUser.au_admin;
    };
    $scope.changeManager = function() {
        $scope.temNew.newUser.au_manager = !$scope.temNew.newUser.au_manager;
    };
    $scope.changeClerk = function() {
        $scope.temNew.newUser.au_clerk = !$scope.temNew.newUser.au_clerk;
    };
}]);

app.controller('RmUserModalCtrl', ['$scope', '$modalInstance', 'rmUser', function($scope, $modalInstance, rmUser) {
    console.log('rm user modal loaded');
    $scope.temRm = $scope;
}])