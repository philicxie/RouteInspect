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
        console.log(res.data);
        res.data.map(function(item){
            $scope.users.push({
                account: item.account,
                name: item.name,
                au_admin:   Math.round(item.auth/100)%2?true:false,
                au_manager: Math.round(item.auth/10 )%2?true:false,
                au_clerk:   Math.round(item.auth    )%2?true:false
            });
        });
        console.log($scope.users);
    });
    console.log('load here');
    $scope.addUser = function() {
        console.log('add user click');
        $modal.open({
            templateUrl: 'NewUser',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });
    }
    $scope.pageSync = function() {
        console.log('page sync click');
    }
}]);


app.controllerapp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance',  function($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.dismiss('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);