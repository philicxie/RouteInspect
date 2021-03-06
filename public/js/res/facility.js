/**
 * Created by philic on 2017/3/20.
 */
app.controller('FacilityCtrl', ['$scope', '$http', '$filter', '$modal', function($scope, $http, $filter, $modal) {
    // $http.get('js/app/contact/contacts.json').then(function (resp) {
    //     $scope.items = resp.data.items;
    //     $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    //     $scope.item.selected = true;
    // });

    $http({
        method: 'POST',
        url: '/facility/getFacilityCates',
        data: {}
    }).then(function success(res){
        console.log(res);
        $scope.cates = res.data;
        $scope.groups = [];
        $scope.options = $scope.cates;
        $scope.hstep = $scope.options[0];
        res.data.map(function(item){
            $scope.groups.push({name: item});
        });
        $scope.groups[0].selected = true;
        $http({
            method: 'POST',
            url: '/facility/getAllFacility',
            data: {}
        }).then(function success(res){
            console.log(res);
            $scope.items = res.data;
            $scope.item = $filter('orderBy')($scope.items, 'uid')[0];
            $scope.group = $scope.item.name;
            $scope.item.selected = true;
            $scope.filters = $scope.item.name;
        });
    });



    $scope.checkItem = function(obj, arr, key){
        var i=0;
        angular.forEach(arr, function(item) {
            if(item[key].indexOf( obj[key] ) == 0){
                var j = item[key].replace(obj[key], '').trim();
                if(j){
                    i = Math.max(i, parseInt(j)+1);
                }else{
                    i = 1;
                }
            }
        });
        return obj[key] + (i ? ' '+i : '');
    };

    $scope.selectGroup = function(item){
        angular.forEach($scope.groups, function(item) {
            item.selected = false;
        });
        $scope.group = item;
        $scope.group.selected = true;
        $scope.filters = item.name;
        $scope.hstep = item.name;
    };

    $scope.selectItem = function(item){
        angular.forEach($scope.items, function(item) {
            item.selected = false;
            item.editing = false;
        });
        $scope.item = item;
        $scope.item.selected = true;
    };

    $scope.deleteItem = function(item){
        $scope.items.splice($scope.items.indexOf(item), 1);
        $scope.item = $filter('orderBy')($scope.items, 'uid')[0];
        if($scope.item) $scope.item.selected = true;
    };

    $scope.createItem = function(){
        var item = {
            group: $scope.group,
            uid: '2333'
        };
        $scope.items.push(item);
        $scope.selectItem(item);
        $scope.item.editing = true;

        $modal.open({
            templateUrl: 'NewFacility',
            controller: 'ModalInstanceCtrl',
            size: 'lg'
        });

    };

    $scope.editItem = function(item){
        if(item && item.selected){
            item.editing = true;
        }
    };

    $scope.doneEditing = function(item){
        item.editing = false;
    };

}]);

app.controller('BMapCtrl', ['$scope', function($scope){
    var mapHeight = Math.round(window.innerHeight*0.5)+'px';
    var mapWidth  = Math.round(window.innerHeight*0.5*1.5)+'px';
    $scope.mapStyle = {
        width:  mapWidth,
        height: mapHeight,
        margin: '0 auto'
    };

    var map = new AMap.Map('allmap', {
        resizeEnable: true,
        zoom:11,
        center: [116.397428, 39.90923]
    });
}]);


app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance',  function($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.dismiss('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('ModalMapCtrl', ['$scope', function($scope){
    var mapHeight = Math.round(window.innerHeight*0.5)+'px';
    var mapWidth  = Math.round(window.innerHeight*0.5*1.5)+'px';
    $scope.modalMapStyle = {
        width:  mapWidth,
        height: mapHeight,
        margin: '0 auto'
    };

    var map = new AMap.Map('modalmap', {
        resizeEnable: true,
        zoom:11,
        center: [116.397428, 39.90923]
    });
}]);

