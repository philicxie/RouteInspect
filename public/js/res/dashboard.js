/**
 * Created by philic on 2017/4/11.
 */

app.controller('DashboardCtrl', ['$http', '$scope', '$modal', '$state', function( $http, $scope, $modal, $state){
    console.log($scope.user);
    $scope.itemClick = function() {
        console.log('this key down');
    }
}]);