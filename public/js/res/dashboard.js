/**
 * Created by philic on 2017/4/11.
 */

app.controller('DashboardCtrl', ['$http', '$scope', '$modal', '$state', function( $http, $scope, $modal, $state){
    $scope.convert = function(str) {
        if(str && str.length >= 13) {
            str = str.slice(0, 12);
            str += '...';
        }
        return str;
    };
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
        url: '/mission/getAllMissionIntros',
        data: {}
    }).then(function success(res) {
        res.data.missions.map(function(mission) {
            mission.date = $scope.convert(mission.date);
            mission.info = $scope.convert(mission.facility);
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
        $scope.missionInfo = {};
        var addMissionModalInstance = $modal.open({
            templateUrl: 'MissionInfo',
            controller: 'MissionInfoModalCtrl',
            size: 'lg',
            resolve: {
                missionInfo: function () {
                    return $scope.missionInfo;
                },
                category: function () {
                    return 'SINGLE';
                }
            }
        });
        addMissionModalInstance.result.then(function (resMission) {
            console.log(resMission);
            var reqMission = {};
            reqMission.category = resMission.category;
            reqMission.mission = {
                index: resMission.mission.index,
                uid: resMission.mission.uid,
                facility: resMission.mission.facility,
                abstract: resMission.mission.abstract
            };
            if(resMission.category === 'SINGLE') {

            } else {
                reqMission.mission.category = resMission.mission.category;
                reqMission.mission.dates = resMission.mission.dates;
            }
            console.log(reqMission);
            $http({
                method: 'POST',
                url: '/mission/commitMission',
                data: reqMission
            }).then(function success(res) {
                console.log(res);
                //$state.reload();
            });
        }, function(){
            console.log('dismissed');
        });
    };


    $scope.itemClick = function(e) {
        //console.log('this key down');
    };

    $scope.itemClick2 = function(e) {
        //console.log(e.target.parentNode.parentNode);
        //console.log('this key down 2');
    };
}]);


app.controller('MissionInfoModalCtrl', ['$scope', '$modalInstance', 'missionInfo', 'category', '$http', function($scope, $modalInstance, missionInfo, category, $http) {
    console.log('mission modal loaded');
    $scope.missionCtrl = $scope;
    $scope.missionCtrl.dayVals = ['周日','周一','周二','周三','周四','周五','周六'];
    $scope.missionCtrl.initUid = '';
    $scope.missionCtrl.facility = "";
    $scope.missionCtrl.missionInfo = missionInfo;
    $scope.missionCtrl.category = 'SINGLE';
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
        data: {category: "SINGLE"}
    }).then(function success(res){
        $scope.missionCtrl.singleIndex = res.data.index;
        $scope.missionCtrl.singleUid = 'MS-S-' + res.data.index;
        $scope.missionCtrl.missionInfo.uid = $scope.missionCtrl.singleUid;
    }).then($http({
        method: 'POST',
        url: "/mission/createMission",
        data: {category: "ROLL"}
    }).then(function success(res){
        $scope.missionCtrl.rollIndex = res.data.index;
        $scope.missionCtrl.rollUid = 'MS-R-' + res.data.index;
    }));

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
        if($scope.missionCtrl.category === 'ROLL') {
            var dates = [];
            switch($scope.missionCtrl.missionLoop.type) {
                case 'DAY':
                    break;
                case 'WEEK':
                    for(var i=0;i<7;i++) {
                        if($scope.missionCtrl.missionLoop.days[i].chosen) {
                            dates.push(i);
                        }
                    }
                    break;
                case 'MONTH':
                    dates = $scope.missionCtrl.missionLoop.month.val;
                    break;
                default:
                    break;
            }
            $scope.missionCtrl.missionInfo.dates = dates;
            $scope.missionCtrl.missionInfo.category = $scope.missionCtrl.missionLoop.type;
        }
        $modalInstance.close({
            mission: $scope.missionCtrl.missionInfo,
            category: $scope.missionCtrl.category
        });
    };

    $scope.cancel = function() {
        console.log('modal cancel clicked');
        $modalInstance.dismiss('cancel');
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
            $scope.missionCtrl.missionInfo.index = $scope.missionCtrl.singleIndex;
            $scope.missionCtrl.missionInfo.uid = $scope.missionCtrl.singleUid;
        }
    };

    $scope.changeCateToRoll = function() {
        if($scope.missionCtrl.missionInfo) {
            $scope.missionCtrl.missionInfo.index = $scope.missionCtrl.rollIndex;
            $scope.missionCtrl.missionInfo.uid = $scope.missionCtrl.rollUid;
        }
    };
}]);