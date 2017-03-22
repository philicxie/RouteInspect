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
        var userModalInstance = $modal.open({
            templateUrl: 'NewUser',
            controller: 'NewUserModalCtrl',
            size: '',
            resolve: {
                newUser: function () {
                    return $scope.newUser;
                }
            }
        });
        userModalInstance.result.then(function (resUser){
            console.log(resUser);
        }, function(){
            console.log('dismissed');
        })
    }
    $scope.pageSync = function() {
        console.log('page sync click');
    }
}]);


app.controller('NewUserModalCtrl', ['$scope', '$modalInstance', 'newUser', function($scope, $modalInstance, newUser) {
    console.log('modal loaded');
    // console.log(newUser);
    // $scope.newUser = newUser;
    //console.log(newUser);
    // $scope.tem = 'fewfwe';
    // console.log($scope.tem);

    $scope.tem = $scope;
    $scope.tem.newUser = newUser;
    $scope.ok = function () {
        //console.log($scope.newUser);

        //console.log($scope.tem);
        console.log($scope.tem.newUser);
        $modalInstance.close($scope.tem.newUser);
    };

    $scope.cancel = function () {
        console.log($scope.tem);
        $modalInstance.dismiss('cancel');
    };

    $scope.changeAdmin = function() {
        $scope.tem.newUser.au_admin = !$scope.tem.newUser.au_admin;
    };
    $scope.changeManager = function() {
        $scope.tem.newUser.au_manager = !$scope.tem.newUser.au_manager;
    };
    $scope.changeClerk = function() {
        $scope.tem.newUser.au_clerk = !$scope.tem.newUser.au_clerk;
    };
}]);