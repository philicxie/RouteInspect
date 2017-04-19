/**
 * Created by philic on 2017/4/11.
 */

app.controller('DashboardCtrl', ['$http', '$scope', '$modal', '$state', function( $http, $scope, $modal, $state){
    console.log($scope.user);
    $scope.startColumn = {};
    $scope.endColumn = {};
    $scope.targetMission = {};
    $scope.planningMission = [];
    $scope.processingMission = [];
    $scope.confirmingMission = [];
    $scope.completedMission = [];

    $http({
        method: 'post',
        url: 'getAllMissions',
        data: {}
    }).then(function success(res) {
        console.log(res);
        res.data.map(function(mission) {
            switch(mission.status) {
                case 'PLANNING':
                    $scope.planningMission.push(mission);
                    break;
                case 'PROCESSING':
                    $scope.processingMission.push(mission);
                    break;
                case 'CONFIRMING':
                    $scope.confirmingMission.push(mission);
                    break;
                case 'COMPLETED':
                    $scope.completedMission.push(mission);
                    break;
                default:
                    break;
            }
        });
    });

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


    $scope.itemClick = function(e) {
        //console.log('this key down');
    };

    $scope.itemClick2 = function(e) {
        //console.log(e.target.parentNode.parentNode);
        //console.log('this key down 2');
    };
}]);


app.controller('MissionInfoModalCtrl', ['$scope', '$modalInstance', 'isNew', 'missionInfo', '$http', function($scope, $modalInstance, isNew, missionInfo, $http) {
    console.log('mission modal loaded');
    $scope.missionCtrl = $scope;
    $scope.missionCtrl.dayVals = ['周日','周一','周二','周三','周四','周五','周六'];
    $scope.missionCtrl.initUid = '';
    $scope.missionCtrl.facility = "";
    $scope.missionCtrl.isNew = isNew;
    $scope.missionCtrl.missionInfo = missionInfo;
    $scope.missionCtrl.missionInfo.category = 0;
    $scope.missionCtrl.missionLoop = {};
    $scope.missionCtrl.missionLoop.month = {};
    $scope.missionCtrl.missionLoop.month.days = [];
    $scope.missionCtrl.missionLoop.days = [];
    for(var i=0;i<7;i++) {
        $scope.missionCtrl.missionLoop.days.push({
            chosen: false,
            value: $scope.missionCtrl.dayVals[i]
        });
    }
    for(var i=0;i<31;i++) {
        $scope.missionCtrl.missionLoop.month.days.push(i+1);
    }
    $http({
        method: 'POST',
        url: '/mission/createMission',
        data: {}
    }).then(function success(res){
        $scope.missionCtrl.initUid = res.data.uid;
        $scope.missionCtrl.missionInfo.uid = 'MS-S-' + $scope.missionCtrl.initUid;

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
        console.log($scope.missionCtrl.missionLoop);
        //$modalInstance.close($scope.missionCtrl.missionInfo);
    };

    $scope.cancel = function() {
        console.log('modal cancel clicked');
        $http({
            method: 'POST',

            
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
        $event.stopPropagation();
        $scope.missionCtrl.opened = true;
    };

    $scope.changeCateToSingle = function() {
        if($scope.missionCtrl.missionInfo) {
            $scope.missionCtrl.missionInfo.uid = 'MS-S-'+$scope.missionCtrl.initUid;
        }
    };

    $scope.changeCateToRoll = function() {
        if($scope.missionCtrl.missionInfo) {
            $scope.missionCtrl.missionInfo.uid = 'MS-R-'+$scope.missionCtrl.initUid;
        }
    };
}]);