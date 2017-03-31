/**
 * Created by philic on 2017/3/30.
 */

app.controller('MissionInfoCtrl', ['$http', '$scope', '$modal', '$state', function( $http, $scope, $modal, $state){
    $scope.oneAtATime = true;
    $scope.addMission = function() {
        $scope.missionInfo = {
            uid: "",
            facility: [],
            manager: '',
            worders: [],
            category: '',
            status: '',
            abstract: '',
            date: '',
            time: ''
        };
        console.log('add mission click');
        var addMissionModalInstance = $modal.open({
            templateUrl: 'MissionInfo',
            controller: 'MissionInfoModalCtrl',
            size: '',
            resolve: {
                isNew: function () {
                    return true;
                },
                missionInfo: function () {
                    return $scope.missionInfo;
                }
            }
        });
        addMissionModalInstance.result.then(function (resMission) {
            console.log(resMission);
            // $http({
            //     method: 'POST',
            //     url: '/authority/addUser',
            //     data: resUser
            // }).then(function success(res){
            //     resUser._id = res.data;
            //     $scope.users.push(resUser);
            // }, function(err){
            //     console.log(err);
            // });
        }, function(){
            console.log('dismissed');
        });
    }

}]);


app.controller('MissionInfoModalCtrl', ['$scope', '$modalInstance', 'isNew', 'missionInfo', function($scope, $modalInstance, isNew, missionInfo) {

}]);

