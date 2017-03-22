/**
 * Created by philic on 2017/3/22.
 */
app.controller('UserInfoCtrl', ['$scope', function($scope){
    console.log('load here');
    //var d = $("#userTable").DataTable();

    $scope.button_click = function(index) {
        console.log(index);
    }
}]);