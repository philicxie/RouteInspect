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
        var addMissionModalInstance = $modal.open({
            templateUrl: 'MissionInfo',
            controller: 'MissionInfoModalCtrl',
            size: 'lg',
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

        }, function(){
            console.log('dismissed');
        });
    }

}]);


app.controller('MissionInfoModalCtrl', ['$scope', '$modalInstance', 'isNew', 'missionInfo', '$http', function($scope, $modalInstance, isNew, missionInfo, $http) {
    console.log('mission modal loaded');
    $scope.missionCtrl = $scope;

    $scope.missionCtrl.initUid = '';
    $scope.missionCtrl.facility = "";
    $scope.missionCtrl.isNew = isNew;
    $scope.missionCtrl.missionInfo = missionInfo;
    $scope.missionCtrl.missionInfo.category = 0;
    $scope.missionCtrl.missionLoop = {};
    $scope.missionCtrl.missionLoop.month = {};
    $scope.missionCtrl.missionLoop.month.days = [];
    for(var i=0;i<31;i++) {
        $scope.missionCtrl.missionLoop.month.days.push(i+1);
    }
    $http({
        method: 'POST',
        url: '/mission/createMission',
        data: {}
    }).then(function success(res){
        console.log(res.data.uid);
        $scope.missionCtrl.initUid = res.data.uid;
        $scope.missionCtrl.missionInfo.uid = 'MS-' + $scope.missionCtrl.initUid;

    });
    $scope.missionCtrl.env = {};
    $http({
        method: 'POST',
        url: '/mission/getAllManager',
        data: ''
    }).then(function success(res) {
        $scope.missionCtrl.env.managers = res.data;
    }).then($http({
        method: 'POST',
        url: '/mission/getAllWorker',
        data: ''
    }).then(function success(res) {
        $scope.missionCtrl.env.workers = res.data;
    }).then($http({
        method: 'POST',
        url: '/mission/getAllFacility',
        data: ''
    }).then(function success(res) {
        $scope.missionCtrl.env.facilities = res.data;
    })));

    $scope.missionCtrl.dateOptions = {
        formatYear: 'yy',
        startingDay: 10,
        class: 'datepicker'
    };
    $scope.missionCtrl.format = 'yyyy-MM-dd';

    $scope.ok = function() {
        console.log('mission info modal closed');
        console.log($scope.missionCtrl.missionInfo);
        //$modalInstance.close($scope.missionCtrl.missionInfo);
    };
    
    $scope.cancel = function() {
        console.log('modal cancel clicked');
        $http({
            method: 'POST',
            url: '/mission/dismissMission',
            data: {uid: $scope.initUid}
        }).then(function success(res){
            console.log(res);
            $modalInstance.dismiss('cancel');
        });
    };

    $scope.today = function() {
        $scope.missionCtrl.missionInfo.date = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.missionCtrl.missionInfo.date = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.missionCtrl.minDate = $scope.missionCtrl.minDate ? null : new Date();
        $scope.missionCtrl.maxDate = $scope.missionCtrl.maxDate ? null : new Date();
        $scope.missionCtrl.maxDate.setFullYear($scope.missionCtrl.maxDate.getFullYear()*1+1);
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        console.log('data click');
        $event.stopPropagation();

        $scope.missionCtrl.opened = true;
    };
}]);

